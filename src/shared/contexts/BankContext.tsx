import {createContext, FC, ReactNode, useContext, useEffect, useState} from "react";
import {GetBank} from "../../features/GetCourseBank.ts";
import {Task} from "../types/LessonType.ts";


interface BankContextProps {
    Bank: Task[];
    setBank: (Bank: Task[]) => void;
    loading: boolean;
}

const courseId = '1'; // TODO: В будущем BankId будет браться из slag

const BankContext = createContext<BankContextProps | undefined>(undefined);

export const BankProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [Bank, setBank] = useState<Task[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetBank({courseId: courseId}).then((Bank) => {
            setBank(Bank);
            setLoading(false);
        }).catch(() => setLoading(true));
    }, []);

    return (
        <BankContext.Provider value={{
            Bank,
            setBank,
            loading
        } as BankContextProps}>
            {children}
        </BankContext.Provider>
    );
}

export const useBank = () => {
    const context = useContext(BankContext);
    if (!context) {
        throw new Error('useBank must be used within an BankProvider');
    }
    return context;
};