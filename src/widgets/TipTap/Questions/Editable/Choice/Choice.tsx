import {Answer, Question} from "../../../../../shared/types/LessonType.ts";
import {ItemRender, randomIndex} from "./_ItemRender.tsx";
import {Button, Flex, Radio, Space, Input, Divider, Row, Col, Badge, Tooltip} from "antd";
import {Checkbox, SortableList, SortableListProvider, useSortableList} from "@ant-design/pro-editor";
import {useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {ChoiceForm} from "./ChoiceForm.tsx";
import {Welcome} from "./Welcome.tsx";
import {FaRandom} from "react-icons/fa";
import {PreviewKnowledge} from '../../../../KnowledgeSelector/Preview/PreviewKnowledge'
import styles from "../../Preview/Choice/PreviewChoise.module.css";

interface ChoiceQuestionProps {
    question: Question
    updateAttributes: (attrs: Partial<Question>) => void
    setIsEditing: (isEditing: boolean) => void
}

export function ChoiceQuestion({question, updateAttributes, setIsEditing}: ChoiceQuestionProps) {

    const shuffleArray = (array: Answer[]) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const [shuffledAnswers, setShuffledAnswers] = useState<Answer[]>(shuffleArray([...question.answers]));
    const [knowledge, setKnowledge] = useState(question.knowledge);
    const [correctAnswers, setCorrectAnswers] = useState(question.correctAnswers);
    const [randomSequence, setRandomSequence] = useState(question.random);
    const [cost, setCost] = useState(question.cost);
    const [welcomeText, setWelcomeText] = useState(question.welcome_text ||
        (question.type === "mono" ? "Выберите один вариант" : "Выберите несколько вариантов")
    );

    const shuffleAnswers = () => {
        setShuffledAnswers(shuffleArray([...question.answers]));
    };

    const List = () => {
        return (
            <SortableListProvider>
                <SortableList<Question>
                    list={shuffledAnswers}
                    initialValues={question.answers}
                    onChange={(data) => setShuffledAnswers(data as Question['answers'])}
                    renderContent={(item, index) =>
                        <ItemRender type={question.type as ("mono" | "multi")} item={item as Answer} index={index}/>
                    }
                />
                <Extra/>
            </SortableListProvider>
        )
    }

    return (
        <Row style={{width: '100%', userSelect: 'none'}}>
            <Col span={11}>
                <Flex gap={12} vertical>
                    <Row gutter={[8, 8]} align={'middle'}>
                        <Col span={3}>
                            <Badge count={cost} color={'green'}/>
                        </Col>
                        <Col span={21}>
                            <Welcome question={question} welcomeText={welcomeText} setWelcomeText={setWelcomeText}/>
                        </Col>
                    </Row>
                    <Row gutter={[8, 8]} align={'middle'}>
                        <Col span={2}>
                            <Tooltip title={'Случайный порядок вариантов'}>
                                {randomSequence &&
                                    <FaRandom className={styles.randomIcon} onClick={() => shuffleAnswers()}/>}
                            </Tooltip>
                        </Col>
                        <Col span={22}>
                            {question.type === "mono" ? (
                                <Radio.Group value={correctAnswers[0]}
                                             onChange={(e) => setCorrectAnswers(e.target.value)}>
                                    <List/>
                                </Radio.Group>
                            ) : (
                                <Checkbox.Group value={correctAnswers}
                                                onChange={(e) => setCorrectAnswers(e.map(value => String(value)))}>
                                    <List/>
                                </Checkbox.Group>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <PreviewKnowledge knowledge={knowledge}/>
                        </Col>
                    </Row>
                </Flex>
            </Col>
            <Col span={1}>
                <Divider type={'vertical'} style={{height: '100%'}}/>
            </Col>
            <Col span={12}>
                <ChoiceForm
                    question={question}
                    updateAttributes={updateAttributes}
                    setWelcomeText={setWelcomeText}
                    setRandomSequence={setRandomSequence}
                    cost={cost}
                    setCost={setCost}
                    setIsEditing={setIsEditing}
                    knowledge={knowledge}
                    setKnowledge={setKnowledge}
                />
            </Col>
        </Row>
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
