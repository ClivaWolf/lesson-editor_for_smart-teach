import {useState} from "react";
import {Button, Input, Typography, Flex} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {useQuestion} from "../../../../../shared/contexts/QuestionContext.tsx";

export function Welcome({welcomeText, setWelcomeText}: { welcomeText: string, setWelcomeText: (text: string) => void }) {
    const {question} = useQuestion();
    const [edited, setEdited] = useState(false);

    return (
        <>
            {edited ? (
                <Input
                    value={welcomeText}
                    onChange={(e) => {
                        setWelcomeText(e.target.value);
                        setEdited(true);
                    }}
                    onBlur={() => {
                        question.welcome_text = welcomeText;
                        setEdited(false);
                    }}
                    onPressEnter={() => {
                        question.welcome_text = welcomeText;
                        setEdited(false);
                    }}
                />
            ) : (
                <Flex gap={4} align={'baseline'}>
                    <Typography.Text strong>{welcomeText}</Typography.Text>
                    <Button onClick={() => setEdited(true)} icon={<EditOutlined/>} type={'text'}/>
                </Flex>
            )}
        </>
    );
}