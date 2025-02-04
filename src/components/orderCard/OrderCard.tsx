import { Card } from "antd";
import SelectStatus from "../admin/tabs/processingOrders/status/SelectStatus";
import ModalDetails from "../profile/tabsProfile/TabsItem/currentOrders/ModalOrders/ModalDetails";
import { IUserData } from "../profile/tabsProfile/TabsItem/currentOrders/CurrentOrders";
import { IProcessingOrders } from "../../types/Types";

interface OrderCardProps {
    order: IProcessingOrders;
    userData: IUserData;
    index: number;
    onSelectStatus?: (status: string) => void;
    onOpenModal: () => void;
    onCloseModal: () => void;
    isActive?: boolean;
    isUser: boolean
}

const OrderCard: React.FC<OrderCardProps> = ({
    order,
    userData,
    index,
    onSelectStatus,
    onOpenModal,
    onCloseModal,
    isActive,
    isUser,
}) => {



    return (
        <>
            <Card
                key={order.id}
                title={`Номер заказа №${index + 1}`}
                extra={
                    isUser ? (
                        <span style={{ color: "#FE5F1E" }}>{userData.status}</span>
                    ) : (
                        onSelectStatus && (
                            <SelectStatus
                                status={userData.status}
                                onChange={onSelectStatus}
                            />
                        )
                    )
                }
            >
                <div className="currentOrder_products">
                    {order.basket.map((product, productIndex) => (
                        <div key={productIndex} className="current">
                            <div>
                                {productIndex + 1}. <span>{product.title}</span>
                                {product.sizes && <span>, {product.size}, {product.type} тесто</span>}
                                {product.units && <span>, {product.units[product.unit]}</span>}
                            </div>
                            <span className="price">{product.finalPrice}₽</span>
                        </div>
                    ))}
                </div>
                <div className="currentOrder_details">
                    <p>Общая стоимость: {userData.totalPrice}₽</p>
                    <button onClick={onOpenModal}>Детали заказа</button>
                </div>
            </Card>
            {isActive && (
                <ModalDetails
                    userData={userData}
                    modalOrders={order.basket}
                    setModalDetails={onCloseModal}
                />
            )}
        </>
    );
};

export default OrderCard;
