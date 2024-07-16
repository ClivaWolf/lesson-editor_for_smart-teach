export type Lesson = {
    id: number,
    title: string,
    description: string,
    courseId: number,
    timeLimit: number,
    tasks: Task[],
}

export type Task = {
    id: string,
    questions: Question[],
    public: boolean
}

export type QuestionType = 'mono' | 'multi' | 'input' | 'sort' | 'transfer'

export type Question = {
    id: string,
    body: string,
    type: QuestionType,
    answers: string[],
    correctAnswers: string[],
}