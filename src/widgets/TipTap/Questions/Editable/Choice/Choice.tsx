import {Answer, Question} from "../../../../../shared/types/LessonType.ts";
import {ItemRender, randomIndex} from "./_ItemRender.tsx";
import {Button, Flex, Radio, Typography, Space, Input, Divider} from "antd";
import {Checkbox, SortableList, SortableListProvider, useSortableList} from "@ant-design/pro-editor";
import {useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {ChoiceForm} from "./ChoiceForm.tsx";
import {Welcome} from "./Welcome.tsx";

interface ChoiceQuestionProps {
    question: Question
    updateAttributes: (attrs: Partial<Question>) => void
}

export function ChoiceQuestion({question, updateAttributes}: ChoiceQuestionProps) {
    const [list, setList] = useState<Question['answers']>(question.answers);
    const [correctAnswers, setCorrectAnswers] = useState(question.correctAnswers);
    const [welcomeText, setWelcomeText] = useState(question.welcome_text ||
        (question.type === "mono" ? "Выберите один вариант" : "Выберите несколько вариантов")
    );

    const List = () => {
        return (
            <SortableListProvider>
                <SortableList<Question>
                    list={list}
                    initialValues={question.answers}
                    onChange={(data) => setList(data as Question['answers'])}
                    renderContent={(item, index) =>
                        <ItemRender type={question.type as ("mono" | "multi")} item={item as Answer} index={index}/>
                    }
                    renderEmpty={() =>
                        <Typography.Text type={'secondary'} style={{paddingLeft: '2rem'}}>
                            Добавьте варианты ответа!
                        </Typography.Text>
                    }
                />
                <Extra/>
            </SortableListProvider>
        )
    }

    return (
        <Flex justify={'space-between'} gap={16}>
            <Flex gap={12} vertical>
                {/*<Welcome question={question} welcomeText={welcomeText} setWelcomeText={setWelcomeText}/>*/}
                <Input.TextArea placeholder="Выбырите варианты ответа:" autoSize variant={'borderless'}
                                value={question.welcome_text} onChange={(e) => setWelcomeText(e.target.value)}/>
                {question.type === "mono" ? (
                    <Radio.Group value={correctAnswers[0]} onChange={(e) => setCorrectAnswers(e.target.value)}>
                        <List/>
                    </Radio.Group>
                ) : (
                    <Checkbox.Group value={correctAnswers}
                                    onChange={(e) => setCorrectAnswers(e.map(value => String(value)))}>
                        <List/>
                    </Checkbox.Group>
                )}
            </Flex>
            <Divider type={'vertical'} style={{height: '100%'}}/>
            <ChoiceForm question={question} updateAttributes={updateAttributes} setWelcomeText={setWelcomeText}/>
        </Flex>
    )
}

function Extra() {
    const instance = useSortableList();
    const [title, setTitle] = useState('');
    const [valid, setValid] = useState(true);

    const style = {
        marginLeft: '2rem',
        padding: '0.01rem 0.5rem',
    }

    const handleEnter = () => {
        setValid(title.length > 0);
        if (valid) {
            instance.addItem({dataIndex: `new-${randomIndex()}`, title});
            setTitle('');
        }
    }

    return (
        <Space.Compact size={'small'}>
            <Input
                placeholder="Вариант ответа..."
                value={title}
                onChange={(e) => {
                    setValid(e.target.value.length > 0);
                    setTitle(e.target.value);
                }}
                onPressEnter={() => handleEnter()}
                status={valid ? '' : 'error'}
                size={'small'}
                variant={'outlined'}
                style={style}
            />
            <Button type="primary" icon={<PlusOutlined/>} onClick={() => handleEnter()}/>
        </Space.Compact>
    )
}
