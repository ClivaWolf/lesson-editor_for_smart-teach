import {EditorContent} from "@tiptap/react";
import {Task} from "../../../../shared/types/LessonType";
import Editors from "../../../TipTap/Editors.tsx";
import {useEffect} from "react";

export function BankQuestion({task}: { task: Task }) {

    const editor = Editors('preview');

    if (!editor) {
        return null
    }

    useEffect(() => {
        editor.commands.setContent(JSON.parse(task.content))
    }, []);

    return (
        <EditorContent editor={editor}/>
    )
}