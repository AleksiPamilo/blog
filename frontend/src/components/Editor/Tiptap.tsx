"use client";

import { EditorContent, useEditor } from "@tiptap/react";

import "./tiptap.css";
import getExtensions from "./Extensions";

export default function Tiptap({ content }: { content: string }) {
    const editor = useEditor({
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
            },
        },
        extensions: getExtensions(),
        content: content,
    });

    editor?.setOptions({
        editable: false,
    });

    return (
        <EditorContent editor={editor} />
    );
}