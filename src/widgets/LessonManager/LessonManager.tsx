import {useLesson} from "../../shared/contexts/LessonContext.tsx";
import {Typography, Skeleton, Flex, Badge, Table, Button} from "antd";
import {useEffect, useState} from "react";
import {Lesson, Task} from "../../shared/types/LessonType.ts";
import {useBank} from "../../shared/contexts/BankContext.tsx";
import {BankQuestion} from "../TaskBank/components/Question/BankQuestion.tsx";
import {PreviewKnowledge} from "../KnowledgeSelector/Preview/PreviewKnowledge.tsx";
import {DownOutlined} from "@ant-design/icons";
import {PassTest} from "./PassTest";


export function LessonManager() {
    const {lesson, loading} = useLesson();
    const {getById} = useBank()
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
    const [dataSource, setDataSource] = useState<Task[]>([]);
    const [showDrawer, setShowDrawer] = useState(false);

    useEffect(() => {
        if (!loading && lesson) {
            console.log(lesson);
            setCurrentLesson(lesson);
            setDataSource(lesson.tasksId.map((taskId) => getById(taskId)!));
        }
    }, [getById, lesson, loading]);

    const columns = [
        {
            title: 'Баллы',
            dataIndex: 'scores',
            key: 'scores',
            width: '5%',
            render: (scores: number) => <Badge count={scores} color={'green'} showZero/>,
        },
        {
            title: 'Знания',
            dataIndex: 'knowledge',
            key: 'knowledge',
            width: '90%',
            render: (knowledge: string[]) => <PreviewKnowledge knowledge={knowledge}/>,
        },
        Table.EXPAND_COLUMN,
    ]

    return (
        <Flex gap={16} vertical style={{height: '100%'}}>
            {loading ? (
                <Skeleton active/>
            ) : (
                <Flex vertical style={{margin: 16}}>
                    <Typography.Title level={3} style={{color: 'white'}}>{currentLesson?.title}</Typography.Title>
                    <Typography.Text level={4} strong
                                     style={{color: 'white'}}>{currentLesson?.description}</Typography.Text>
                </Flex>
            )}
            <Table
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                pagination={false}
                expandable={{
                    expandedRowRender: (task: Task) => <BankQuestion task={task}/>,
                    expandIcon: ({expanded, onExpand, record}) =>
                        <DownOutlined style={{rotate: expanded ? '180deg' : '0deg', transition: '0.3s all'}}
                                      onClick={(e) => onExpand(record, e)}/>
                }}
                style={{height: '100%', margin: 8, overflow: 'auto'}}
            />
            <Button type={'primary'} size={'large'} style={{margin: 8}} onClick={() => setShowDrawer(true)}>Пройти тест</Button>
            <PassTest lesson={currentLesson!} showDrawer={showDrawer} setShowDrawer={setShowDrawer}/>
        </Flex>
    )
}