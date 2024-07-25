import React from "react";
import {Button, Divider, Space} from "antd";
import {Dropdown, Input} from "@ant-design/pro-editor";
import {
    BoldOutlined,
    CheckCircleOutlined,
    CheckSquareOutlined,
    CodeOutlined,
    DownOutlined,
    ItalicOutlined,
    StrikethroughOutlined,
    UnorderedListOutlined
} from "@ant-design/icons";
import {EditorContentProps} from "@tiptap/react";
import Link from "./Marks/Link";
import Image from "./Nodes/Image";
import Formula from "./Nodes/Formula";


export function ToolBox({editor}: { editor: EditorContentProps['editor'] }) {

    if (!editor) {
        return null
    }

    const welcomeText = (type: 'mono' | 'multi') => {
        if (type === 'mono') {
            return "Выберите один из вариантов ответа:"
        } else {
            return "Выберите несколько вариантов ответа:"
        }
    }

    const emptyChoiceQuestion = (type: 'mono' | 'multi') => JSON.parse(
        `{
            "type": "reactComponent",
            "attrs": {
                "content": {
                    "id": "${Date.now()}",
                    "type": "${type}",
                    "cost": 1,
                    "welcome_text": "${welcomeText(type)}",
                    "knowledge": [],
                    "answers": [
                        {
                            "title": "Вариант 1",
                            "dataIndex": "1"
                        },
                        {
                            "title": "Вариант 2",
                            "dataIndex": "2"
                        }
                    ],
                    "correctAnswers": [
                        "1"
                    ],
                    "random": true
                },
                "meta": {
                    "edit": true
                }
            }
        }`)

    return (
        <Space split={<Divider/>} style={{margin: '10px'}}>
            <Space.Compact>
                <Button icon={<BoldOutlined/>}
                        onClick={() => editor?.chain().focus().toggleBold().run()}
                        disabled={!editor.can().chain().focus().toggleBold().run()}
                        type={editor.isActive('bold') ? 'primary' : 'default'}/>
                <Button icon={<ItalicOutlined/>}
                        onClick={() => editor?.chain().focus().toggleItalic().run()}
                        disabled={!editor.can().chain().focus().toggleItalic().run()}
                        type={editor.isActive('italic') ? 'primary' : 'default'}/>
                <Button icon={<StrikethroughOutlined/>}
                        onClick={() => editor?.chain().focus().toggleStrike().run()}
                        disabled={!editor.can().chain().focus().toggleStrike().run()}
                        type={editor.isActive('strike') ? 'primary' : 'default'}/>
                <Button icon={<CodeOutlined/>}
                        onClick={() => editor?.chain().focus().toggleCode().run()}
                        disabled={!editor.can().chain().focus().toggleCode().run()}
                        type={editor.isActive('code') ? 'primary' : 'default'}/>
            </Space.Compact>
            <Space.Compact>
                <Link editor={editor}/>
                <Formula editor={editor}/>
                <Image editor={editor}/>
            </Space.Compact>
            <Space.Compact>
                <Dropdown.Button
                    icon={<DownOutlined/>}
                    iconPosition={'end'}
                    menu={{
                        items: [
                            {
                                label: 'С вариантами ответов', icon: <UnorderedListOutlined />, children: [
                                    {
                                        label: 'с одним правильным',
                                        icon: <CheckCircleOutlined/>,
                                        key: 'mono'},
                                    {
                                        label: 'с несколькими правильными',
                                        icon: <CheckSquareOutlined/>,
                                        key: 'multi'
                                    }
                                ]
                            },
                        ],
                        onClick: ({key}) => {
                            editor?.chain().focus().insertContent(emptyChoiceQuestion(key)).run()
                        }
                    }}
                >
                    Вопрос
                </Dropdown.Button>
            </Space.Compact>
        </Space>
    )
}

{/*<Button icon={<UnderlineOutlined/>}*/
}
{/*        onClick={() => editor?.chain().focus().toggleUnderline().run()}*/
}
{/*        disabled={!editor.can().chain().focus().toggleUnderline().run()}*/
}
{/*        type={editor.isActive('underline') ? 'primary' : 'default'}/>*/
}