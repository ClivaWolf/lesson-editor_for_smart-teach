export type Lesson = {
    id: number,
    title: string,
    description: string,
    courseId: number,
    timeLimit: number,
    tasksId: string[],
}

export type Task = {
    id: string,
    content: string,
    public: boolean
}

export type QuestionType = 'mono' | 'multi' | 'input' | 'sort' | 'transfer'

export type Question = {
    id: string,
    type: QuestionType,
    answers: Answer[],
    correctAnswers: string[],
    random: boolean
}

export type Answer = {
    title?: string,
    dataIndex?: string
}