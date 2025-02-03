import { ColumnsType } from 'antd/es/table';
import { DataType } from '../../../../../types/Types';
import { Button } from 'antd';

export const columns = (onViewDetails: (record: DataType) => void): ColumnsType<DataType> => [
    {
        title: 'Адрес доставки',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Дата заказа',
        dataIndex: 'dataOrder',
        key: 'dataOrder',
    },
    {
        title: 'Сумма',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        sorter: (a, b) => a.userData.totalPrice - b.userData.totalPrice,
    },
    {
        title: 'Подробнее',
        dataIndex: 'more',
        key: 'more',
        render: (_, record) => (
            <Button type="link" onClick={() => onViewDetails(record)}>
                Подробнее
            </Button>
        ),
    },
];
