import { Tabs } from 'antd';
import React from 'react';
import { AiOutlineComment } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineAnalytics } from "react-icons/md";
import { RxTimer } from "react-icons/rx";
import './Admin.scss';
import Comments from './tabs/comments/Comments';
import EditMenu from './tabs/editMenu/EditMenu';
import ProcessingOrders from './tabs/processingOrders/ProcessingOrders';
import SalesStatistics from './tabs/salesStatistics/SalesStatistics';

const Admin: React.FC = () => {
    const tabItems = [
        { label: 'Заказы в обработке', icon: <RxTimer size={18} />, key: '1', children: <ProcessingOrders /> },
        { label: 'Статистика продаж', icon: <MdOutlineAnalytics size={18} />, key: '2', children: <SalesStatistics /> },
        { label: 'Редактирование меню', icon: <FaRegEdit size={18} />, key: '3', children: <EditMenu /> },
        { label: 'Отзывы клиентов', icon: <AiOutlineComment size={18} />, key: '4', children: <Comments /> },
    ];

    return (
        <div className='admin'>
            <Tabs type="card" className="custom-tabs" items={tabItems} />
        </div>
    );
};

export default Admin;
