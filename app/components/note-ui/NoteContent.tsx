import React from "react";
export default function NoteContent({ content }: { content: string }) {
	return (
		<>
			<div dangerouslySetInnerHTML={{ __html: content }} />
			{/* {content.split("\n").map((line, index) => ( */}
			{/* 	<React.Fragment key={index}> */}
			{/* 		{line} */}
			{/* 		<br /> */}
			{/* 	</React.Fragment> */}
			{/* ))} */}
		</>
	);
}
