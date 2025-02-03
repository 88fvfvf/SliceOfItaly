import { useState } from "react";
import { useFirebaseAuth } from "../../../../hooks/useFirebaseAuth";
import { useOrders } from "../../../../hooks/useOrders";
import OrderCard from "../../../orderCard/OrderCard";
import { updateOrderStatus } from "./api/ordersApi";
import "./ProcessingOrders.scss";
import NotActivity from "../../notActivity/NotActivity";

const ProcessingOrders = () => {
    const { user } = useFirebaseAuth();
    const { orders, userData, error } = useOrders(user);
    const [activeOrderIndex, setActiveOrderIndex] = useState<number | null>(null);

    const openModal = (index: number) => setActiveOrderIndex(index);
    const closeModal = () => setActiveOrderIndex(null);

    if (error) {
        return <h3>Что-то пошло не так перезагрузите сайт</h3>;
    }

    const handleSelectStatus = (userId: string, orderKey: string, status: string) => {
        updateOrderStatus(userId, orderKey, status);
    };

    return (
        <div className="ProcessingOrders">
            <h1>Заказы в обработке</h1>
            <div className="card_orders">
                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            userData={userData[index] || {}}
                            index={index}
                            onSelectStatus={(status) => handleSelectStatus(order.userId, order.id, status)}
                            onOpenModal={() => openModal(index)}
                            onCloseModal={closeModal}
                            isActive={activeOrderIndex === index}
                            isUser={false}
                        />
                    ))
                ) : (
                    <NotActivity text='Нет заказов в обработке' />
                )}
            </div>
        </div>
    );
};

export default ProcessingOrders;
