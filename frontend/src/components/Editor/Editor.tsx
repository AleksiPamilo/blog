"use client";

import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import { Button } from "../ui/button";
import getExtensions from "./Extensions";

import "./tiptap.css";

const CHARACTER_LIMIT = 10000;

function MenuBar() {
    const { editor } = useCurrentEditor();

    if (!editor) {
        return null;
    }

    const isActive = "bg-gray-600";

    return (
        <div className="flex flex-wrap gap-2 pb-2 mb-3 border-b-2 border-zinc-500">
            <Button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleBold()
                        .run()
                }
                className={editor.isActive("bold") ? isActive : ""}
            >
                bold
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run()
                }
                className={editor.isActive("italic") ? isActive : ""}
            >
                italic
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleStrike()
                        .run()
                }
                className={editor.isActive("strike") ? isActive : ""}
            >
                strike
            </Button>
            <Button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
                clear marks
            </Button>
            <Button onClick={() => editor.chain().focus().clearNodes().run()}>
                clear nodes
            </Button>
            <Button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive("paragraph") ? isActive : ""}
            >
                paragraph
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive("heading", { level: 1 }) ? isActive : ""}
            >
                h1
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive("heading", { level: 2 }) ? isActive : ""}
            >
                h2
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={editor.isActive("heading", { level: 3 }) ? isActive : ""}
            >
                h3
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                className={editor.isActive("heading", { level: 4 }) ? isActive : ""}
            >
                h4
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                className={editor.isActive("heading", { level: 5 }) ? isActive : ""}
            >
                h5
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                className={editor.isActive("heading", { level: 6 }) ? isActive : ""}
            >
                h6
            </Button>
            <Button
                onClick={() => {
                    const previousUrl = editor.getAttributes("link").href
                    const url = window.prompt("URL", previousUrl)

                    if (url === null) {
                        return;
                    }

                    if (url === "") {
                        editor.chain().focus().extendMarkRange("link").unsetLink()
                            .run()

                        return
                    }

                    editor.chain().focus().extendMarkRange("link").setLink({ href: url })
                        .run()
                }}
                className={editor.isActive("link") ? isActive : ""}
            >
                link
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive("bulletList") ? isActive : ""}
            >
                bullet list
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive("orderedList") ? isActive : ""}
            >
                ordered list
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive("codeBlock") ? isActive : ""}
            >
                code block
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive("blockquote") ? isActive : ""}
            >
                blockquote
            </Button>
            <Button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                horizontal rule
            </Button>
            <Button onClick={() => editor.chain().focus().setHardBreak().run()}>
                hard break
            </Button>
            <Button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .undo()
                        .run()
                }
            >
                undo
            </Button>
            <Button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .redo()
                        .run()
                }
            >
                redo
            </Button>
        </div>
    )
}

function BottomBar() {
    const { editor } = useCurrentEditor();

    if (!editor) return null;

    return (
        <div className="w-full flex items-center justify-between text-gray-500">
            <span>{editor.storage.characterCount.characters()}/{CHARACTER_LIMIT} characters</span>
            <Button onClick={() => alert("TODO")}>Publish</Button>
        </div>
    );
}

export default function Editor({ content, placeholder }: { content?: string, placeholder?: string }) {
    return (
        <div className="bg-zinc-100 border border-zinc-200 shadow-md p-4 rounded-md focus:outline-none focus-within:border-zinc-300">
            <EditorProvider
                slotBefore={<MenuBar />}
                slotAfter={<BottomBar />}
                extensions={getExtensions(CHARACTER_LIMIT, placeholder)}
                content={content ?? ""}
            >
                <></>
            </EditorProvider>
        </div>
    );
}