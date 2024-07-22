import {Task} from "../shared/types/LessonType";

export function GetBank({courseId}: { courseId: string }): Promise<Task[]> {
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (courseId === '1') {
                    resolve([
                        {
                            id: '1',
                            content: 'Вычислить $\\log_3{\\frac{1}{27}}$' +
                            `<react-component data-content='{
                                "id": "1",
                                "type": "mono",
                                "cost": 1,
                                "welcome_text": "Выберите один из вариантов ответа:",
                                "knowledge": ['Определение логарифма'],
                                "answers": [
                                {
                                    "title": "3",
                                    "dataIndex": "1"
                                },
                                {
                                    "title": "-2",
                                    "dataIndex": "2"
                                },
                                {
                                    "title": "-3",
                                    "dataIndex": "3"
                                },
                                {
                                    "title": "-4",
                                    "dataIndex": "4"
                                }
                                ],
                                "correctAnswers": ["3"],
                                "random": true
                            }`,
                            scores: 5,
                            knowledge: ['Определение логарифма'],
                            public: true
                        },
                        {
                            id: '2',
                            content: 'Вычислить: ${64}^{\\log_4{5}}$' +
                            `<react-component data-content='{
                                "id": "2",
                                "type": "mono",
                                "cost": 1,
                                "welcome_text": "Выберите один из вариантов ответа:",
                                "knowledge": ["Основное логарифмическое тождество", "Свойства логарифмов"],
                                "answers": [
                                {
                                    "title": "5",
                                    "dataIndex": "1"
                                },
                                {
                                    "title": "1",
                                    "dataIndex": "2"
                                },
                                {
                                    "title": "7",
                                    "dataIndex": "3"
                                },
                                {
                                    "title": "0",
                                    "dataIndex": "4"
                                }
                                ],
                                "correctAnswers": ["1"],
                                "random": true
                            }`,
                            scores: 5,
                            knowledge: ['Определение логарифма'],
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