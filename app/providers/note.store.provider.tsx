"use client";

import {
	type NoteActions,
	type NoteState,
	type NoteStore,
	createNoteStore,
	initNoteStore,
} from "@/app/stores/note.store";
import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

export type NoteStoreApi = ReturnType<typeof createNoteStore>;
export interface NoteStoreProviderProps {
	children: ReactNode;
}

export const NoteStoreContext = createContext<NoteStoreApi | undefined>(
	undefined,
);

export const NoteStoreProvider = ({ children }: NoteStoreProviderProps) => {
	const storeRef = useRef<NoteStoreApi>();
	if (!storeRef.current) {
		storeRef.current = createNoteStore(initNoteStore());
	}

	return (
		<NoteStoreContext.Provider value={storeRef.current}>
			{children}
		</NoteStoreContext.Provider>
	);
};

export const useNoteStore = <T,>(
	selector: (store: NoteState & NoteActions) => T,
): T => {
	const counterStoreContext = useContext(NoteStoreContext);

	if (!counterStoreContext) {
		throw new Error("useNoteStore must be used within NoteStoreProvider");
	}

	return useStore(counterStoreContext, selector);
};
