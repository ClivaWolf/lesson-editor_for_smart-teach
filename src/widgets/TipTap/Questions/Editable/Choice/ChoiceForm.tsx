import {Button, Form, Radio, Switch} from "antd";
import {Cascader, InputNumber} from "@ant-design/pro-editor";
import {Question} from "../../../../../shared/types/LessonType.ts";

interface ChoiceFormProps {
    question: Question
    updateAttributes: (question: Question) => void
    setWelcomeText: (welcomeText: string) => void
}

export function ChoiceForm({question, updateAttributes, setWelcomeText}: ChoiceFormProps) {

    const onFinish = (question: Question) => {
        updateAttributes(question);
    }

    return (
        <Form
            onFinish={onFinish}
            initialValues={question}
            size={'small'}
            labelCol={{span: 6}}
            wrapperCol={{span: 18}}
            style={{maxWidth: '50%', userSelect: 'none'}}
        >
            <Form.Item
                name="type"
                label="Выберите тип:"
                layout="vertical"
                labelCol={{span: 12}}
                wrapperCol={{span: 24}}
            >
                <Radio.Group
                    size={"small"} buttonStyle={'solid'}
                    value={question.type}
                    onChange={(e) => {
                        question.type = e.target.value
                        const newWelcomeText = e.target.value === "mono" ? "Выберите один вариант:" : "Выберите несколько вариантов:";
                        question.welcome_text = newWelcomeText;
                        setWelcomeText(newWelcomeText);
                    }}
                >
                    <Radio.Button value={'mono'}>Один вариант</Radio.Button>
                    <Radio.Button value={'multi'}>Несколько вариантов</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                name="points"
                label="Баллов за решение"
                labelCol={{span: 12}}
                wrapperCol={{span: 8}}
                rules={[{required: true, message: 'Укажите количество баллов!'}]}
            >
                <InputNumber defaultValue={question.cost} onChange={e => question.cost = Number(e)}
                             min={0} max={15} addonAfter={'Б'}/>
            </Form.Item>

            {question.type !== 'mono' &&
                <Form.Item
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
                labelCol={{span: 12}}
                wrapperCol={{span: 8}}
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

            <Form.Item wrapperCol={{offset: 8}} labelCol={{span: 8}}>
                <Button type="primary" htmlType="submit">Сохранить</Button>
            </Form.Item>

        </Form>
    )
}