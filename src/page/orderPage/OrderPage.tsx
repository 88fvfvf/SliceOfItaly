import Empty from '../../components/drawerBasket/empty/Empty'
import Header from '../../components/Header/Header'
import Order from '../../components/order/Order'
import { useAppSelector } from '../../hooks/hooks'
import OrderHeader from './orderHeader/OrderHeader'

const OrderPage = () => {
    const { basket } = useAppSelector(state => state.basketSlice)
    return (
        <div className='container'>
            {basket.length > 0 ? (
                <>
                    <OrderHeader />
                    <div className='OrderPage' style={{ paddingTop: 20 }}>
                        <h1>Оформление заказа</h1>
                        <Order basket={basket} />
                    </div>
                </>
            ) : (
                <>
                    <Header />
                    <Empty />
                </>
            )
            }
        </div>
    )
}

export default OrderPage