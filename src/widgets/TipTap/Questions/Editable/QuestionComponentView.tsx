import {NodeConfig, NodeViewWrapper} from '@tiptap/react';
import {Question} from '../../../../shared/types/LessonType.ts';
import {ChoiceQuestion} from './Choice/Choice.tsx';
import {Node} from '@tiptap/core';
import {ReactNodeViewRenderer} from '@tiptap/react';
import {useEffect, useState} from 'react';
import {useQuestion} from '../../../../shared/contexts/QuestionContext.tsx';
import styles from './Choice/Question.module.css';

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
    const {setQuestion, question} = useQuestion();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (node.attrs.content) {
            setQuestion(node.attrs.content);
        }
    }, [node.attrs.content, setQuestion]);

    const handleFocus = () => {
        setIsActive(true);
    };

    const handleBlur = () => {
        setIsActive(false);
    };

    if (!question) {
        return null;
    }

    return (
        <NodeViewWrapper className="react-component">
            <div
                className={`${styles.question} ${isActive ? styles.active : ''}`}
                onClick={handleFocus}
                onFocus={handleFocus}
                // onBlur={handleBlur}
            >
                {(question.type === 'mono' || question.type === 'multi') && (
                    <ChoiceQuestion isActive={isActive} updateAttributes={updateAttributes}/>
                )}
            </div>
        </NodeViewWrapper>
    );
};

export default ReactComponentNode;
