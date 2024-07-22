import {Button, Form, Switch} from "antd";
import {Cascader, InputNumber} from "@ant-design/pro-editor";
import {useQuestion} from "../../../../shared/contexts/QuestionContext.tsx";
import {Question} from "../../../../shared/types/LessonType.ts";

export function QuestionForm({updateAttributes}) {

    const {question} = useQuestion();

    const onFinish = (question: Question) => {
        updateAttributes(question);
    }

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 12,
            },
        },
    };

    return (
        <Form
            onFinish={onFinish}
            initialValues={question}
            size={'small'}
        >
            <Form.Item
                name="points"
                label="Баллов за решение"
                rules={[{required: true, message: 'Укажите количество баллов!'}]}
            >
                <InputNumber defaultValue={question.cost} onChange={e => question.cost = Number(e)}
                             min={0} max={15} addonAfter={'Б'}/>
            </Form.Item>

            {question.type !== 'mono' && <Form.Item
                name="incomplete_score"
                label="Разрешить неполный балл"
            >
                <Switch checked={question.incomplete_score} onChange={(checked) => {
                    question.random = checked
                }}/>
            </Form.Item>}

            <Form.Item
                name="random"
                label={'Случайный порядок'}
            >
                <Switch checked={question.random} onChange={(checked) => {
                    question.random = checked
                }}/>
            </Form.Item>

            <Form.Item
                name="knowledge"
                label="Знания"
                rules={[{required: true, message: 'Укажите виды знаний!'}]}
            >
                <Cascader defaultValue={question.knowledge} options={[]}/>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Сохранить</Button>
            </Form.Item>

        </Form>
    )
}