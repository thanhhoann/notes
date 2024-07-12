import { createStore } from "zustand/vanilla";

export type NoteState = {
	isRefreshed: boolean;
};

export type NoteActions = {
	refreshList: () => void;
};

export type NoteStore = NoteState & NoteActions;

export const initNoteStore = (): NoteState => {
	return { isRefreshed: false };
};

export const defaultNoteState: NoteState = {
	isRefreshed: false,
};

export const createNoteStore = (initState: NoteState = defaultNoteState) => {
	return createStore<NoteState>()((set) => ({
		...initState,
		refreshList: () => set({ !isRefreshed}),
	}));
};

// export type CounterState = {
// 	count: number;
// };
//
// export type CounterActions = {
// 	decrementCount: () => void;
// 	incrementCount: () => void;
// };
//
// export const initCounterStore = (): CounterState => {
// 	return { count: new Date().getFullYear() };
// };
//
// export const defaultCounterState: CounterState = {
// 	count: 0,
// };
//
// export type CounterStore = CounterState & CounterActions;
//
// export const createCounterStore = (
// 	initState: CounterState = defaultCounterState,
// ) => {
// 	return createStore<CounterStore>()((set) => ({
// 		...initState,
// 		decrementCount: () => set((state) => ({ count: state.count - 1 })),
// 		incrementCount: () => set((state) => ({ count: state.count + 1 })),
// 	}));
// };
