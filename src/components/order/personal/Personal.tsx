import { Form, Input } from "antd"
import './Personal.scss'

const Personal = () => {
    return (
        <div className="personal">
            <div className="personal_header">
                <h2>2. Персональная информация</h2>
            </div>
            <div className="personal_form">
                <Form>
                    <Form.Item name={'name'} label={'Имя'}>
                        <Input placeholder="Имя получателя" />
                    </Form.Item>
                    <Form.Item name={'firstName'} label={'Фамилия'}>
                        <Input placeholder="Фамилие получателя" />
                    </Form.Item>
                    <Form.Item name={'gmail'} label={'E-Mail'}>
                        <Input placeholder="E-Mail получателя" />
                    </Form.Item>
                    <Form.Item name={'phone'} label={'Телефон'}>
                        <Input style={{ width: '20%' }} defaultValue="+998" disabled />
                        <Input style={{ width: '80%' }} placeholder="20 000 10 21" />
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Personal