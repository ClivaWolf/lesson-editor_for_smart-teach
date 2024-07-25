import {EditorContent} from "@tiptap/react";
import {Task} from "../../shared/types/LessonType";
import Editors from "../TipTap/Editors.tsx";
import {useLayoutEffect} from "react";

export function TestQuestion({task}: { task: Task | null }) {

    const editor = Editors('test');

    useLayoutEffect(() => {
        if (!editor?.isDestroyed && editor && task) {
            setTimeout(() => {
                editor.commands.setContent(task.content);
            }, 0);
        }
    }, [editor, task]);

    if (!editor || !task) {
        return null
    }

    return (
        <EditorContent editor={editor}/>
    )
}