import { Form, Input } from 'antd'
import './Address.scss'

const Address = () => {
    return (
        <div className='address'>
            <div className="address_header">
                <h2>3. Адрес доставки</h2>
            </div>
            <div className="address_info">
                <Form>
                    <Form.Item name={'address'} label={'Введите адрес'}>
                        <Input placeholder='Amir Temur 33a' />
                    </Form.Item>
                    <Form.Item name={'comment'} label={'Комментарий к заказу (Не обезательно)'}>
                        <Input placeholder="Укажите тут дополнительную информацию для курьера" />
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Address