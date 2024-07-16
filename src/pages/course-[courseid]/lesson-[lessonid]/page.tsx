import {Layout} from "antd";
import {LessonProvider} from "../../../shared/contexts/LessonContext.tsx";

const {Sider, Content} = Layout;

export function LessonPage() {
    return (
        <LessonProvider>
            <Layout hasSider>
                <Sider width={300}>Sider</Sider>
                <Content>Content</Content>
            </Layout>
        </LessonProvider>
    )
}