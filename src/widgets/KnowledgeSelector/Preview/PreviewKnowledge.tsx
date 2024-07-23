import {Select, Tag} from "antd";

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
            suffixIcon={<></>}
            variant={'borderless'}
            maxTagTextLength={15}
            placeholder={'Для этого вопроса не требуются знания'}
            open={false}
            allowClear={false}
            style={{width: '100%'}}
            tagRender={({label}) => (
                <Tag
                    style={{marginRight: 3}}
                    color={getRandomColor()}
                    closable={false}
                >
                    {label}
                </Tag>
            )}
        />
    )
}