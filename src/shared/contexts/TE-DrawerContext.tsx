import { createContext, useState, useContext } from 'react';
import {Task} from "../types/LessonType.ts";

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
    const [content, setContent] = useState<string | undefined>('');
    const [scores, setScores] = useState(0);
    const [knowledge, setKnowledge] = useState<string[]>([]);

    const showDrawer = (task: Task) => {
        setVisible(true);
        setContent(JSON.parse(task.content ?? '{}'));
        setScores(task.scores);
        setKnowledge(task.knowledge);
    };

    const closeDrawer = () => {
        setVisible(false);
        setContent('');
    };

    return (
        <DrawerContext.Provider value={{ visible, showDrawer, closeDrawer, content, scores, knowledge }}>
            {children}
        </DrawerContext.Provider>
    );
};
