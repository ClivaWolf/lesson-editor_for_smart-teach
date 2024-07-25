import {Button, Drawer, Pagination, Result} from "antd";
import {Lesson, Question} from "../../shared/types/LessonType.ts";
import {TestQuestion} from "./TestQuestion.tsx";
import {useState, useEffect} from "react";
import {useBank} from "../../shared/contexts/BankContext.tsx";
import {JSONContent} from "@tiptap/react";

export function PassTest({lesson, showDrawer, setShowDrawer}: {
    lesson: Lesson,
    showDrawer: boolean,
    setShowDrawer: (value: boolean) => void
}) {
    const {getById} = useBank();
    const [currentTask, setCurrentTask] = useState(1);
    const [testCompleted, setTestCompleted] = useState(false);

    function parseReactComponents(jsonObj: JSONContent): Question[] {
        let result: Question[] = [];

        if (jsonObj.type === "reactComponent") {
            result.push(jsonObj.attrs?.content);
        } else if (Array.isArray(jsonObj.content)) {
            jsonObj.content.forEach(item => {
                result = result.concat(parseReactComponents(item));
            });
        }

        return result;
    }

    const Results = () => {
        const [scores, setScores] = useState(0);

        useEffect(() => {
            const totalScore = lesson.tasksId.flatMap(task => parseReactComponents(getById(task)?.content ?? {}))
                .reduce((acc, question) => {
                    if (question.userAnswers && question.userAnswers.sort().toString() === question.correctAnswers.sort().toString()) {
                        return acc + question.cost;
                    }
                    return acc;
                }, 0);

            setScores(totalScore);
        }, []);

        return (
            <Result
                status={scores > 0 ? "success" : "error"}
                title={scores > 0 ? "Тест пройден" : "Тест не пройден"}
                subTitle={"Набрано баллов: " + scores}
            />
        );
    };

    return (
        <Drawer
            title={lesson?.title}
            width={"50%"}
            placement="left"
            closable={true}
            open={showDrawer}
            onClose={setShowDrawer}
            extra={
                <Button type={'primary'}
                        onClick={() => setTestCompleted(!testCompleted)}>{testCompleted ? 'Пройти заново' : 'Сдать тест'}</Button>
            }
        >
            {testCompleted ? <Results/> : <>
                <Pagination total={lesson?.tasksId.length} defaultPageSize={1}
                            current={currentTask} onChange={setCurrentTask}/>
                <TestQuestion task={getById(lesson?.tasksId[currentTask - 1] ?? '')}/>
            </>}
        </Drawer>
    )
}