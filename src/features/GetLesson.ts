import {Lesson} from "../shared/types/LessonType";

export function GetLesson({lessonId}: { lessonId: string }): Promise<Lesson> {
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (lessonId === '1') {
                    resolve({
                        id: 1,
                        title: 'Заголовок 1',
                        description: 'Описание 1',
                        courseId: 1,
                        timeLimit: 10,
                        tasks: []
                    });
                } else if (lessonId === '2') {
                    resolve({
                        id: 2,
                        title: 'Заголовок 2',
                        description: 'Описание 2',
                        courseId: 1,
                        timeLimit: 10,
                        tasks: []
                    });
                } else {
                    reject(new Error('Неверный courseId'));
                }
            }, 1500);
        }
    );
}