export default function NoteDescription({
	updated_at,
	created_at,
}: { updated_at: string; created_at: string }) {
	return (
		<>
			{updated_at ? <>Updated at {updated_at}</> : <>Created at {created_at}</>}
		</>
	);
}
