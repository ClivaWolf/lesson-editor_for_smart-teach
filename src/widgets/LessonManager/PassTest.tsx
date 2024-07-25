import {Drawer, Pagination} from "antd";
import {Lesson} from "../../shared/types/LessonType.ts";

export function PassTest({lesson, showDrawer}: { lesson: Lesson, showDrawer: boolean }) {



    return (
        <Drawer
            title={lesson?.title}
            width={"50%"}
            placement="left"
            closable={false}
            open={showDrawer}
            onClose={() => null}
        >
            <Pagination total={lesson?.tasksId.length} defaultPageSize={1}/>

        </Drawer>
    )
}