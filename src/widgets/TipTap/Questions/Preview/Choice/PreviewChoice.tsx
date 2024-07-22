import {Question} from "../../../../../shared/types/LessonType.ts";
import {Flex, Typography, Radio, Checkbox} from "antd";
import styles from "./PreviewChoise.module.css";

export function PreviewChoice({question}: { question: Question }) {
    return (
        <Flex gap={8} vertical>
            <Typography.Text strong>{question.welcome_text}</Typography.Text>
            {question.type === 'mono' ? (
                <Radio.Group className={styles.groupDisabled} defaultValue={question.correctAnswers[0]} disabled>
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
        </Flex>
    )
}