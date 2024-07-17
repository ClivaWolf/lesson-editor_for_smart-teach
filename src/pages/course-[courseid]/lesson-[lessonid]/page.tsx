import {Col, Layout, Row} from "antd";
import {LessonProvider} from "../../../shared/contexts/LessonContext.tsx";
import {Bank} from "../../../widgets/TaskBank/Bank.tsx";

const {Sider, Content} = Layout;

export function LessonPage() {
    return (
        <Layout hasSider>
            <Sider width={300}>Sider</Sider>
            <Content>
                <Row>
                    <Col span={12}>col-12</Col>
                    <Col span={12}>
                        <Bank/>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}