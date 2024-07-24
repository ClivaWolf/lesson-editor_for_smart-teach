import {Task} from "../shared/types/LessonType";

//TODO: Эта функция отвечает за получение банка задач из файла /Course_1/bank.json
export function GetBank({courseId}: { courseId: string }): Promise<Task[]> {
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (courseId === '1') {
                    resolve(); // TODO: Реализовать функцию для получения банка задач из файла
                } else {
                    reject(new Error('Неверный courseId'));
                }
            }, 1500);
        }
    )
        ;
}