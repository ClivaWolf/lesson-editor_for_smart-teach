import React, {createContext, useContext, useState} from 'react';
import {Question} from "../types/LessonType";

interface QuestionContextProps {
    question: Question;
    setQuestion: (question: Question) => void;
    calculateScore: () => number;
    setCalculateScore: (calculateScore: () => number) => void;
}

const QuestionContext = createContext<QuestionContextProps | undefined>(undefined);

export const QuestionProvider: React.FC = ({children}) => {
    const [question, setQuestion] = useState<Question>(null);
    const [calculateScore, setCalculateScore] = useState<() => number>(() => 0);

    return (
        <QuestionContext.Provider value={{
            question,
            setQuestion,
            calculateScore,
            setCalculateScore
        }}>
            {children}
        </QuestionContext.Provider>
    );
};

export const useQuestion = () => {
    const context = useContext(QuestionContext);
    if (!context) {
        throw new Error('useQuestion must be used within a QuestionProvider');
    }
    return context;
};