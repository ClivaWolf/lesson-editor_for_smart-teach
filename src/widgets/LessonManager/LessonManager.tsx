import {useLesson} from "../../shared/contexts/LessonContext.tsx";
import {ListSkeleton} from "@ant-design/pro-skeleton";
import {Typography, Skeleton, Flex, List} from "antd";
import {useEffect, useState} from "react";
import {Lesson} from "../../shared/types/LessonType.ts";
import {useBank} from "../../shared/contexts/BankContext.tsx";
import {BankQuestion} from "../TaskBank/components/Question/BankQuestion.tsx";
import {Filter} from "../TaskBank/components/Filter/Filter.tsx";


export function LessonManager() {
    const {lesson, loading} = useLesson();
    const {getById} = useBank()
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

    useEffect(() => {
        if (!loading && lesson)
            setCurrentLesson(lesson);
    }, [lesson, loading]);

    if (loading)
        return (
            <div style={{margin: 32}}>
                <Skeleton active/>
                <ListSkeleton active size={8}/>
            </div>
        )

    return (
        <Flex gap={16} vertical style={{margin: 16}}>
            <Typography.Title level={2} strong>{currentLesson?.title}</Typography.Title>
            <List
                bordered
                header={<Filter/>}
                dataSource={currentLesson?.tasksId || []}
                renderItem={(id) =>
                    <List.Item>
                        <BankQuestion task={getById(id)}/>
                    </List.Item>
                }
            />
        </Flex>
    )
}