import {Lesson} from "../shared/types/LessonType";

export function GetLesson({lessonId}: { lessonId: string }): Promise<Lesson> {
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (lessonId === '1') {
                    resolve({
                        id: 1,
                        title: 'Урок 1',
                        description: 'Описание 1',
                        courseId: 1,
                        tasks: ['2']
                    });
                } else if (lessonId === '2') {
                    resolve({
                        id: 2,
                        title: 'Заголовок 2',
                        description: 'Описание 2',
                        courseId: 1,
                        tasks: []
                    });
                } else {
                    reject(new Error('Неверный courseId'));
                }
            }, 1500);
        }
    );
}