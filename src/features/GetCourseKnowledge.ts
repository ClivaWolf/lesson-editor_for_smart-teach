import knowledge from "../../public/Course_1/knowledge.json";

interface Option {
    value: string;
    label: string;
    children?: Option[];
}

export function GetKnowledge({courseId}: { courseId: string }): Promise<Option[]> {
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (courseId === '1') {
                    resolve(knowledge);
                } else {
                    reject(new Error('Неверный courseId'));
                }
            }, 500);
        }
    );
}