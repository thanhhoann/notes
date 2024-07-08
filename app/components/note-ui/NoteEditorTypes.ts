// import type { BaseEditor } from "slate";
// import type { HistoryEditor } from "slate-history";
// import type { ReactEditor } from "slate-react";
//
// export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;
//
// export type ParagraphElement = {
// 	type: "paragraph";
// 	children: CustomText[];
// };
//
// export type HeadingElement = {
// 	type: "heading";
// 	level: number;
// 	children: CustomText[];
// };
//
// export type CustomElement = ParagraphElement | HeadingElement;
//
// export type FormattedText = { text: string; bold?: true };
//
// export type CustomText = FormattedText;
//
// declare module "slate" {
// 	interface CustomTypes {
// 		Editor: CustomEditor;
// 		Element: CustomElement;
// 		Text: CustomText;
// 	}
// }
