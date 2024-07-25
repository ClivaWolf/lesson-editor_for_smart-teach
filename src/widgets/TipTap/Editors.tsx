// noinspection TypeScriptValidateTypes

import {EditorContentProps, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from '@tiptap/extension-placeholder';
import {Mathematics} from "@tiptap-pro/extension-mathematics";
import Link from '@tiptap/extension-link';
import QuestionComponentView from "./Questions/Editable/QuestionComponentView.tsx";
import QuestionComponentPreview from "./Questions/Preview/QuestionComponentPreview.tsx";
import QuestionComponentTest from "./Questions/Test/QuestionComponentTest.tsx";
import styles from "./Editor.module.css";


export default function Editors(editor_name: ('preview' | 'editor' | 'test')): EditorContentProps['editor'] {
    const editor = useEditor({
        autofocus: true,
        injectCSS: false,
        extensions: [
            StarterKit,
            Mathematics,
            QuestionComponentView,
            Placeholder.configure(
                {
                    placeholder: 'Напишите условие задачи и вставьте вопрос...',
                }
            ),
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

    const test = useEditor({
        autofocus: true,
        injectCSS: false,
        extensions: [
            StarterKit,
            Mathematics,
            QuestionComponentTest,
        ],
        editorProps: {
            attributes: {
                class: styles.preview,
            },
        },
        editable: false
    })

    if (editor_name === 'editor') {
        return editor
    } else if (editor_name === 'preview') {
        return preview
    } else {
        return test
    }
}
