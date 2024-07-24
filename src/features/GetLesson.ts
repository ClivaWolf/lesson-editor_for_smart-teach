import {Lesson} from "../shared/types/LessonType";

// TODO: Эта функция асинхронно читает файлы из /Course_1/Lessons/lesson_[id].json
export function GetLesson({lessonId}: { lessonId: string }): Promise<Lesson> {
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (lessonId === '1') {
                    resolve();
                } else if (lessonId === '2') {
                    resolve();
                } else {
                    reject(new Error('Неверный courseId'));
                }
            }, 1500);
        }
    );
}