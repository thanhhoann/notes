"use client";
import type { INote } from "@/app/lib/schemas/note";
import { markdownToHtml } from "@/app/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { LabelWrapper } from "../ui-custom/label-wrapper";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const supabase = createClientComponentClient();

export default function NoteForm() {
	const [noteTitle, setNoteTitle] = React.useState("");
	const [noteContent, setNoteContent] = React.useState("");

	const handleAddNote = (e: any) => {
		e.preventDefault();

		markdownToHtml(noteContent).then((res) => {
			const noteContentHtml = String(res.value);

			const newNote = {
				title: noteTitle,
				content: noteContentHtml,
				created_at: new Date().toISOString().substring(0, 10),
				updated_at: "",
			};

			console.log(noteContentHtml);
			insertData(newNote);

			setNoteTitle("");
			setNoteContent("");

			window.location.reload();
		});
	};

	// push new note to db
	async function insertData(item: INote) {
		const { error } = await supabase.from("notes").insert(item);
		if (error) console.log(error);
	}

	// handles text transformations in textarea
	const handleKeyDown = (e: any) => {
		const lines = noteContent.split("\n");
		const currentLine = lines[lines.length - 1];

		// Count lines starting with "-"
		const noBulletLines = lines.filter((line) =>
			line.trim().startsWith("•"),
		).length;

		// Enter is pressed => add "\"
		if (e.key === "Enter") {
			// current line is NOT a heading => add "\"
			if (!currentLine.startsWith("#")) {
				setNoteContent((prev) => `${prev}\\`);
				// number of bullet lines >= 2 => no add "\"
				// if (noBulletLines >= 2 && currentLine.startsWith("-")) {
				// }
			}
		} else {
			// "-" is pressed => add "*"
			const updatedLines = lines.map((line) => {
				if (line.startsWith("- ")) {
					return `• ${line.slice(2)}`;
				}
				return line;
			});
			setNoteContent(updatedLines.join("\n"));
		}
	};

	return (
		<>
			<form
				onSubmit={handleAddNote}
				className="flex flex-col justify-center items-center m-4 gap-2"
			>
				<LabelWrapper label="Title">
					<Input
						type="string"
						value={noteTitle}
						onChange={(e) => setNoteTitle(e.target.value)}
					/>
				</LabelWrapper>
				<LabelWrapper label="Content">
					<Textarea
						onKeyDown={handleKeyDown}
						value={noteContent}
						onChange={(e) => setNoteContent(e.target.value)}
					/>
				</LabelWrapper>
				<Button className="w-full" onClick={handleAddNote}>
					Submit
				</Button>
			</form>
		</>
	);
}
