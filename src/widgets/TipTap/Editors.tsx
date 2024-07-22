// noinspection TypeScriptValidateTypes

import {EditorContentProps, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {Mathematics} from "@tiptap-pro/extension-mathematics";
import QuestionComponentView from "./Questions/Editable/QuestionComponentView.tsx";
import QuestionComponentPreview from "./Questions/Preview/QuestionComponentPreview.tsx";
import styles from "./Editor.module.css";


export default function Editors(editor_name: ('preview' | 'editor')): EditorContentProps['editor'] {
    if (editor_name === 'preview') {
        return useEditor({
            autofocus: true,
            injectCSS: false,
            extensions: [
                StarterKit,
                Mathematics,
                QuestionComponentPreview,
            ],
            editorProps: {
                attributes: {
                    class: styles.editor,
                },
            },
            editable: false
        })
    } else if (editor_name === 'editor') {
        return useEditor({
            autofocus: true,
            injectCSS: false,
            extensions: [
                StarterKit,
                Mathematics,
                QuestionComponentView,
            ],
            editorProps: {
                attributes: {
                    class: styles.editor,
                },
            },
        })
    }
}
