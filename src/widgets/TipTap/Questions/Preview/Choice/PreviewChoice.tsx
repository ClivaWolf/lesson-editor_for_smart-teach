import {Question} from "../../../../../shared/types/LessonType.ts";
import {Flex, Typography, Radio, Checkbox, Badge, Col, Row, Cascader, Tag} from "antd";
import {FaRandom} from "react-icons/fa";
import styles from "./PreviewChoise.module.css";
import {EditOutlined} from "@ant-design/icons";
import {PreviewKnowledge} from "../../../../KnowledgeSelector/Preview/PreviewKnowledge.tsx";

export function PreviewChoice({question}: { question: Question }) {
    return (
        <Flex gap={8} vertical>
            <Row gutter={[8, 8]} align={'middle'}>
                <Col>
                    <Badge count={question.cost} color={'green'}/>
                </Col>
                <Col>
                    <Typography.Text strong>{question.welcome_text}</Typography.Text>
                </Col>
            </Row>
            <Row gutter={[8, 8]}>
                <Col>{question.random && <FaRandom className={styles.randomIcon}/>}</Col>
                <Col>
                    {question.type === 'mono' ? (
                        <Radio.Group className={styles.groupDisabled} defaultValue={question.correctAnswers[0]}
                                     disabled>
                            <Flex gap={8} vertical>
                                {question.answers.map((answer, index) => (
                                    <Radio className={styles.wrapperDisabled} key={index} value={answer.dataIndex}>
                                        {answer.title}
                                    </Radio>
                                ))}
                            </Flex>
                        </Radio.Group>
                    ) : (
                        <Checkbox.Group className={styles.groupDisabled + " " + styles.checkboxGroup}
                                        defaultValue={question.correctAnswers} disabled>
                            {question.answers.map((answer, index) => (
                                <Checkbox className={styles.wrapperDisabled} key={index} value={answer.dataIndex}>
                                    {answer.title}
                                </Checkbox>
                            ))}
                        </Checkbox.Group>
                    )}
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <PreviewKnowledge knowledge={question.knowledge}/>
                </Col>
            </Row>
        </Flex>
    )
}