// noinspection TypeScriptValidateTypes

import {useState} from "react";
import {EditorContent, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {ToolBox} from "./ToolBox.tsx";
import {Mathematics} from '@tiptap-pro/extension-mathematics'
import 'katex/dist/katex.min.css'
import ReactComponent from './ReactComponentView'
import BubbleMenu from "./BubbleMenu.tsx";
import styles from './Editor.module.css'
import {QuestionProvider} from "../../../shared/contexts/QuestionContext.tsx";
import {Question} from "../../../shared/types/LessonType.ts";
import Preview from "./Preview.tsx";

const Tiptap = () => {

    // const {setCalculateScore} = useQuestion()
    const [totalScores, setTotalScores] = useState(0)
    const [content, setContent] = useState('');

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

    // const calculateTotalScores = () => {
    //     const nodes = editor.getJSON().content || [];
    //     let total = 0;
    //     nodes.forEach(node => {
    //         if (node.type === 'reactComponent') {
    //             const attrs = (node.attrs as { content: Question }).content;
    //             total += attrs.cost;
    //         }
    //     });
    //     setTotalScores(total);
    // };

    if (!editor) {
        return null
    }

    return (
        <>
            <QuestionProvider>
                <div>Total scores: {totalScores}</div>
                <ToolBox editor={editor}/>
                <BubbleMenu editor={editor}/>
                <EditorContent editor={editor}/>
                <Preview content={editor.getJSON()}/>
                <div>{content}</div>
            </QuestionProvider>
        </>
    )
}

export default Tiptap
