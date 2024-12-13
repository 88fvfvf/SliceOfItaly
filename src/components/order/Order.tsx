import { FaMinus, FaPlus } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useAppDispatch } from '../../hooks/hooks';
import { addBasket, deleteAll, deleteBasket, minusBasket } from '../../store/basket/basket.slice';
import { IProducts } from '../../types/Types';
import './Order.scss';

interface IBasket {
    basket: IProducts[]
}

const Order = ({basket}: IBasket) => {

    const dispatch = useAppDispatch()
    return (
        <div className='order'>
            <div className="order_basket">
                <div className="basket_header">
                    <h2>1. Корзина</h2>
                    <span onClick={() => dispatch(deleteAll())}>
                        <RiDeleteBinLine />
                        <span>Очистить корзину</span>
                    </span>
                </div>
                {basket.map((basket) => {
                    const uniqueKey = `${basket.id}_${basket.size}_${basket.type}_${basket.unit}_${basket.tasty.join(",")}`;
                    return (
                        <div className="basket_cart" key={uniqueKey}>
                            <div className="cart_product">
                                <div className="cart_img">
                                    <img src={basket.images[0 | basket.unit]} width={85} alt="cart image" />
                                </div>
                                <div className="cart_details">
                                    <div className="cart_name">
                                        <h3>{basket.title}</h3>
                                    </div>
                                    <p>
                                        {basket.sizes && <p>{basket.size}, {basket.type} тесто, {basket.weightProduct}</p>}
                                        {basket.units && <p>{basket.units[basket.unit]}</p>}
                                    </p>
                                    <div className="cart_toTasty">
                                        {basket.tasty.length > 0 ? <p>+ {basket.tasty.join(",")}</p> : null}
                                    </div>
                                </div>
                            </div>
                            <div className="cart_price">
                                <h3>{basket.finalPrice} ₽ </h3>
                            </div>
                            <div className="cart_amount">
                                <div className="amount_minus">
                                    <FaMinus color='#FE5F00' onClick={() => dispatch(minusBasket(basket))} />
                                </div>
                                <h3>{basket.count}</h3>
                                <div className="amount_plus">
                                    <FaPlus color='#FE5F00' onClick={() => dispatch(addBasket(basket))} />
                                </div>
                            </div>
                            <div className="cart_delete" onClick={() => dispatch(deleteBasket(basket))}>
                                <RxCross2 cursor={'pointer'} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Order