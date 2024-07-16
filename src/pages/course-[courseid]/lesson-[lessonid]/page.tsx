import {Layout} from "antd";

const {Sider, Content} = Layout;

export function LessonPage() {
    return (
        <Layout hasSider>
            <Sider width={300}>Sider</Sider>
            <Content>Content</Content>
        </Layout>
    )
}