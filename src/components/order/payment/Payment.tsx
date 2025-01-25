// Payment.tsx
import React from 'react';
import { useAppSelector } from '../../../hooks/hooks'
import './Payment.scss'
import { FaBoxOpen } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";

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
            <div className="payment_body">
                <div className="cost_products">
                    <div>
                        <FaBoxOpen size={20} />
                        <h3>Стоимость товаров:</h3>
                    </div>
                    <div>
                        <h3>{totalPrice} ₽</h3>
                    </div>
                </div>
                <div className="deliver">
                    <div>
                        <TbTruckDelivery size={20} />
                        <h3>Доставка:</h3>
                    </div>
                    <div>
                        <h3>Бесплатно</h3>
                    </div>
                </div>
            </div>
            <div className="toPay">
                <button type='submit' onClick={() => handleSubmit}>Перейти к оплате</button>
            </div>
        </div>
    );
};

export default Payment;
