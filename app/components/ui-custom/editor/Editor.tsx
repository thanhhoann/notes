import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { $getRoot, $getSelection } from "lexical";
import React from "react";
import EditorTheme from "./EditorTheme";
import OnChangePlugin from "./plugins/OnChangePlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";

export default function Editor() {
	const initialConfig = {
		namespace: "Editor",
		notes: [],
		editable: true,
		theme: EditorTheme,
		// Handling of errors during update
		onError(error: Error) {
			throw error;
		},
	};

	function onChange(editorState: any) {
		// Call toJSON on the EditorState object, which produces a serialization safe string
		// const editorStateJSON = editorState.toJSON();
		// console.log(editorStateJSON);

		// However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
		// setEditorState(JSON.stringify(editorStateJSON));
		editorState.read(() => {
			// Read the contents of the EditorState here.
			const root = $getRoot();
			const selection = $getSelection();

			console.log(root, selection);
		});
	}

	return (
		<LexicalComposer initialConfig={initialConfig}>
			<div className="editor-containter">
				<ToolbarPlugin />
				<div className="editor-inner">
					<RichTextPlugin
						contentEditable={<ContentEditable className="editor-input" />}
						placeholder={
							<div className="editor-placeholder">Enter some text...</div>
						}
						ErrorBoundary={LexicalErrorBoundary}
					/>
					<HistoryPlugin />
					<AutoFocusPlugin />
					<OnChangePlugin onChange={onChange} />
				</div>
			</div>
		</LexicalComposer>
	);
}
