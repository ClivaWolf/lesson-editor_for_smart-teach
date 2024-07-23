import {ListProps, Typography} from "antd";
import {ActionGroup, Checkbox, Segmented} from "@ant-design/pro-editor";
import {Key, ProList, ProListMetas} from '@ant-design/pro-components'
import {useBank} from "../../shared/contexts/BankContext.tsx";
import {Filter} from "./components/Filter/Filter.tsx";
import {Task} from "../../shared/types/LessonType.ts";
import {TaskEditor} from "../TaskEditor/TaskEditor.tsx";
import {useDrawer} from "../../shared/contexts/TE-DrawerContext.tsx";
import {BankQuestion} from "./components/Question/BankQuestion.tsx";
import {useCallback, useEffect, useState} from "react";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

const {Title} = Typography;

export function Bank() {
    const {Bank, setBank, loading} = useBank();
    const {showDrawer} = useDrawer();
    const [dataSource, setDataSource] = useState<ListProps<Task>['dataSource']>([]);
    const [totalPagination, setTotalPagination] = useState<number>(0);
    const [expandedRowKeys, setExpandedRowKeys] = useState<readonly Key[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    const rowSelection = {
        selectedRowKeys,
        onChange: (keys: Key[]) => setSelectedRowKeys(keys),
    };

    const handleDelete = useCallback((id: string) => {
        //TODO: подтверждение удаления
        setBank(Bank.filter((item) => item.id !== id));
    }, [Bank, setBank]);

    const pagination: PaginationConfig = {
        defaultCurrent: 1,
        total: totalPagination,
        showSizeChanger: false,
    };

    useEffect(() => {
        if (!loading) {
            setDataSource(Bank.map((task) => ({
                title: {
                    dataIndex: 'title',
                    title: <Title level={5} onClick={() => showDrawer()}>Задача</Title>,
                },
                description: 'Описание',
                content: <BankQuestion task={task}/>,
                actions: [
                    <Checkbox checked={task.public}>Публичный</Checkbox>,
                    <ActionGroup items={[
                        {
                            type: 'divider',
                        },
                        {
                            icon: <EditOutlined/>,
                            onClick: () => showDrawer(task.content),
                            title: 'Редактировать',
                        },
                        {
                            icon: <DeleteOutlined/>,
                            color: '#f5222d',
                            onClick: () => handleDelete(task.id),
                            title: 'Удалить',
                        }
                    ]}/>,
                ]
            })) as ListProps<Task>['dataSource']);
            setTotalPagination(Bank.length);
        }
    }, [loading, Bank, showDrawer, handleDelete]);

    return (
        <>
            <ProList<Task>
                style={{padding: 16, height: '100%', overflow: 'auto'}}
                headerTitle={<Title level={3} onClick={() => console.log(selectedRowKeys)}>Банк тестов</Title>}
                toolBarRender={() => <Segmented<string>
                    size={'large'}
                    defaultValue={'local'}
                    options={[{label: 'Локальные', value: 'local'},
                        {label: 'Публичные', value: 'public', disabled: true}]}
                    onChange={(value) => {
                        console.log(value);
                    }}
                />}
                ghost={false}
                grid={{gutter: 16, column: 2, xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 3}}
                pagination={pagination}
                dataSource={dataSource}
                bordered
                header={<Filter/>}
                loading={loading}
                itemCardProps={{bodyStyle: {padding: 12}}}
                rowKey="title"
                rowSelection={rowSelection}
                expandable={{expandedRowKeys, defaultExpandAllRows: false, onExpandedRowsChange: setExpandedRowKeys}}
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