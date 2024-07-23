import {Button, List, Typography, Space, Divider, Flex} from "antd";
import {Checkbox} from "@ant-design/pro-editor";
import {useBank} from "../../shared/contexts/BankContext.tsx";
import {Filter} from "./components/Filter/Filter.tsx";
import {Task} from "../../shared/types/LessonType.ts";
import {TaskEditor} from "../TaskEditor/TaskEditor.tsx";
import {useDrawer} from "../../shared/contexts/TE-DrawerContext.tsx";
import {BankQuestion} from "./components/Question/BankQuestion.tsx";

const {Title} = Typography;

export function Bank() {
    const {Bank, setBank, loading} = useBank();
    const {showDrawer} = useDrawer();

    if (loading) {
        return <div>Загрузка...</div>
    }

    const handleDelete = (id: string) => {
        setBank(Bank.filter((item) => item.id !== id));
    };

    return (
        <Space direction={'vertical'} style={{width: '90%', margin: 16}}>
            <Title level={2}>Банк тестов</Title>
            <List
                bordered
                header={<Filter/>}
                dataSource={Bank}
                renderItem={(item: Task) =>
                    <List.Item>
                        <BankQuestion task={item}/>
                        <Divider type={'vertical'} style={{height: 'max-content'}}/>
                        <Flex align={'flex-start'} gap={8} vertical>
                            <Checkbox value={item.public}>Публичный</Checkbox>
                            <Button type={'primary'} onClick={() => showDrawer(item.content)}>Редактировать</Button>
                            <Button type={'primary'} danger onClick={() => handleDelete(item.id)}>Удалить</Button>
                        </Flex>
                    </List.Item>
                }
            />
            <Button type="primary" onClick={() => showDrawer()}>Добавить задание</Button>
            <TaskEditor/>
        </Space>
    )
}