import React from 'react';
import { useAppSelector } from '../../../hooks/hooks'
import './Payment.scss'
import { BsInboxes } from "react-icons/bs";
import { BsTruck } from "react-icons/bs";


interface PaymentProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Payment: React.FC<PaymentProps> = ({ handleSubmit }) => {
    const totalPrice = useAppSelector(state => state.basketSlice.totalPrice);

    return (
        <div className="payment">
            <div className="total">
                <span>Итого:</span>
                <h2>{totalPrice} ₽</h2>
            </div>
            <dl className="payment_body">
                <div className="cost_products">
                    <div>
                        <BsInboxes size={20} />
                        <dt className='product_dt'>
                            <div>Стоимость:</div>
                        </dt>
                        <dd>{totalPrice} ₽</dd>
                    </div>
                </div>
                <div className="deliver">
                    <div>
                        <BsTruck size={20} />
                        <dt className='product_dt'>
                            <div>Доставка:</div>
                        </dt>
                        <dd className='free'>Бесплатно</dd>
                    </div>
                </div>
            </dl>
            <div className="toPay">
                <button type='submit' form="orderForm" onClick={() => handleSubmit}>Перейти к оплате</button>
            </div>
        </div>
    );
};

export default Payment;
