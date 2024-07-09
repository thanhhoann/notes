import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function markdownToHtml(string: string) {
	return await unified()
		.use(remarkParse) // Convert into markdown AST
		.use(remarkRehype) // Transform to HTML AST
		.use(rehypeSanitize) // Sanitize HTML input
		.use(rehypeStringify) // Convert AST into serialized HTML
		.process(string);
}
