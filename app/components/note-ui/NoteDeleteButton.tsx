"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "../ui/button";

const supabase = createClientComponentClient();

export default function NoteDeleteButton({ id }: { id?: string }) {
	const handleDeleteNote = async (id?: string) => {
		const { error } = await supabase.from("notes").delete().eq("id", id);
		if (error) console.log(error);
		window.location.reload();
	};

	return (
		<>
			<Button onClick={() => handleDeleteNote(id)}>x</Button>
		</>
	);
}
