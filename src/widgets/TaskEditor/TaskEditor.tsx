import {Button, Drawer, Space} from "antd";
import {useDrawer} from "../../shared/contexts/TE-DrawerContext";
import Tiptap from "./TipTapEditor/TipTapEditor.tsx";

export function TaskEditor() {

    const {visible, closeDrawer} = useDrawer();

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
                        <Button type="primary" onClick={closeDrawer}>
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