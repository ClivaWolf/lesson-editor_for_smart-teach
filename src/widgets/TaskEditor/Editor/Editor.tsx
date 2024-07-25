import {useLayoutEffect, useEffect, useState} from "react";
import {Flex, Typography, Badge, Button} from "antd";
import {EditorContent} from '@tiptap/react'
import {ToolBox} from "../../TipTap/Menus/ToolBox.tsx";
import 'katex/dist/katex.min.css'
import BubbleMenu from "../../TipTap/Menus/BubbleMenu.tsx";
import Editors from "../../TipTap/Editors.tsx";
import {useDrawer} from "../../../shared/contexts/TE-DrawerContext.tsx";
import {Question} from "../../../shared/types/LessonType.ts";
import {PreviewKnowledge} from "../../KnowledgeSelector/Preview/PreviewKnowledge.tsx";

const Tiptap = () => {

    const getContent = () => {
        return editor?.getJSON();
    };

    const {content, scores, knowledge} = useDrawer()
    const [totalScores, setTotalScores] = useState(scores)
    const [totalKnowledge, setTotalKnowledge] = useState(knowledge)

    const editor = Editors('editor')

    const calculateTotalScores = () => {
        const nodes = editor?.getJSON().content || [];
        let total_scores = 0;
        let total_knowledge = new Set(totalKnowledge);
        nodes.forEach(node => {
            if (node.type === 'reactComponent') {
                const attrs = (node.attrs as { content: Question }).content;
                attrs.knowledge.forEach(k => total_knowledge.add(k));
                total_scores += attrs.cost;
            }
        });
        setTotalScores(total_scores);
        setTotalKnowledge(Array.from(total_knowledge));
        console.log(totalKnowledge);
    };

    useLayoutEffect(() => {
        if (!editor?.isDestroyed && editor) {
            setTimeout(() => {
                editor.commands.setContent(content);
            }, 0);
        }
    }, [content, editor]);

    useEffect(() => {
        if (editor) {
            editor.on('update', () => {
                calculateTotalScores()
            });
        }
    }, [editor]);

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
                <Typography.Title level={4} style={{textWrap: 'nowrap'}}>Баллов за задание: </Typography.Title>
                <Badge count={totalScores} color="green" showZero/>
                <br/>
                <Typography.Title level={4} style={{textWrap: 'nowrap'}}>Необходимые знания: </Typography.Title>
                <PreviewKnowledge knowledge={totalKnowledge}/>
            </Flex>
            <ToolBox editor={editor}/>
            <BubbleMenu editor={editor}/>
            <EditorContent editor={editor}/>
            <Button onClick={saveTask}>Другое сохранить</Button>
        </>
    )
}

export default Tiptap
