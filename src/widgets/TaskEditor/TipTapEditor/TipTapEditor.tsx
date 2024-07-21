import {EditorContent, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {ToolBox} from "./ToolBox.tsx";
import {Mathematics} from '@tiptap-pro/extension-mathematics'
import 'katex/dist/katex.min.css'
import ReactComponent from './Extension.js'
import BubbleMenu from "./BubbleMenu.tsx";

const Tiptap = () => {

    const editor = useEditor({
        extensions: [
            StarterKit,
            Mathematics,
            ReactComponent,
        ],
        content: `Hello $LaTeX$!
                <react-component data-content='{
                    "id": "too_long_id",
                    "type": "mono",
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

    if (!editor) {
        return null
    }

    return (
        <>
        {/*// <EditorProvider slotBefore={<ToolBox/>}>*/}
            {/*<FloatingMenu editor={null}>This is the floating menu</FloatingMenu>*/}
            <ToolBox editor={editor}/>
            <BubbleMenu editor={editor}/>
            <EditorContent editor={editor} />
        {/*// </EditorProvider>*/}
        </>
    )
}

export default Tiptap
