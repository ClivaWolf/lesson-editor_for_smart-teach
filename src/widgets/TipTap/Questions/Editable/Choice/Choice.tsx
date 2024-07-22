import {Answer, Question} from "../../../../../shared/types/LessonType.ts";
import {ItemRender, randomIndex} from "./_ItemRender.tsx";
import {Button, Flex, Radio, Typography, Space, Input, Divider} from "antd";
import {Checkbox, SortableList, SortableListProvider, useSortableList} from "@ant-design/pro-editor";
import {useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {ChoiceForm} from "./ChoiceForm.tsx";
import {useQuestion} from "../../../../../shared/contexts/QuestionContext.tsx";
import {Welcome} from "./Welcome.tsx";

export function ChoiceQuestion({isActive, updateAttributes}: { isActive: boolean }) {
    const {question} = useQuestion();
    const [list, setList] = useState<Question['answers']>(question.answers);
    const [correctAnswers, setCorrectAnswers] = useState(question.correctAnswers);
    const [questionType, setQuestionType] = useState(question.type);
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
            </SortableListProvider>
        )
    }

    return (
        <SortableListProvider>
            <Flex justify={'space-between'} gap={16}>
                <Flex gap={12} vertical>
                    <Welcome welcomeText={welcomeText} setWelcomeText={setWelcomeText}/>
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
                    <Extra/>
                </Flex>
                {isActive && <>
                    <Divider type={'vertical'} style={{height: '100%'}}/>
                    <Flex gap={8} vertical>
                        <Radio.Group
                            size={"small"} buttonStyle={'solid'}
                            value={questionType} onChange={(e) => {
                                setQuestionType(e.target.value)
                                question.type = e.target.value
                                const newWelcomeText = e.target.value === "mono" ? "Выберите один вариант:" : "Выберите несколько вариантов:";
                                question.welcome_text = newWelcomeText;
                                setWelcomeText(newWelcomeText);
                            }}
                        >
                            <Radio.Button value={'mono'}>Один вариант</Radio.Button>
                            <Radio.Button value={'multi'}>Несколько вариантов</Radio.Button>
                        </Radio.Group>
                        <ChoiceForm updateAttributes={updateAttributes}/>
                    </Flex>
                </>}
            </Flex>
        </SortableListProvider>
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
