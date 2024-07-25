import {Question} from "../../../../../shared/types/LessonType.ts";
import {Badge, Checkbox, Col, Flex, Radio, Row, Typography} from "antd";
import {PreviewKnowledge} from "../../../../KnowledgeSelector/Preview/PreviewKnowledge.tsx";
import {useState} from "react";

export function TestChoice({question, updateAttributes}: { question: Question, updateAttributes: (attrs: Question) => void }) {
    const [userAnswers, setUserAnswers] = useState<string[]>([]);

    return (
        <Flex gap={8} vertical style={{userSelect: 'none'}}>
            <Row gutter={[8, 8]} align={'middle'}>
                <Col>
                    <Badge count={question.cost} color={'green'}/>
                </Col>
                <Col>
                    <Typography.Text strong>{question.welcome_text}</Typography.Text>
                </Col>
            </Row>
            <Row gutter={[8, 8]}>
                <Col offset={2}>
                    {question.type === 'mono' ? (
                        <Radio.Group onChange={(e) => {
                                         setUserAnswers([e.target.value]);
                                         question.userAnswers = [e.target.value];
                                         updateAttributes({...question, userAnswers: [e.target.value]});
                                     }} value={userAnswers[0]}>
                            <Flex gap={8} vertical>
                                {question.answers.map((answer, index) => (
                                    <Radio key={index} value={answer.dataIndex}>
                                        {answer.title}
                                    </Radio>
                                ))}
                            </Flex>
                        </Radio.Group>
                    ) : (
                        <Checkbox.Group value={userAnswers}
                                        onChange={(e) => {
                                            setUserAnswers(e);
                                            question.userAnswers = e;
                                            updateAttributes({...question, userAnswers: e});
                                        }}>
                            {question.answers.map((answer, index) => (
                                <Checkbox key={index} value={answer.dataIndex}>
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