import {Lesson} from "../shared/types/LessonType";
import start_lesson from "../../public/Course_1/Lessons/start_lesson.json";
import lesson_1 from "../../public/Course_1/Lessons/lesson_1.json";
import lesson_2 from "../../public/Course_1/Lessons/lesson_2.json";

// TODO: Эта функция асинхронно читает файлы из /Course_1/Lessons/lesson_[id].json
export function GetLesson({lessonId}: { lessonId: string }): Promise<Lesson> {
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (lessonId === '0') {
                    resolve(start_lesson);
                } else if (lessonId === '1') {
                    resolve(lesson_1);
                } else if (lessonId === '2') {
                    resolve(lesson_2);
                } else {
                    reject(new Error('Неверный courseId'));
                }
            }, 1500);
        }
    );
}