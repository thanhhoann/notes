"use client";

import React from "react";
import NoteAddingModal from "./components/note-ui/NoteAddingModal";
import NoteList from "./components/note-ui/NoteList";

// TODO:
// - add schemas to inputs
// - replace loading spinner with skeleton

export default function Home() {
	return (
		<>
			<NoteAddingModal />
			<NoteList />
		</>
	);
}
