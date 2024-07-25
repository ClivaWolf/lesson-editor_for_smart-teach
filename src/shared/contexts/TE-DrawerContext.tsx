import { createContext, useState, useContext } from 'react';
import {Task} from "../types/LessonType.ts";
import {JSONContent} from "@tiptap/react";

interface TEDrawerContextProps {
    visible: boolean;
    showDrawer: (content?: string) => void;
    closeDrawer: () => void;
    content: JSONContent | undefined;
    scores: number;
    knowledge: string[];
}

// Создаем контекст
const DrawerContext = createContext<TEDrawerContextProps | undefined>(undefined);

export const useDrawer = () => {
    return useContext(DrawerContext);
};

export const DrawerProvider = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [content, setContent] = useState<JSONContent | undefined>({});
    const [scores, setScores] = useState<number>(0);
    const [knowledge, setKnowledge] = useState<string[]>([]);

    const showDrawer = (task: Task) => {
        setVisible(true);
        setContent(task.content);
        setScores(task.scores);
        setKnowledge(task.knowledge);
    };

    const closeDrawer = () => {
        setVisible(false);
        setContent({} as JSONContent);
    };

    return (
        <DrawerContext.Provider value={{ visible, showDrawer, closeDrawer, content, scores, knowledge }}>
            {children}
        </DrawerContext.Provider>
    );
};
