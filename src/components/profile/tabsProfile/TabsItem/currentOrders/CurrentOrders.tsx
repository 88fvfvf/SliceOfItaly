import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useFirebaseAuth } from "../../../../../hooks/useFirebaseAuth";
import { IProcessingOrders } from "../../../../../types/Types";
import './currentOrders.scss';
import OrderCard from "../../../../orderCard/OrderCard";

export interface IUserData {
    name: string;
    email: string;
    totalPrice: number;
    address: string;
    extraInfo: string;
    status: string;
}

const CurrentOrders = () => {
    const [orders, setOrders] = useState<IProcessingOrders[]>([]);
    const [userData, setUserData] = useState<IUserData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [activeOrderIndex, setActiveOrderIndex] = useState<number | null>(null);
    const { user } = useFirebaseAuth()

    useEffect(() => {
        if (user) {
            const db = getDatabase();
            const orderRef = ref(db, `orders/${user.uid}`);

            const unsubscribe = onValue(
                orderRef,
                (snapshot) => {
                    const data = snapshot.val();
                    const ordersArray: IProcessingOrders[] = [];
                    const userDataArray: IUserData[] = [];

                    if (data) {
                        for (let orderId in data) {
                            const order = data[orderId];
                            ordersArray.push({ id: orderId, basket: order.basket || [], userId: user.uid });
                            userDataArray.push(order.userData || {});
                        }
                    }

                    setOrders(ordersArray);
                    setUserData(userDataArray);
                },
                (error) => {
                    setError('Error fetching orders');
                    console.error("Error fetching orders:", error);
                }
            );

            return () => unsubscribe();
        }
    }, [user]);

    if (error) {
        return <div>{error}</div>;
    }
    const openModal = (index: number) => setActiveOrderIndex(index);
    const closeModal = () => setActiveOrderIndex(null);

    return (
        <div className="currentOrders">
            <h1>Заказы в обработке</h1>
            <div className="card_orders">
                {orders.length > 0 ? (
                    orders.map((order, index) => {
                        const currentUserData = userData[index] || {};
                        return (
                            <OrderCard
                                index={index}
                                order={order}
                                onOpenModal={() => openModal(index)}
                                onCloseModal={closeModal}
                                userData={currentUserData}
                                isUser={true}
                                isActive={activeOrderIndex === index}
                                key={index}
                            />
                        );
                    })
                ) : (
                    <div className="not_orders">
                        <span>У вас нет текущих заказов</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CurrentOrders;
