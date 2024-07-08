"use client";
import type { INote } from "@/app/lib/schemas/note";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { LabelWrapper } from "../ui-custom/label-wrapper";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const supabase = createClientComponentClient();

export default function NoteForm() {
	const [noteTitle, setNoteTitle] = React.useState("");
	const [noteContent, setNoteContent] = React.useState("");
	const [drawerAddNoteIsOpen, setOpenDrawerAddNote] = React.useState(false);

	const handleAddNote = (e: any) => {
		e.preventDefault();

		const newNote = {
			title: noteTitle,
			content: noteContent,
			created_at: new Date().toISOString().substring(0, 10),
			updated_at: "",
		};

		insertData(newNote);

		setNoteTitle("");
		setNoteContent("");

		setOpenDrawerAddNote(!drawerAddNoteIsOpen);

		window.location.reload();
	};

	// push new note to db
	async function insertData(item: INote) {
		const { error } = await supabase.from("notes").insert(item);
		if (error) console.log(error);
	}
	return (
		<>
			<div className="w-screen flex justify-center m-4">
				<form onSubmit={handleAddNote} className="w-4/5">
					<LabelWrapper label="Title" styles="mb-2">
						<Input
							type="string"
							value={noteTitle}
							onChange={(e) => setNoteTitle(e.target.value)}
						/>
					</LabelWrapper>
					<LabelWrapper label="Content">
						<Textarea
							value={noteContent}
							onChange={(e) => setNoteContent(e.target.value)}
						/>
					</LabelWrapper>
				</form>
			</div>
		</>
	);
}
