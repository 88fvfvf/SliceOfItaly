import './OrderHistory.scss';
import { Table } from 'antd';
import dayjs from 'dayjs';
import { columns } from './columns';
import { useOrderHistory } from '../../../../../hooks/useOrderHistory';
import { DataType } from '../../../../../types/Types';
import { useState } from 'react';
import ModalDetails from '../currentOrders/ModalOrders/ModalDetails';
import NotActivity from '../../../../admin/notActivity/NotActivity';

const OrderHistory = () => {
    const { orders } = useOrderHistory();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<DataType | null>(null);


    const handleViewDetails = (record: DataType) => {
        setSelectedOrder(record);
        setIsModalOpen(!isModalOpen);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    const orderData = orders.map((order) => ({
        key: order.id || 'unknown',
        id: order.id || 'unknown',
        address: order.userData.address || 'unknown',
        dataOrder: order.timestamp ? dayjs(order.timestamp).format('DD.MM HH:mm') : '',
        totalPrice: `${order.userData.totalPrice}₽` || '0',
        more: 'Подробнее',
        timestamp: order.timestamp,
        userData: order.userData,
    }));

    return (
        <div className="orderHistory">
            <h1>История заказов</h1>
            {orders.length > 0 ? (
                <>
                    <Table<DataType>
                        columns={columns(handleViewDetails)}
                        dataSource={orderData}
                        pagination={{ pageSize: 5 }}
                    />

                    {isModalOpen && selectedOrder && (
                        <ModalDetails
                            setModalDetails={handleCloseModal} // Передаем функцию закрытия
                            modalOrders={orders.find((order) => order.id === selectedOrder.id)?.basket || []}
                            userData={selectedOrder.userData}
                        />
                    )}
                </>
            ) : (
                <NotActivity text='История пустая' />
            )}
        </div>
    );
};

export default OrderHistory;
