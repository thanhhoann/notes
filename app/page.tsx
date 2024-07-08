"use client";

import NoteAddingModal from "@/components/note-ui/NoteAddingModal";
import NoteForm from "@/components/note-ui/NoteForm";
import NoteList from "@/components/note-ui/NoteList";
import React from "react";

// TODO:
// - add schemas to inputs
// - replace loading spinner with skeleton
// [dev/plate-editor]
// - move components to root

export default function Home() {
	return (
		<>
			{/* <NoteAddingModal /> */}
			<NoteForm />
			<NoteList />
		</>
	);
}
