import type { INote } from "@/lib/schemas/note";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { LabelWrapper } from "../ui-custom/label-wrapper";
import { Input } from "../ui/input";
import NoteEditor from "./NoteEditor";

const supabase = createClientComponentClient();

export default function NoteForm() {
	const [noteTitle, setNoteTitle] = React.useState("");
	const [noteContent, setNoteContent] = React.useState("");

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

		window.location.reload();
	};

	// push new note to db
	async function insertData(item: INote) {
		const { error } = await supabase.from("notes").insert(item);
		if (error) console.log(error);
	}
	return (
		<>
			<div className="m-3 p-3">
				<form onSubmit={handleAddNote} className="w-[90vw]">
					<div className="mt-4">
						<NoteEditor />
					</div>
				</form>
			</div>
		</>
	);
}
