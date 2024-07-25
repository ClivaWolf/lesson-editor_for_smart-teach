import {Cascader, Tag, Tooltip} from "antd";
import {GetKnowledge} from "../../../features/GetCourseKnowledge.ts";
import {useEffect, useState} from "react";

interface EditKnowledgeProps {
    defaultValue: string[]
    knowledge: string[]
    setKnowledge: (knowledge: string[]) => void
}

export function EditKnowledge({defaultValue, knowledge, setKnowledge}: EditKnowledgeProps) {
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
            multiple
            defaultValue={defaultValue}
            value={knowledge}
            onChange={setKnowledge}
            options={options}
            placeholder={'Выберите знания'}
            style={{width: '100%'}}
            // tagRender={({label}) => (
            //     <Tooltip title={label}>
            //         <Tag
            //             //TODO: Вынести стили в отдельный файл
            //             style={{marginRight: 3, width: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}
            //             color={getRandomColor()}
            //             closable={false}
            //         >
            //             {label}
            //         </Tag>
            //     </Tooltip>
            // )}
        />
    )
}