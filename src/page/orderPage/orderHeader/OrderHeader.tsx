import { Steps } from "antd";
import HeaderLeft from "../../../components/Header/Left/HeaderLeft"
import './OrderHeader.css'

const OrderHeader = () => {
    return (
        <div className="OrderHeader">
            <HeaderLeft />
            <div className="steps">
                <Steps
                    current={1}
                    labelPlacement="vertical"
                    items={[
                        {
                            title: 'Корзина'
                        },
                        {
                            title: 'Оформление заказа'
                        },
                        {
                            title: 'Заказ принят'
                        },
                    ]}
                />
            </div>
        </div>
    )
}

export default OrderHeader