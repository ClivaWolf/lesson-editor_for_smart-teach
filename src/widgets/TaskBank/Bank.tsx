import {List, Typography} from "antd";
import {useBank} from "../../shared/contexts/BankContext.tsx";
import {Filter} from "./components/Filter/Filter.tsx";
import {Task} from "../../shared/types/LessonType.ts";

const {Title} = Typography;

export function Bank() {
    const {Bank, loading} = useBank();

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
                        <ul>
                            {item.questions.map((question) => <li>{question.body}</li>)}
                        </ul>
                    </List.Item>
                }
            />
        </>
    )
}