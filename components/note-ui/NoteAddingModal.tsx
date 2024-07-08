"use client";
import type { INote } from "@/lib/schemas/note";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { LabelWrapper } from "../ui-custom/label-wrapper";
import LoadingSpinner from "../ui-custom/loading-spinner";
import { Button } from "../ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "../ui/drawer";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import NoteEditor from "./NoteEditor";

const supabase = createClientComponentClient();

export default function NoteAddingModal() {
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
			<>
				<Drawer open={drawerAddNoteIsOpen} onOpenChange={setOpenDrawerAddNote}>
					<DrawerContent>
						<DrawerHeader>
							<DrawerTitle>What are your thoughts ?</DrawerTitle>
							<DrawerDescription>
									</LabelWrapper>
									<LabelWrapper label="Content">
										<NoteEditor />
										{/* <Textarea */}
										{/* 	value={noteContent} */}
										{/* 	onChange={(e) => setNoteContent(e.target.value)} */}
										{/* /> */}
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
			</>
		</>
	);
}
