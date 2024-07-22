import {memo, useState} from "react";
import {useSortableList, Input, Checkbox} from "@ant-design/pro-editor";
import {Radio} from "antd";
import {Answer} from "../../../../../shared/types/LessonType.ts";

export const randomIndex = () => Math.random() * 10000;

export const ItemRender = memo(({type, item, index}: {type: 'mono' | 'multi'; item: Answer; index: number }) => {
    const instance = useSortableList();
    const [title, setTitle] = useState(item?.title);
    const [changed, setChanged] = useState(false);

    const updateTitle = () => {
        instance.updateItem({title}, index);
        setChanged(false);
    };

    const handleNextFocus = () => {
        const value = instance.getValue() || [];
        if (index + 1 === value.length) {
            const id = randomIndex();
            instance.addItem({dataIndex: `new-${id}`, title: ``});
        }
        setTimeout(() => {
            const nextNodeEl = document.getElementById(`index-${index + 1}`);
            nextNodeEl?.focus();
        }, 0);
    };

    const Body = () => (
        <Input
            id={`index-${index}`}
            value={title}
            placeholder="Вариант ответа..."
            onBlur={() => {
                if (changed) updateTitle();
            }}
            onChange={(value) => {
                setTitle(value);
                setChanged(true);
            }}
            onPressEnter={() => {
                if (changed) updateTitle();
                handleNextFocus();
            }}
        />
    );

    return (
        (type === 'mono' ? (
            <Radio value={item?.dataIndex}>{Body()}</Radio>
        ) : (
            <Checkbox value={item?.dataIndex}>{Body()}</Checkbox>
        ))
    );
});