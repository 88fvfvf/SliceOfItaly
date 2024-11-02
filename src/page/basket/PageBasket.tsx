import Basket from "../../components/Basket/Basket"
import HeaderLeft from "../../components/Header/Left/HeaderLeft"
import './StyleBasket.scss'

const PageBasket = () => {
    return (
        <div className="container">
            <HeaderLeft />
            <div className="BasketOrders">
                <Basket />
            </div>
        </div>
    )
}

export default PageBasket