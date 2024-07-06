import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React from "react";

export default function OnChangePlugin({ onChange }: { onChange: any }) {
	const [editor] = useLexicalComposerContext();

	React.useEffect(() => {
		return editor.registerUpdateListener(({ editorState }) => {
			// call onChange here to pass the latest state up to the parent.
			onChange(editorState);
		});
	}, [editor, onChange]);
	return null;
}
