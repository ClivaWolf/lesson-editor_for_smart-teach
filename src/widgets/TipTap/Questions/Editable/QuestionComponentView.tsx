import {NodeConfig, NodeViewWrapper, ReactNodeViewRenderer} from '@tiptap/react';
import {Question} from '../../../../shared/types/LessonType.ts';
import {ChoiceQuestion} from './Choice/Choice.tsx';
import {Node} from '@tiptap/core';
import {memo, useEffect, useState} from 'react';
import styles from './Choice/Question.module.css';
import {PreviewChoice} from "../Preview/Choice/PreviewChoice.tsx";

interface ReactComponentViewProps {
    node: {
        attrs: {
            content: Question;
            edit: boolean;
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
            edit: true
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
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setIsEditing(node.attrs.edit);
        console.log('isEditing', node.attrs.edit);
    }, [node.attrs.edit]);

    if (!question) {
        return null;
    }

    return (
        <NodeViewWrapper className="react-component">
            <div className={styles.question}>
                {isEditing ? (
                    (question.type === 'mono' || question.type === 'multi') && (
                        <ChoiceQuestionMemo question={question} updateAttributes={updateAttributes}
                                            setIsEditing={(isEditing) => {
                                                setIsEditing(isEditing);
                                                node.attrs.edit = isEditing;
                                            }}/>
                    )
                ) : (
                    (question.type === 'mono' || question.type === 'multi') && (
                        <PreviewChoiceMemo question={question}/>
                    )
                )}
            </div>
        </NodeViewWrapper>
    );
};

const ChoiceQuestionMemo = memo(({question, updateAttributes, setIsEditing}) => (
    <ChoiceQuestion question={question} updateAttributes={updateAttributes} setIsEditing={setIsEditing}/>
));

const PreviewChoiceMemo = memo(({question}) => (
    <PreviewChoice question={question}/>
));

export default ReactComponentNode;