import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import CodeBlockLowLight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import CharacterCount from "@tiptap/extension-character-count";
import { common, createLowlight } from "lowlight";

const getExtensions = (characterLimit?: number, placeholder?: string) => ([
    StarterKit.configure({ codeBlock: false }),
    Heading,
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
    }),
    CharacterCount.configure({
        limit: characterLimit,
    }),
    Placeholder.configure({
        placeholder: placeholder ?? "Write something...",
    }),
    OrderedList,
    BulletList
]);

export default getExtensions;