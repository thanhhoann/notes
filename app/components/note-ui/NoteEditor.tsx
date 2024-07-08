import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useEffect, useRef, useState } from "react";
import "ckeditor5/ckeditor5.css";
import { InlineEditor } from "ckeditor5";
import { editorConfig } from "../ckeditor/ckeditor-config";

const initialData = "# Hello, World !";

export default function NoteEditor() {
	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	const [editorData, setEditorData] = React.useState(initialData);

	return (
		<div>
			<div className="main-container">
				<div
					className="editor-container editor-container_inline-editor editor-container_include-style"
					ref={editorContainerRef}
				>
					<div className="editor-container__editor">
						<div ref={editorRef}>
							{isLayoutReady && (
								<CKEditor
									editor={InlineEditor}
									config={editorConfig}
									data={editorData}
									onInit={(editor: any) => {
										editor.ui.view.editable.element.parentElement.insertBefore(
											editor.ui.view.toolbar.element,
											editor.ui.view.editable.element,
										);
									}}
									onChange={(event, editor) => {
										setEditorData(editor.getData());
									}}
									// onBlur={(event, editor) => {
									// 	console.log("Blur.", editor);
									// }}
									// onFocus={(event, editor) => {
									// 	console.log("Focus.", editor);
									// }}
								/>
							)}
						</div>
					</div>
				</div>
			</div>

			<div>{editorData}</div>
		</div>
	);
}
