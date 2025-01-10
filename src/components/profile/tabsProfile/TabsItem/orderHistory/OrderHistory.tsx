import { Table } from 'antd';
import type { TableProps } from 'antd';
import './OrderHistory.scss'

interface DataType {
    key: string;
    number: string;
    dataOrder: string;
    amount: string;
    more: string;
}

const OrderHistory = () => {
    const columns: TableProps<DataType>['columns'] = [
        {
            title: '№',
            dataIndex: 'number',
            key: 'number',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Время заказа',
            dataIndex: 'dataOrder',
            key: 'dataOrder',
        },
        {
            title: 'Сумма',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Подробно',
            dataIndex: 'more',
            key: 'more',
            render: (text: string) => <a>{text}</a>,
        },
    ];

    const data: DataType[] = Array.from({ length: 5 }, (_, index) => ({
        key: String(index + 1),
        number: String(index + 1),
        dataOrder: `2025-01-${String(index + 1).padStart(2, '0')} 12:30`,
        amount: `$${(index + 1) * 10}`,
        more: 'Детали',
    }));

    return (
        <div>
            <h1 className="orderHistory">История заказов</h1>
            <Table<DataType>
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: 10, // Количество записей на странице
                }}
            />
        </div>
    );
};

export default OrderHistory;
