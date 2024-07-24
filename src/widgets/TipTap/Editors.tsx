// noinspection TypeScriptValidateTypes

import {generateHTML} from '@tiptap/core';
import {EditorContentProps, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {Mathematics} from "@tiptap-pro/extension-mathematics";
import Link from '@tiptap/extension-link';
import QuestionComponentView from "./Questions/Editable/QuestionComponentView.tsx";
import QuestionComponentPreview from "./Questions/Preview/QuestionComponentPreview.tsx";
import styles from "./Editor.module.css";


export default function Editors(editor_name: ('preview' | 'editor')): EditorContentProps['editor'] {
    const preview = useEditor({
        autofocus: true,
        injectCSS: false,
        extensions: [
            StarterKit,
            Mathematics,
            QuestionComponentPreview,
            Link.configure({
                openOnClick: true,
                autolink: true,
                defaultProtocol: 'https',
            }),
        ],
        editorProps: {
            attributes: {
                class: styles.preview,
            },
        },
        editable: false
    })
    const editor = useEditor({
        autofocus: true,
        injectCSS: false,
        extensions: [
            StarterKit,
            Mathematics,
            QuestionComponentView,
            Link.configure({
                openOnClick: true,
                autolink: true,
                defaultProtocol: 'https',
            }),
        ],
        editorProps: {
            attributes: {
                class: styles.editor,
            },
        },
    })

    if (editor_name === 'editor') {
        return editor
    } else if (editor_name === 'preview') {
        return preview
    }
}

export function convertJsonToHtml(json: string) {
    console.log(json);
    const html = generateHTML(JSON.parse(json), [
        StarterKit,
        Mathematics,
        QuestionComponentPreview
    ]);
    console.log(html);
    return html;
}
