import {Col, Layout, Row} from "antd";
import {LessonProvider} from "../../../shared/contexts/LessonContext.tsx";
import {Bank} from "../../../widgets/TaskBank/Bank.tsx";
import {LessonManager} from "../../../widgets/LessonManager/LessonManager.tsx";

const {Sider, Content} = Layout;

export function LessonPage() {
    return (
        <Layout hasSider>
            <Content>
                <Bank/>
            </Content>
            <Sider width={300}>
                <LessonManager/>
            </Sider>
        </Layout>
    )
}