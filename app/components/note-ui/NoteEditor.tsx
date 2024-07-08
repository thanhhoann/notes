import escapeHtml from "escape-html";
import React, { useState } from "react";
import { createEditor } from "slate";
import type { Node } from "slate";
import { Text } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { deserializeFromHtml } from "../slate-editor/deserializeFromHtml";
import { serializeToHtml } from "../slate-editor/serializeToHtml";

const initialValue = deserializeFromHtml("<p>Hello World!</p>");

export default function NoteEditor() {
	const [editor] = React.useState(() => withReact(createEditor()));
	const [editorValue, setEditorValue] = React.useState(initialValue);

	const localStorageKey = "__slate.js__editor_value";

	// const initialValue = React.useMemo(
	// 	() =>
	// 		deserialize(localStorage.getItem(localStorageKey)) || [
	// 			{
	// 				type: "paragraph",
	// 				children: [
	// 					{ text: "A line of text in a paragraph (got from localStorage)." },
	// 				],
	// 			},
	// 		],
	// 	[],
	// );

	return (
		<>
			<Slate
				editor={editor}
				initialValue={initialValue}
				onChange={(value) => {
					setEditorValue(value);
					// const isAstChange = editor.operations.some(
					// 	(op) => "set_selection" !== op.type,
					// );
					// if (isAstChange) {
					// localStorage.setItem(localStorageKey, serializeToHtml(value[0]));
					// }
				}}
			>
				<Editable
					onKeyDown={(event) => {
						if (event.key === "&") {
							// Prevent the ampersand character from being inserted.
							event.preventDefault();
							// Execute the `insertText` method when the event occurs.
							editor.insertText("and");
						}
					}}
				/>
			</Slate>

			<div
				className="content"
				dangerouslySetInnerHTML={{ __html: serializeToHtml(editorValue) }}
			/>
		</>
	);
}

// const serializeToPlainText = (value: any) => {
// 	return (
// 		value
// 			// Return the string content of each paragraph in the value's children.
// 			.map((n: any) => Node.string(n))
// 			// Join them all with line breaks denoting paragraphs.
// 			.join("\n")
// 	);
// };
//
// const serializeToHtml = (node: any) => {
// 	console.log("serizalize[slate->html]: ", node);
// 	if (Text.isText(node)) {
// 		let string = escapeHtml(node.text);
// 		if (node.bold) {
// 			string = `<strong>${string}</strong>`;
// 		}
// 		return string;
// 	}
//
// 	const children = node.children.map((n: any) => serializeToHtml(n)).join("");
//
// 	switch (node.type) {
// 		case "quote":
// 			return `<blockquote><p>${children}</p></blockquote>`;
// 		case "paragraph":
// 			return `<p>${children}</p>`;
// 		case "link":
// 			return `<a href="${escapeHtml(node.url)}">${children}</a>`;
// 		default:
// 			return children;
// 	}
// };
//
// const deserialize = (string: string | null) => {
// 	// Return a value array of children derived by splitting the string.
// 	return string?.split("\n").map((line) => {
// 		return {
// 			children: [{ text: line }],
// 		};
// 	});
// };
