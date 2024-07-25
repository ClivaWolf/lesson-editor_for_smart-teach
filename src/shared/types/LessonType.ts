import {JSONContent} from "@tiptap/react";

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
    content: JSONContent,
    scores: number,
    knowledge: string[],
    public: boolean
}

export type QuestionType = 'mono' | 'multi' | 'input' | 'sort' | 'transfer'

export type Question = {
    id: string,
    type: QuestionType,
    answers: Answer[],
    userAnswers: string[] | null,
    correctAnswers: string[],
    knowledge: string[],
    cost: number,
    random: boolean,
    incomplete_score?: boolean
    welcome_text?: string
}

export type Answer = {
    title?: string,
    dataIndex?: string
}