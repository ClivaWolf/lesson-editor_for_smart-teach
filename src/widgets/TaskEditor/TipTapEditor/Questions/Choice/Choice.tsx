import {Answer, Question} from "../../../../../shared/types/LessonType.ts";
import {ItemRender, randomIndex} from "./_ItemRender";
import {Button, Flex, Radio, Typography, Space, Input, Divider} from "antd";
import {SortableList, SortableListProvider, useSortableList} from "@ant-design/pro-editor";
import {useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {QuestionForm} from "../QuestionForm.tsx";
import {useQuestion} from "../../../../../shared/contexts/QuestionContext.tsx";

export function ChoiceQuestion({isActive, updateAttributes}: { isActive: boolean }) {
    const {question} = useQuestion();
    console.log(question);
    const [list, setList] = useState<Question['answers']>(question.answers);
    const [correctAnswer, setCorrectAnswer] = useState(question.correctAnswers[0]);

    return (
        <SortableListProvider>
            <Flex justify={'space-between'} gap={16}>
                <Flex gap={12} vertical>
                    <Radio.Group value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)}>
                        <SortableList<Question>
                            list={list}
                            initialValues={question.answers}
                            onChange={(data) => setList(data as Question['answers'])}
                            renderContent={(item, index) => <ItemRender item={item as Answer} index={index}/>}
                            renderEmpty={() => <Typography.Text type={'secondary'} style={{paddingLeft: '2rem'}}>Добавьте
                                варианты ответа!</Typography.Text>}
                        />
                    </Radio.Group>
                    <Extra/>
                </Flex>
                {isActive && <>
                    <Divider type={'vertical'} style={{height: '100%'}}/>
                    <QuestionForm updateAttributes={updateAttributes}/>
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
