import {createContext, FC, ReactNode, useContext, useEffect, useState} from "react";
import {Lesson} from "../types/LessonType.ts";
import {GetLesson} from "../../features/GetLesson.ts";


interface LessonContextProps {
    lesson: Lesson;
    setLesson: (lesson: Lesson) => void;
    loading: boolean;
}

const LessonId = '0'; // TODO: В будущем LessonId будет браться из slag

const LessonContext = createContext<LessonContextProps | undefined>(undefined);

export const LessonProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetLesson({lessonId: LessonId}).then((_lesson) => {
            setLesson(_lesson);
            setLoading(false);
        }).catch(() => setLoading(true));
    }, []);

    return (
        <LessonContext.Provider value={{
            lesson,
            setLesson,
            loading
        } as LessonContextProps}>
            {children}
        </LessonContext.Provider>
    );
}

export const useLesson = () => {
    const context = useContext(LessonContext);
    if (!context) {
        throw new Error('useLesson must be used within an LessonProvider');
    }
    return context;
};