import {NodeConfig, NodeViewWrapper, ReactNodeViewRenderer} from '@tiptap/react';
import {Question} from '../../../../shared/types/LessonType.ts';
import {ChoiceQuestion} from './Choice/Choice.tsx';
import {Node} from '@tiptap/core';
import {useState} from 'react';
import styles from './Choice/Question.module.css';
import {Button, Space} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {PreviewChoice} from "../Preview/Choice/PreviewChoice.tsx";

interface ReactComponentViewProps {
    node: {
        attrs: {
            content: Question;
        };
    };
    updateAttributes: (attrs: Partial<Question>) => void;
}

const ReactComponentNode = Node.create({
    name: 'reactComponent',
    group: 'block',
    atom: true,

    addAttributes() {
        return {
            content: {
                default: '{}',
                parseHTML: (element: HTMLElement) => {
                    const jsonString = element.getAttribute('data-content') || '{}';
                    let content = {};
                    try {
                        content = JSON.parse(jsonString);
                    } catch (error) {
                        console.error('Failed to parse JSON', error);
                    }
                    return content;
                },
                renderHTML: (attributes) => {
                    return {'data-content': JSON.stringify(attributes.content)};
                },
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'react-component',
                getAttrs: dom => ({
                    content: dom.getAttribute('content'),
                }),
            },
        ];
    },

    renderHTML({HTMLAttributes}) {
        return ['react-component', {'data-content': JSON.stringify(HTMLAttributes.content)}];
    },

    addNodeView() {
        return ReactNodeViewRenderer(ReactComponent);
    },
} as Partial<NodeConfig>);

const ReactComponent = ({node, updateAttributes}: ReactComponentViewProps) => {
    const question = node.attrs.content;
    const [isHover, setIsHover] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    if (!question) {
        return null;
    }

    const Toolbox = () => {
        return (
            <Space.Compact>
                <Button type={'text'} icon={<EditOutlined/>} onClick={() => setIsEditing(true)}/>
                <Button type={'text'} icon={<DeleteOutlined/>} onClick={() => setIsEditing(false)}/>
            </Space.Compact>
        )
    }

    return (
        <NodeViewWrapper className="react-component">
            <div
                className={`${styles.question} ${isHover ? styles.active : ''}`}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                {isHover && !isEditing && <Toolbox/>}
                {isEditing ? (
                    (question.type === 'mono' || question.type === 'multi') && (
                        <ChoiceQuestion question={question} updateAttributes={updateAttributes}/>
                    )
                ) : (
                    (question.type === 'mono' || question.type === 'multi') && (
                        <PreviewChoice question={question}/>
                    )
                )}
            </div>
        </NodeViewWrapper>
    );
};

export default ReactComponentNode;
