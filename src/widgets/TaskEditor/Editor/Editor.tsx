import {useState, useEffect} from "react";
import {Editor, EditorContent, JSONContent} from '@tiptap/react'
import {ToolBox} from "../../TipTap/Menus/ToolBox.tsx";
import 'katex/dist/katex.min.css'
import BubbleMenu from "../../TipTap/Menus/BubbleMenu.tsx";
import Editors from "../../TipTap/Editors.tsx";
import {useDrawer} from "../../../shared/contexts/TE-DrawerContext.tsx";

const Tiptap = () => {

    // const [totalScores, setTotalScores] = useState(0)
    const {content} = useDrawer()
    // const [editorContent, setEditorContent] = useState<JSONContent>(content ? JSON.parse(content) : null)

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

    if (!editor)
        return null

    useEffect(() => {
        if (editor && editor.commands && content) {
            editor.commands.setContent(JSON.parse(content));
        }
    }, [editor, content]);

    return (
        <>
            {/*<div>Total scores: {totalScores}</div>*/}
            <ToolBox editor={editor}/>
            <BubbleMenu editor={editor}/>
            <EditorContent editor={editor}/>
            {/*<button onClick={() => {*/}
            {/*    if (editor instanceof Editor) {*/}
            {/*        setEditorContent(editor.getJSON())*/}
            {/*        console.log(editor.getHTML())*/}
            {/*    }*/}
            {/*}}>*/}
            {/*    Submit*/}
            {/*</button>*/}
            <button onClick={() => {
                editor?.commands.setContent(JSON.parse(content))
                console.log(content)
            }}>Обновить</button>
            {/*<div>{editorContent.text}</div>*/}
        </>
    )
}

export default Tiptap
