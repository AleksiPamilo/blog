"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import CodeBlockLowLight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";

import { common, createLowlight } from "lowlight";

import "./tiptap.css";

export default function Tiptap({ content }: { content: string }) {
    const editor = useEditor({
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
            },
        },
        extensions: [
            StarterKit.configure({ codeBlock: false }),
            Document,
            Paragraph,
            Text,
            CodeBlockLowLight.configure({
                lowlight: createLowlight(common),
                languageClassPrefix: "language-",
                defaultLanguage: "plaintext",
            }),
            Image,
            Link.configure({
                protocols: ["ftp", "mailto"],
                openOnClick: "whenNotEditable",
                HTMLAttributes: {
                    rel: "noopener, noreferrer",
                }
            })
        ],
        content: content,
    });

    editor?.setOptions({
        editable: false,
    });

    return (
        <EditorContent editor={editor} />
    );
}