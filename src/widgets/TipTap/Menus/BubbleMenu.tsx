import {BubbleMenu} from "@tiptap/react";
import {ActionGroup, ActionIconGroupItemType} from '@ant-design/pro-editor';
import {BoldOutlined, EditOutlined, ItalicOutlined, DeleteOutlined} from "@ant-design/icons";
import {EditorContentProps} from "@tiptap/react";

export default function BubbleMenuEditor({editor}: { editor: EditorContentProps['editor'] }) {

    if (!editor) {
        return null
    }

    const textBMItems: ActionIconGroupItemType[] = [
        {
            icon: <BoldOutlined/>,
            onClick: () => editor?.chain().focus().toggleBold().run(),
            disabled: !editor?.can().chain().focus().toggleBold().run(),
            title: 'Жирный',
        },
        {
            icon: <ItalicOutlined/>,
            onClick: () => editor?.chain().focus().toggleItalic().run(),
            disabled: !editor?.can().chain().focus().toggleItalic().run(),
            title: 'Курсив',
        },
    ];

    function deleteReactComponentWithId(id) {
        const {state, view} = editor;

        state.doc.descendants((node, pos) => {
            if (node.type.name === 'reactComponent' && node.attrs?.content?.id === id) {
                const tr = state.tr;
                tr.delete(pos, pos + node.nodeSize);
                view.dispatch(tr);
                return false;
            }
        });
    }

    function editReactComponentWithId(id) {
        const {state, view} = editor;

        state.doc.descendants((node, pos) => {
            if (node.type.name === 'reactComponent' && node.attrs?.content?.id === id) {
                const tr = state.tr;
                tr.setNodeMarkup(pos, undefined, {
                        ...node.attrs,
                        edit: true
                    }
                );
                view.dispatch(tr);
                console.log("Successfully edited", node);
                return false;
            }
        });
    }

    const rcBMItems = (node_id: string): ActionIconGroupItemType[] => [
        {
            icon: <EditOutlined/>,
            onClick: () => editReactComponentWithId(node_id),
            title: 'Редактировать',
        },
        {
            icon: <DeleteOutlined/>,
            onClick: () => deleteReactComponentWithId(node_id),
            title: 'Удалить',
        },
    ]

    return (
        <>
            {editor && <BubbleMenu className="bubble-menu" tippyOptions={{duration: 100}} editor={editor}>
                {editor.getAttributes('reactComponent')?.content?.id ? (
                    <ActionGroup items={rcBMItems(editor.getAttributes('reactComponent')?.content?.id)}/>
                ) : (
                    <ActionGroup items={textBMItems}/>
                )}
            </BubbleMenu>}
        </>
    )
}