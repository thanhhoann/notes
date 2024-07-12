"use client";
import React from "react";
import NoteForm from "./components/note-ui/NoteForm";
import NoteList from "./components/note-ui/NoteList";
import { useNoteStore } from "./providers/note.store.provider";

// TODO:
// - add schemas to inputs
// - replace loading spinner with skeleton

export default function Home() {
	const { isRefreshed, refreshList } = useNoteStore((slate) => slate);
	return (
		<>
			<NoteForm />
			<NoteList />
		</>
	);
}
