import './OrderHistory.scss';
import { Table } from 'antd';
import dayjs from 'dayjs';
import { columns } from './columns';
import { useOrderHistory } from '../../../../../hooks/useOrderHistory';
import { DataType } from '../../../../../types/Types';

const OrderHistory = () => {
    const { orders } = useOrderHistory();

    // Преобразуем данные заказов в формат, подходящий для таблицы
    const orderData = orders.map((order) => ({
        key: order.id || 'unknown',
        id: order.id || 'unknown',
        address: order.userData.address || 'unknown',
        dataOrder: dayjs(order?.timestamp).format('DD.MM.YYYY HH:mm:ss') || '',
        totalPrice: `${order.userData.totalPrice}₽` || '0',
        more: 'Подробнее',
        timestamp: order.timestamp, // Include the timestamp property
        userData: order.userData, // Include the userData property
    }));

    return (
        <div>
            <h1 className="orderHistory">История заказов</h1>
            <Table<DataType>
                columns={columns}
                dataSource={orderData}
                pagination={{
                    pageSize: 5,
                }}
            />
        </div>
    );
};

export default OrderHistory;
