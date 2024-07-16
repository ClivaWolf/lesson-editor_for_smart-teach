import {Layout} from "antd";
import {CSSProperties} from "react";
import {LessonPage} from "./pages/course-[courseid]/lesson-[lessonid]/page";

const {Header, Footer} = Layout;

const headerStyle: CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
};

const footerStyle: CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#4096ff',
    height: '50px',
};

const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: '100vw',
    height: 'calc(100vh + 50px)',
};

function App() {

    return (
        <Layout style={layoutStyle}>
            <Header style={headerStyle}>Header</Header>
            <LessonPage/>
            <Footer style={footerStyle}>Footer</Footer>
        </Layout>
    )
}

export default App
