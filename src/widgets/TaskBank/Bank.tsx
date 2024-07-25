import {useCallback, useEffect, useState} from "react";
import type {Key} from "react";
import {ListProps, Popconfirm, Typography, Button} from "antd";
import {ActionGroup, Checkbox, Segmented} from "@ant-design/pro-editor";
import {ProList, ProListMetas} from '@ant-design/pro-components'
import {useBank} from "../../shared/contexts/BankContext.tsx";
import {Filter} from "./components/Filter/Filter.tsx";
import {Task} from "../../shared/types/LessonType.ts";
import {TaskEditor} from "../TaskEditor/TaskEditor.tsx";
import {useDrawer} from "../../shared/contexts/TE-DrawerContext.tsx";
import {BankQuestion} from "./components/Question/BankQuestion.tsx";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import {useLesson} from "../../shared/contexts/LessonContext.tsx";

const {Title} = Typography;

interface ActionButtonsProps {
    task: Task
    handleDelete: (id: string) => void
    showDrawer: (task: Task) => void
}

const ActionButtons = ({task, handleDelete, showDrawer}: ActionButtonsProps) => {
    const [open, setOpen] = useState(false);
    return (
        <Popconfirm
            title="Удалить задачу?"
            description="Вы уверены, что хотите удалить задачу?"
            onConfirm={() => handleDelete(task.id)}
            okText="Да"
            cancelText="Нет"
            open={open}
            onOpenChange={setOpen}
        >
            <ActionGroup items={[
                {
                    type: 'divider',
                },
                {
                    icon: <EditOutlined/>,
                    onClick: () => showDrawer(task),
                    title: 'Редактировать',
                },
                {
                    icon: <DeleteOutlined/>,
                    style: {color: '#f5222d'},
                    onClick: () => setOpen(true),
                    title: 'Удалить',
                }
            ]}/>
        </Popconfirm>
    )
};

export function Bank() {
    const {Bank, setBank, loading: bankLoading} = useBank();
    const {lesson, loading: lessonLoading} = useLesson();
    const {showDrawer} = useDrawer();
    const [dataSource, setDataSource] = useState<ListProps<Task>['dataSource']>([]);
    const [totalPagination, setTotalPagination] = useState<number>(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    const rowSelection = { selectedRowKeys, onChange: (keys: Key[]) => {
            setSelectedRowKeys(keys)
            console.log(keys);
        }};

    const handleDelete = useCallback((id: string) => {
        setBank(Bank.filter((item) => item.id !== id));
    }, [Bank, setBank]);

    const pagination: PaginationConfig = {
        defaultCurrent: 1,
        total: totalPagination,
        showSizeChanger: false,
    };

    useEffect(() => {
        if (!bankLoading) {
            setDataSource(Bank.map((task) => ({
                title: {
                    dataIndex: 'title',
                    title: <Title level={5} onClick={() => showDrawer()}>Задача</Title>,
                },
                description: {
                    dataIndex: 'description',
                    title: task.id
                },
                content: <BankQuestion task={task}/>,
                actions: [
                    <Checkbox checked={task.public}>Публичный</Checkbox>,
                    <ActionButtons task={task} handleDelete={handleDelete} showDrawer={showDrawer}/>,
                ]
            })) as ListProps<Task>['dataSource']);
            setTotalPagination(Bank.length);
        }
    }, [bankLoading, Bank, showDrawer, handleDelete]);

    return (
        <>
            <ProList<Task>
                style={{padding: 16, height: '100%', overflow: 'auto'}}
                headerTitle={<Title level={3} onClick={() => console.log(selectedRowKeys)}>Банк тестов</Title>}
                toolBarRender={() => [
                    <Button type={'primary'} icon={<PlusOutlined/>} onClick={() => showDrawer()}>Добавить
                        задачу</Button>,
                    <Segmented<string>
                        size={'large'}
                        defaultValue={'local'}
                        options={[{label: 'Локальные', value: 'local'},
                            {label: 'Публичные', value: 'public', disabled: true}]}
                        onChange={(value) => {
                            console.log(value);
                        }}
                    />
                ]}
                ghost={false}
                grid={{gutter: 16, column: 2, xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 3}}
                pagination={pagination}
                dataSource={dataSource}
                bordered
                header={<Filter/>}
                loading={bankLoading}
                itemCardProps={{bodyStyle: {padding: 12}}}
                rowSelection={rowSelection}
                // expandable={{expandedRowKeys, defaultExpandAllRows: false, onExpandedRowsChange: setExpandedRowKeys}}
                metas={{
                    title: {},
                    subTitle: {},
                    type: {},
                    avatar: {},
                    content: {},
                    actions: {'extra': true},
                } as ProListMetas<Task>}
            />
            <TaskEditor/>
        </>
    )
}