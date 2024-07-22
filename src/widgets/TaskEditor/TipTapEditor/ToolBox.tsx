import {Button, Flex} from "antd";
import React from "react";
import {BoldOutlined} from "@ant-design/icons";
import {EditorContentProps} from "@tiptap/react";

export function ToolBox({editor}: { editor: EditorContentProps['editor'] }) {

    if (!editor) {
        return null
    }

    const emptyMonoQuestion = `<react-component data-content='{
                    "id": "${Date.now()}",
                    "type": "mono",
                    "answers": [],
                    "correctAnswers": [],
                    "random": true
                }'/>`

    return (
        <Flex>
            <Button icon={<BoldOutlined/>}
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'is-active' : ''}/>
            <Button icon={<BoldOutlined/>}
                    onClick={() => editor?.chain().insertContent(emptyMonoQuestion).run()}
                    className={editor.isActive('formula') ? 'is-active' : ''}/>
        </Flex>
    )
}