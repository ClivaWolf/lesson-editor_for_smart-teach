import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {Task} from "../../../../shared/types/LessonType";

export function Question({task}: { task: Task }) {

    const editor = useEditor({
        autofocus: true,
        extensions: [StarterKit],
        content: task.content,
        editable: false
    });

    return (
        <EditorContent editor={editor}/>
    )
}