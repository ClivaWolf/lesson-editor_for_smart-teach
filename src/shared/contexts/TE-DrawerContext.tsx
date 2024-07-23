import { createContext, useState, useContext } from 'react';

interface TEDrawerContextProps {
    visible: boolean;
    showDrawer: (content?: string) => void;
    closeDrawer: () => void;
    totalScores: number;
    setTotalScores: (totalScores: number) => void;
    content: string;
}

// Создаем контекст
const DrawerContext = createContext<TEDrawerContextProps | undefined>(undefined);

export const useDrawer = () => {
    return useContext(DrawerContext);
};

export const DrawerProvider = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [content, setContent] = useState<string | undefined>('');
    const [totalScores, setTotalScores] = useState(0);

    const showDrawer = (_content?: string) => {
        setVisible(true);
        setContent(_content);
    };

    const closeDrawer = () => {
        setVisible(false);
        setContent('');
    };

    return (
        <DrawerContext.Provider value={{ visible, showDrawer, closeDrawer, content }}>
            {children}
        </DrawerContext.Provider>
    );
};
