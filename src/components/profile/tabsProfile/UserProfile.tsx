import { Tabs } from "antd";
import { AiOutlineComment } from "react-icons/ai";
import { RiUserSettingsLine } from "react-icons/ri";
import { RxTimer } from "react-icons/rx";
import { VscHistory } from "react-icons/vsc";
import Comments from "../../admin/tabs/comments/Comments";
import CurrentOrders from "./TabsItem/currentOrders/CurrentOrders";
import OrderHistory from "./TabsItem/orderHistory/OrderHistory";
import PersonalData from "./TabsItem/personalData/PersonalData";
import './UserProfile.css';

const TabsProfile = () => {
    const tabItems = [
        {
            label: 'Заказы в обработке',
            key: '1',
            children: <CurrentOrders />,
            icon: <RxTimer size={18} />
        },
        {
            label: 'История заказов',
            key: '2',
            children: <OrderHistory />,
            icon: <VscHistory size={18} />
        },
        {
            label: 'Отзывы клиентов',
            key: '4',
            children: <Comments />,
            icon: <AiOutlineComment size={18} />
        },
        {
            label: 'Личные данные',
            key: '3',
            children: <PersonalData />,
            icon: <RiUserSettingsLine size={18} />
        },
    ];

    return (
        <div className="tabsProfile">
            <Tabs
                type="card"
                className="custom-tabs"
                items={tabItems}
            />
        </div>
    )
}

export default TabsProfile