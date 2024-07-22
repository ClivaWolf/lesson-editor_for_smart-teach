import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ReactComponent from './ReactComponentPreview'
import {Mathematics} from '@tiptap-pro/extension-mathematics'
import 'katex/dist/katex.min.css'
import {Button} from "antd";

const Preview = ({content}: { content: string }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Mathematics,
            ReactComponent,
        ],
        editable: false
    });

    if (!editor) {
        return null;
    }

    // editor.chain().focus().clearContent().run();
    // editor.commands.insertContent(content);

    return (
        <>
            <Button onClick={() => {
                editor?.chain().focus().clearContent().run();
                editor?.chain().insertContent(content).run();
                console.log(content);
                // editor?.commands.insertContent(content);
            }}>Preview</Button>
            <EditorContent editor={editor}/>
        </>
    );
};

export default Preview;