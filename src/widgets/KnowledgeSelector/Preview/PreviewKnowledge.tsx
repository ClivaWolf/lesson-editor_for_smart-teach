import {Select, Tag, Tooltip} from "antd";

export function PreviewKnowledge({knowledge}: { knowledge: string[] }) {

    const tag_colors = [
        "magenta", "red", "volcano", "orange", "gold",
        "lime", "green", "cyan", "blue", "geekblue", "purple"
    ]

    function getRandomColor(): string {
        const randomIndex = Math.floor(Math.random() * tag_colors.length);
        return tag_colors[randomIndex];
    }

    return (
        <Select
            mode="multiple"
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