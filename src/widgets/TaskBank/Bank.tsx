import {Button, List, Typography} from "antd";
import {useBank} from "../../shared/contexts/BankContext.tsx";
import {Filter} from "./components/Filter/Filter.tsx";
import {Task} from "../../shared/types/LessonType.ts";
import {TaskEditor} from "../TaskEditor/TaskEditor.tsx";
import {useDrawer} from "../../shared/contexts/TE-DrawerContext.tsx";
import {BankQuestion} from "./components/Question/BankQuestion.tsx";

const {Title} = Typography;

export function Bank() {
    const {Bank, loading} = useBank();
    const {showDrawer} = useDrawer();

    if (loading) {
        return <div>Загрузка...</div>
    }

    return (
        <>
            <Title level={2}>Банк тестов</Title>
            <List
                bordered
                header={<Filter/>}
                dataSource={Bank}
                renderItem={(item: Task) =>
                    <List.Item>
                        <BankQuestion task={item}/>
                    </List.Item>
                }
            />
            <Button type="primary" onClick={() => showDrawer()}>Добавить задание</Button>
            <TaskEditor/>
        </>
    )
}