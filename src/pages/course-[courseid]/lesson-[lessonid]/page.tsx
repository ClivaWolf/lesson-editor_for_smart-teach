import {Layout} from "antd";
import {Bank} from "../../../widgets/TaskBank/Bank.tsx";
import {LessonManager} from "../../../widgets/LessonManager/LessonManager.tsx";

const {Sider, Content} = Layout;

export function LessonPage() {
    return (
        <Layout hasSider>
            <Content>
                <Bank/>
            </Content>
            <Sider width={450}>
                <LessonManager/>
            </Sider>
        </Layout>
    )
}