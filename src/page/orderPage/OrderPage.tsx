import Empty from '../../components/drawerBasket/empty/Empty';
import Footer from '../../components/footer/Footer';
import Header from '../../components/Header/Header';
import Order from '../../components/order/Order';
import { useAppSelector } from '../../hooks/hooks';
import './OrderPage.scss'; // <-- Не забудь импортировать стили!

const OrderPage = () => {
    const { basket } = useAppSelector(state => state.basketSlice);

    return (
        <div className="OrderPage">
            <Header />
            <main className="OrderPage__content">
                {basket.length > 0 ? (
                    <div className="OrderPage__order">
                        <h2>Оформление заказа</h2>
                        <Order basket={basket} />
                    </div>
                ) : (
                    <Empty />
                )}
            </main>
            <Footer />
        </div>
    );
};

export default OrderPage;
