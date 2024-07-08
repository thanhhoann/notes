"use client";

import React from "react";
import NoteEditor from "./components/note-ui/NoteEditor";
import NoteForm from "./components/note-ui/NoteForm";
import NoteList from "./components/note-ui/NoteList";

// TODO:
// - add schemas to inputs
// - replace loading spinner with skeleton

export default function Home() {
	return (
		<>
			{/* <NoteForm /> */}
			<NoteEditor />
			<NoteList />
		</>
	);
}
