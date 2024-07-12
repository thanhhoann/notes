"use client";
import type { INote } from "@/app/lib/schemas/note";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import NoteDeleteButton from "../note-ui/NoteDeleteButton";
import NoteEditingModal from "../note-ui/NoteEditingModal";
import LoadingSpinner from "../ui-custom/loading-spinner";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import NoteContent from "./NoteContent";
import NoteDescription from "./NoteDescription";
const supabase = createClientComponentClient();

export default function NoteList() {
	const [notes, setNotes] = React.useState<INote[] | null>(null);
	const [isLoading, setLoading] = React.useState(true);

	// fetch notes from db
	React.useEffect(() => {
		fetchNotes();
	}, []);

	async function fetchNotes() {
		const { data: notes, error } = await supabase.from("notes").select();
		if (error) console.log(error);
		setNotes(notes);
		setLoading(false);
	}

	return (
		<>
			{/* show loading spinner when fetching notes */}
			{isLoading ? (
				<div className="w-screen mt-10 flex items-center justify-center">
					<LoadingSpinner w="50" />
				</div>
			) : (
				<>
					{notes && notes.length > 0 ? (
						notes?.map((note) => (
							<>
								<Card className="mx-4 mb-2">
									<CardHeader>
										<CardTitle>
											<div className="flex items-center justify-between">
												{note.title}
												<div className="flex gap-2">
													<NoteEditingModal note={note} />
													<NoteDeleteButton id={note.id} />
												</div>
											</div>
										</CardTitle>
										<CardDescription>
											<NoteDescription
												created_at={note.created_at}
												updated_at={note.updated_at}
											/>
										</CardDescription>
									</CardHeader>

									<CardContent>
										<NoteContent content={note.content} />
									</CardContent>
								</Card>
							</>
						))
					) : (
						<div className="w-screen mt-10 flex items-center justify-center">
							<p>Nothing here.</p>
						</div>
					)}
				</>
			)}
		</>
	);
}
