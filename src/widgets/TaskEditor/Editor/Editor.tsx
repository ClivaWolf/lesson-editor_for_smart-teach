import {useLayoutEffect, useEffect, useState, useCallback} from "react";
import {Flex, Typography, Badge} from "antd";
import {EditorContent} from '@tiptap/react';
import {ToolBox} from "../../TipTap/Menus/ToolBox.tsx";
import 'katex/dist/katex.min.css';
import BubbleMenu from "../../TipTap/Menus/BubbleMenu.tsx";
import Editors from "../../TipTap/Editors.tsx";
import {useDrawer} from "../../../shared/contexts/TE-DrawerContext.tsx";
import {Question} from "../../../shared/types/LessonType.ts";
import {PreviewKnowledge} from "../../KnowledgeSelector/Preview/PreviewKnowledge.tsx";

const Tiptap = () => {
    const {content, scores, knowledge} = useDrawer();
    const [totalScores, setTotalScores] = useState<number>(scores);
    const [totalKnowledge, setTotalKnowledge] = useState(new Set(knowledge));

    const editor = Editors('editor');

    const calculateTotalScores = useCallback(() => {
        const nodes = editor?.getJSON().content || [];
        let total_scores = 0;
        const total_knowledge = new Set(totalKnowledge);
        nodes.forEach(node => {
            if (node.type === 'reactComponent') {
                const attrs = (node.attrs as { content: Question }).content;
                attrs.knowledge.forEach(k => total_knowledge.add(k));
                total_scores += attrs.cost;
            }
        });
        setTotalScores(total_scores);
        setTotalKnowledge(total_knowledge);
        console.log(Array.from(total_knowledge));
    }, [editor, totalKnowledge]);

    useLayoutEffect(() => {
        if (editor && !editor.isDestroyed) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    useEffect(() => {
        if (editor) {
            editor.on('update', calculateTotalScores);
        }
        return () => {
            if (editor) {
                editor.off('update', calculateTotalScores);
            }
        };
    }, [calculateTotalScores, editor]);

    const saveTask = () => {
        console.log('save')
        // console.log(Tiptap.)
        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({content})
        })
    };

    if (!editor)
        return null

    return (
        <>
            <Flex gap={12} align={'baseline'} style={{width: '100%'}}>
                <Typography.Title level={4} style={{whiteSpace: 'nowrap'}}>Баллов за задание: </Typography.Title>
                <Badge count={totalScores} color="green" showZero/>
                <br/>
                <Typography.Title level={4} style={{whiteSpace: 'nowrap'}}>Необходимые знания: </Typography.Title>
                <PreviewKnowledge knowledge={Array.from(totalKnowledge)}/>
            </Flex>
            <ToolBox editor={editor}/>
            <BubbleMenu editor={editor}/>
            <EditorContent editor={editor}/>
            <Button onClick={saveTask}>Другое сохранить</Button>
        </>
    );
};

export default Tiptap;
