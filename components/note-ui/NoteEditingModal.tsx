"use client";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";

import type { INote } from "@/lib/schemas/note";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { LabelWrapper } from "../ui-custom/label-wrapper";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const supabase = createClientComponentClient();

export default function NoteEditingModal({ note }: { note: INote }) {
	const [newNoteTitle, setNewNoteTitle] = React.useState("");
	const [newNoteContent, setNewNoteContent] = React.useState("");

	const [isModalOpen, setModalOpen] = React.useState(false);

	const handleEditNote = async (e: any, id?: string) => {
		e.preventDefault();
		// if only title is updated
		if (newNoteTitle.length > 0) {
			const { error } = await supabase
				.from("notes")
				.update({
					title: newNoteTitle,
					updated_at: new Date().toISOString().substring(0, 10),
				})
				.eq("id", id);
			if (error) console.log(error);
		}

		// if only content is updated
		if (newNoteContent.length > 0) {
			const { error } = await supabase
				.from("notes")
				.update({
					content: newNoteContent,
					updated_at: new Date().toISOString().substring(0, 10),
				})
				.eq("id", id);
			if (error) console.log(error);
		}

		// if title & content are updated
		if (newNoteContent.length > 0 && newNoteTitle.length > 0) {
			const { error } = await supabase
				.from("notes")
				.update({
					title: newNoteTitle,
					content: newNoteContent,
					updated_at: new Date().toISOString().substring(0, 10),
				})
				.eq("id", id);
			if (error) console.log(error);
		}

		setNewNoteTitle("");
		setNewNoteContent("");
		setModalOpen(!isModalOpen);

		window.location.reload();
	};
	return (
		<>
			<Dialog
				open={isModalOpen}
				onOpenChange={() => setModalOpen(!isModalOpen)}
			>
				<DialogTrigger>
					<Button>Edit</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit note</DialogTitle>
						<form onSubmit={(e) => handleEditNote(e, note.id)}>
							<LabelWrapper label="Title" styles="my-4">
								<Input
									type="string"
									value={newNoteTitle ? newNoteTitle : note.title}
									onChange={(e) => setNewNoteTitle(e.target.value)}
								/>
							</LabelWrapper>
							<LabelWrapper label="Content" styles="mb-4">
								<Textarea
									value={newNoteContent ? newNoteContent : note.content}
									onChange={(e) => setNewNoteContent(e.target.value)}
								/>
							</LabelWrapper>
						</form>
						<DialogClose asChild>
							<Button type="submit" onClick={(e) => handleEditNote(e, note.id)}>
								Update
							</Button>
						</DialogClose>
						<DialogDescription />
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</>
	);
}
