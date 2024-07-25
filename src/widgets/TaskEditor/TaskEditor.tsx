import {Button, Drawer, Space} from "antd";
import {useDrawer} from "../../shared/contexts/TE-DrawerContext";
import Tiptap from "./Editor/Editor.tsx";

export function TaskEditor() {

    const {visible, closeDrawer} = useDrawer();

    const save = () => {
        console.log('save')
        // console.log(Tiptap.)
        closeDrawer();
    };

    return (
        <>
            <Drawer
                title={`Редактор задания`}
                placement="left"
                size={'large'}
                onClose={closeDrawer}
                open={visible}
                closable={false}
                extra={
                    <Space>
                        <Button onClick={closeDrawer}>Отмена</Button>
                        <Button type="primary" onClick={save}>
                            Сохранить
                        </Button>
                    </Space>
                }
            >
                <Tiptap/>
            </Drawer>
        </>
    );
}