import { createContext, useState, useContext } from 'react';

interface TEDrawerContextProps {
    visible: boolean;
    showDrawer: () => void;
    closeDrawer: () => void;
    totalScores: number;
    setTotalScores: (totalScores: number) => void;
}

// Создаем контекст
const DrawerContext = createContext<TEDrawerContextProps | undefined>(undefined);

export const useDrawer = () => {
    return useContext(DrawerContext);
};

export const DrawerProvider = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [totalScores, setTotalScores] = useState(0);

    const showDrawer = () => {
        setVisible(true);
    };

    const closeDrawer = () => {
        setVisible(false);
    };

    return (
        <DrawerContext.Provider value={{ visible, showDrawer, closeDrawer }}>
            {children}
        </DrawerContext.Provider>
    );
};
