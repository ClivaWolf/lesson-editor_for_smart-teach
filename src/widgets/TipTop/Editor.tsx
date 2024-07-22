import {useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {Mathematics} from "@tiptap-pro/extension-mathematics";
import ReactComponent from "../TaskEditor/TipTapEditor/ReactComponentView.tsx";
import styles from "../TaskEditor/TipTapEditor/Editor.module.css";

const editor = useEditor({
        autofocus: true,
        extensions: [
            StarterKit,
            Mathematics,
            ReactComponent,
        ],
        editorProps: {
            attributes: {
                class: styles.editor,
            },
        },
        content: `Hello $LaTeX$!
                <react-component data-content='{
                    "id": "too_long_id",
                    "type": "mono",
                    "cost": 1,
                    "welcome_text": "Выберите один из вариантов ответа:",
                    "knowledge": ["математика"],
                    "answers": [
                    {
                        "title": "Ответ 1",
                        "dataIndex": "answer_1"
                    },
                    {
                        "title": "Ответ 2",
                        "dataIndex": "answer_2"
                    },
                    {
                        "title": "Ответ 3",
                        "dataIndex": "answer_3"
                    }
                    ],
                    "correctAnswers": ["answer_1"],
                    "random": true
                }'/>`,
    })