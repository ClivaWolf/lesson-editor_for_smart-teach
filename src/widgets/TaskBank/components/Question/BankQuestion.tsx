import {EditorContent} from "@tiptap/react";
import {Task} from "../../../../shared/types/LessonType";
import Editors from "../../../TipTap/Editors.tsx";

export function BankQuestion({task}: { task: Task }) {
    return (
        <EditorContent editor={Editors('preview')} content={task.content}/>
    )
}