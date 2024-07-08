import React from "react";
export default function NoteContent({ content }: { content: string }) {
	return (
		<>
			{content.split("\n").map((line, index) => (
				<React.Fragment key={index}>
					{line}
					<br />
				</React.Fragment>
			))}
		</>
	);
}
