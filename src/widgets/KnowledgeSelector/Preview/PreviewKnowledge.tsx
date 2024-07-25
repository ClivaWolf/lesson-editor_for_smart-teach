import {Select, Tag, Tooltip, Cascader} from "antd";
import {useEffect, useState} from "react";
import {GetKnowledge} from "../../../features/GetCourseKnowledge.ts";

export function PreviewKnowledge({knowledge}: { knowledge: string[] }) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        GetKnowledge({courseId: '1'}).then((data) => {
            setOptions(data);
        }).catch(() => {});
    }, []);

    const tag_colors = [
        "magenta", "red", "volcano", "orange", "gold",
        "lime", "green", "cyan", "blue", "geekblue", "purple"
    ]

    function getRandomColor(): string {
        const randomIndex = Math.floor(Math.random() * tag_colors.length);
        return tag_colors[randomIndex];
    }

    return (
        <Cascader
            // mode="multiple"
            multiple
            options={options}
            defaultValue={knowledge}
            value={knowledge}
            suffixIcon={<></>}
            variant={'borderless'}
            placeholder={'Для этого вопроса не требуются знания'}
            open={false}
            allowClear={false}
            style={{width: '100%'}}
            tagRender={({label}) => (
                <Tooltip title={label}>
                    <Tag
                        //TODO: Вынести стили в отдельный файл
                        style={{marginRight: 3, width: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}
                        color={getRandomColor()}
                        closable={false}
                    >
                        {label}
                    </Tag>
                </Tooltip>
            )}
        />
    )
}