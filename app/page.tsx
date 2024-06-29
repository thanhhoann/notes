"use client";

import { LabelWrapper } from "@/components/ui-custom/label-wrapper";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

interface INote {
	id: string;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
}

export default function Home() {
	const [noteTitle, setNoteTitle] = React.useState("");
	const [noteContent, setNoteContent] = React.useState("");

	const [newNoteTitle, setNewNoteTitle] = React.useState("");
	const [newNoteContent, setNewNoteContent] = React.useState("");

	const [notes, setNotes] = React.useState<INote[]>([]);

	const handleAddNote = (e: any) => {
		e.preventDefault();
		const newNote = {
			id: String(Math.random()),
			title: noteTitle,
			content: noteContent,
			createdAt: new Date().toISOString().substring(0, 10),
			updatedAt: "",
		};

		setNotes([...notes, newNote]);

		setNoteTitle("");
		setNoteContent("");
	};

	const handleDeleteNote = (id: string) => {
		const updatedNotes = notes.filter((notes) => notes.id !== id);
		setNotes(updatedNotes);
	};

	const handleEditNote = (e: any, id: string) => {
		e.preventDefault();
		// if only title is updated
		if (newNoteTitle.length > 0) {
			setNotes((prev) =>
				prev.map((note) =>
					note.id === id
						? {
								...note,
								title: newNoteTitle,
								updatedAt: new Date().toISOString().substring(0, 10),
							}
						: note,
				),
			);
		}
		// if only content is updated
		if (newNoteContent.length > 0) {
			setNotes((prev) =>
				prev.map((note) =>
					note.id === id
						? {
								...note,
								content: newNoteContent,
								updatedAt: new Date().toISOString().substring(0, 10),
							}
						: note,
				),
			);
			// if title & content are updated
			if (newNoteContent.length > 0 && newNoteTitle.length > 0) {
				setNotes((prev) =>
					prev.map((note) =>
						note.id === id
							? {
									...note,
									title: newNoteTitle,
									content: newNoteContent,
									updatedAt: new Date().toISOString().substring(0, 10),
								}
							: note,
					),
				);
			}

			setNewNoteTitle("");
			setNewNoteContent("");
		}
	};

	return (
		<>
			<form onSubmit={handleAddNote}>
				<Card className="m-4">
					<CardHeader>
						<CardTitle>What are your thoughts ?</CardTitle>
					</CardHeader>
					<CardContent>
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
					</CardContent>
					<CardFooter>
						<Button type="submit">Save</Button>
					</CardFooter>
				</Card>
			</form>

			{notes.map((note) => (
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
								{note.updatedAt ? (
									<>Updated at {note.updatedAt}</>
								) : (
									<>Created at {note.createdAt}</>
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
