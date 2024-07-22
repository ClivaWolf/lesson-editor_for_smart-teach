// noinspection TypeScriptValidateTypes

import {useState} from "react";
import {EditorContent} from '@tiptap/react'
import {ToolBox} from "../../TipTap/Menus/ToolBox.tsx";
import 'katex/dist/katex.min.css'
import BubbleMenu from "../../TipTap/Menus/BubbleMenu.tsx";
import {QuestionProvider} from "../../../shared/contexts/QuestionContext.tsx";
import Editors from "../../TipTap/Editors.tsx";

const Tiptap = () => {

    // const {setCalculateScore} = useQuestion()
    const [totalScores, setTotalScores] = useState(0)
    const [content, setContent] = useState('');

    // const calculateTotalScores = () => {
    //     const nodes = editors.getJSON().content || [];
    //     let total = 0;
    //     nodes.forEach(node => {
    //         if (node.type === 'reactComponent') {
    //             const attrs = (node.attrs as { content: BankQuestion }).content;
    //             total += attrs.cost;
    //         }
    //     });
    //     setTotalScores(total);
    // };

    const editor = Editors('editor')

    return (
        <>
            <QuestionProvider>
                <div>Total scores: {totalScores}</div>
                <ToolBox editor={editor}/>
                <BubbleMenu editor={editor}/>
                <EditorContent editor={editor}/>
                {/*<button onClick={() => {setContent(editor?.getJSON())}}>Submit</button>*/}
                <div>{editor?.getJSON()}</div>
            </QuestionProvider>
        </>
    )
}

export default Tiptap
