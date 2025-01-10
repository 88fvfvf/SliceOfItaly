import { Card } from "antd";
import './currentOrders.scss'

const CurrentOrders = () => {
    return (
        <div className="currentOrders">
            <h1>
                Текущие заказы
            </h1>
            <div className="card_orders">
                <Card
                    title="Номер заказа №1"
                    extra={<a>Посмотреть процесс</a>}
                >
                    <div className="currentOrder_products">
                        <div className="currentOrder_name">
                            <h3>1.Чоризо фреш 25см</h3>
                            <span>330₽</span>
                        </div>
                        <div className="currentOrder_name">
                            <h3>2.Пепперони 30см</h3>
                            <span>330₽</span>
                        </div>
                        <div className="currentOrder_name">
                            <h3>3.Альфредо 35см</h3>
                            <span>330₽</span>
                        </div>
                    </div>
                    <button>Детали заказа</button>
                </Card>
                <Card
                    title="Номер заказа №2"
                    extra={<a>Посмотреть процесс</a>}
                >
                    <div className="currentOrder_products">
                        <div className="currentOrder_name">
                            <h3>1.Чоризо фреш 25см</h3>
                            <span>330₽</span>
                        </div>
                        <div className="currentOrder_name">
                            <h3>2.Пепперони 30см</h3>
                            <span>330₽</span>
                        </div>
                        <div className="currentOrder_name">
                            <h3>3.Альфредо 35см</h3>
                            <span>330₽</span>
                        </div>
                        <div className="currentOrder_name">
                            <h3>4.Альфредо 35см</h3>
                            <span>330₽</span>
                        </div>
                    </div>
                    <button>Детали заказа</button>
                </Card>
                <Card
                    title="Номер заказа №3"
                    extra={<a>Посмотреть процесс</a>}
                >
                    <div className="currentOrder_products">
                        <div className="currentOrder_name">
                            <h3>1.Чоризо фреш 25см</h3>
                            <span>330₽</span>
                        </div>
                        <div className="currentOrder_name">
                            <h3>2.Пепперони 30см</h3>
                            <span>330₽</span>
                        </div>
                        <div className="currentOrder_name">
                            <h3>3.Альфредо 35см</h3>
                            <span>330₽</span>
                        </div>
                        <div className="currentOrder_name">
                            <h3>4.Чоризо фреш 25см</h3>
                            <span>330₽</span>
                        </div>
                        <div className="currentOrder_name">
                            <h3>5.Пепперони 30см</h3>
                            <span>330₽</span>
                        </div>
                    </div>
                    <button className="currentOrderButton">Детали заказа</button>
                </Card>
            </div>
        </div>
    );
};

export default CurrentOrders;