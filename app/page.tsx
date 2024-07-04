"use client";

import { LabelWrapper } from "./components/ui-custom/label-wrapper";
import { Button } from "./components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./components/ui/card";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "./components/ui/drawer";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import type { INote } from "./lib/note.type";

const supabase = createClientComponentClient();

export default function Home() {
	const [noteTitle, setNoteTitle] = React.useState("");
	const [noteContent, setNoteContent] = React.useState("");

	const [newNoteTitle, setNewNoteTitle] = React.useState("");
	const [newNoteContent, setNewNoteContent] = React.useState("");

	const [notes, setNotes] = React.useState<INote[] | null>([]);

	const [drawerAddNoteIsOpen, setOpenDrawerAddNote] = React.useState(false);

	const handleAddNote = (e: any) => {
		e.preventDefault();
		const newNote = {
			// id: String(Math.random()),
			title: noteTitle,
			content: noteContent,
			created_at: new Date().toISOString().substring(0, 10),
			updated_at: "",
		};

		// setNotes([...notes, newNote]);
		insertData(newNote);

		setNoteTitle("");
		setNoteContent("");

		setOpenDrawerAddNote(!drawerAddNoteIsOpen);
	};

	// push new note to db
	async function insertData(item: INote) {
		const { error } = await supabase.from("notes").insert(item);
		if (error) console.log(error);
	}

	// fetch notes from db
	React.useEffect(() => {
		async function getNotes() {
			const { data: notes, error } = await supabase.from("notes").select();
			if (error) console.log(error);
			setNotes(notes);
		}

		getNotes();
	}, []);

	const handleDeleteNote = async (id?: string) => {
		// const updatedNotes = notes?.filter((notes) => notes.id !== id);
		// if (updatedNotes) setNotes(updatedNotes);
		const { error } = await supabase.from("notes").delete().eq("id", id);
		if (error) console.log(error);
	};

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
	};

	return (
		<>
			<Drawer open={drawerAddNoteIsOpen} onOpenChange={setOpenDrawerAddNote}>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>What are your thoughts ?</DrawerTitle>
						<DrawerDescription>
							<form onSubmit={handleAddNote}>
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
						</DrawerDescription>
					</DrawerHeader>
					<DrawerFooter>
						<Button onClick={handleAddNote}>Submit</Button>
						<DrawerClose>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>

			<div className="w-h flex justify-center my-3">
				<Button onClick={() => setOpenDrawerAddNote(!drawerAddNoteIsOpen)}>
					Add a note
				</Button>
			</div>

			{notes?.map((note) => (
				<>
					<Card className="mx-4 mb-2">
						<CardHeader>
							<CardTitle>
								<div className="flex items-center justify-between">
									{note.title}
									<div className="flex gap-2">
										<Dialog>
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
																onChange={(e) =>
																	setNewNoteTitle(e.target.value)
																}
															/>
														</LabelWrapper>
														<LabelWrapper label="Content" styles="mb-4">
															<Textarea
																value={
																	newNoteContent ? newNoteContent : note.content
																}
																onChange={(e) =>
																	setNewNoteContent(e.target.value)
																}
															/>
														</LabelWrapper>
														<DialogClose asChild>
															<Button type="submit">Update</Button>
														</DialogClose>
													</form>
													<DialogDescription />
												</DialogHeader>
											</DialogContent>
										</Dialog>
										<Button onClick={() => handleDeleteNote(note.id)}>x</Button>
									</div>
								</div>
							</CardTitle>
							<CardDescription>
								{note.updated_at ? (
									<>Updated at {note.updated_at}</>
								) : (
									<>Created at {note.created_at}</>
								)}
							</CardDescription>
						</CardHeader>
						<CardContent>
							{note.content.split("\n").map((line, index) => (
								<React.Fragment key={index}>
									{line}
									<br />
								</React.Fragment>
							))}
						</CardContent>
					</Card>
				</>
			))}
		</>
	);
}
