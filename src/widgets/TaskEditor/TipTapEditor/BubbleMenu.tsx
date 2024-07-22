import {BubbleMenu, EditorContentProps} from "@tiptap/react";
import {ActionGroup, ActionIconGroupItemType} from '@ant-design/pro-editor';
import {BoldOutlined, ItalicOutlined} from "@ant-design/icons";

export default ({editor}: { editor: EditorContentProps['editor'] }) => {

    if (!editor) {
        return null
    }

    const dropdownMenuItems: ActionIconGroupItemType[] = [
        {
            icon: <BoldOutlined/>,
            onClick: () => editor?.chain().focus().toggleBold().run(),
            disabled: !editor?.can().chain().focus().toggleBold().run(),
            className: editor?.isActive('bold') ? 'is-active' : '',
            title: 'Жирный',
        },
        {
            icon: <ItalicOutlined/>,
            onClick: () => editor?.chain().focus().toggleItalic().run(),
            disabled: !editor?.can().chain().focus().toggleItalic().run(),
            className: editor?.isActive('italic') ? 'is-active' : '',
            title: 'Курсив',
        },
    ];
    return (
        <>
            {editor && <BubbleMenu className="bubble-menu" tippyOptions={{duration: 100}} editor={editor}>
                <ActionGroup items={dropdownMenuItems}/>
            </BubbleMenu>}
        </>
    )
}