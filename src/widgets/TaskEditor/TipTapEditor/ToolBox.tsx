import {Button, Flex} from "antd";
import React from "react";
import {BoldOutlined} from "@ant-design/icons";
import {EditorContentProps} from "@tiptap/react";

export function ToolBox({editor}: { editor: EditorContentProps['editor'] }) {

    if (!editor) {
        return null
    }

    return (
        <Flex>
            <Button icon={<BoldOutlined/>} onClick={() => editor?.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'is-active' : ''}/>
        </Flex>
    )
}