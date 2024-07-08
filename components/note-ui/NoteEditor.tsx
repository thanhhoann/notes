import { CommentProvider } from "@udecode/plate-comments";
import { Plate, PlateContent } from "@udecode/plate-common";
import React from "react";
import { Editor } from "../plate-ui/editor";
import { FixedToolbar } from "../plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "../plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "../plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "../plate-ui/floating-toolbar-buttons";
import { TooltipProvider } from "../plate-ui/tooltip";
import { plugins } from "./NoteEditorPlugins";

const initialValue = [
	{
		id: "1",
		type: "p",
		children: [{ text: "Hello, World!" }],
	},
];

export default function NoteEditor() {
	const [editorValue, setEditorValue] = React.useState(initialValue);

	return (
		<>
			<TooltipProvider>
				<Plate
					plugins={plugins}
					initialValue={initialValue}
					onChange={(newValue) => console.log(newValue[0])}
				>
					<FixedToolbar>
						<FixedToolbarButtons />
					</FixedToolbar>

					<Editor />

					<FloatingToolbar>
						<FloatingToolbarButtons />
					</FloatingToolbar>
				</Plate>
			</TooltipProvider>
		</>
	);
}
