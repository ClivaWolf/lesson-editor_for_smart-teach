import {Lesson, Task} from "../shared/types/LessonType";

export function GetBank({courseId}: { courseId: string }): Promise<Task[]> {
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (courseId === '1') {
                    resolve([
                        {
                            id: '1',
                            questions: [
                                {
                                    id: '1',
                                    body: 'Какой-то вопрос?',
                                    type: 'mono',
                                    answers: ['Ответ 1', 'Ответ 2', 'Ответ 3'],
                                    correctAnswers: [0]
                                }
                            ],
                            public: true
                        },
                        {
                            id: '2',
                            questions: [
                                {
                                    id: '2',
                                    body: 'Какой-то вопрос?',
                                    type: 'mono',
                                    answers: ['Ответ 1', 'Ответ 2', 'Ответ 3'],
                                    correctAnswers: [0]
                                }
                            ],
                            public: true
                        }]);
                } else {
                    reject(new Error('Неверный courseId'));
                }
            }, 1500);
        }
    )
        ;
}