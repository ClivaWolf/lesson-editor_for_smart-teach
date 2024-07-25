import {Task} from "../shared/types/LessonType";
// import bank from '../../public/Course_1/bank.json'



//TODO: Эта функция отвечает за получение банка задач из файла /Course_1/bank.json
export function GetBank({courseId}: { courseId: string }): Promise<Task[]> {
    let bank = undefined
    fetch('http://localhost:3000/tasks', {
        method: 'Get'
    }).then(res => res.json()).then(res => bank = res)
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (courseId === '1') {
                    resolve(bank); // TODO: Реализовать функцию для получения банка задач из файла
                } else {
                    reject(new Error('Неверный courseId'));
                }
            }, 1500);
        }
    );
}