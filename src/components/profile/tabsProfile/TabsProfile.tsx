import { Tabs } from "antd"
import CurrentOrders from "./TabsItem/currentOrders/CurrentOrders";
import OrderHistory from "./TabsItem/orderHistory/OrderHistory";
import './TabsProfile.css'
import PersonalData from "./TabsItem/personalData/PersonalData";

const TabsProfile = () => {
    return (
        <div className="tabsProfile">
            <Tabs
                type="card"
                className="custom-tabs"
                items={[
                    {
                        label: 'Текущие заказы',
                        key: '1',
                        children: <CurrentOrders />,
                    },
                    {
                        label: 'История заказов',
                        key: '2',
                        children: <OrderHistory />,
                    },
                    {
                        label: 'Личные данные',
                        key: '3',
                        children: <PersonalData />,
                    },
                ]}
            />
        </div>
    )
}

export default TabsProfile