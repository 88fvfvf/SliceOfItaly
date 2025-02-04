import { FaMinus, FaPlus } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { IProducts } from "../../../types/Types";
import { useAppDispatch } from "../../../hooks/hooks";
import { addBasket, deleteBasket, minusBasket } from "../../../store/basket/basket.slice";

interface IBasketProps {
    basket: IProducts[];
    clearBasket: () => void;
}

const Basket = ({ basket, clearBasket }: IBasketProps) => {
    const dispatch = useAppDispatch();

    return (
        <div className="order_basket">
            <div className="basket_header">
                <h3>1. Корзина</h3>
                <span onClick={clearBasket}>
                    <RiDeleteBinLine />
                    <span>Очистить корзину</span>
                </span>
            </div>
            {basket.map((item, index) => {
                const tastyKey = Array.isArray(item.tasty) ? item.tasty.join(",") : '';
                const uniqueKey = `${item.id}_${item.size || ''}_${item.type || ''}_${item.unit || ''}_${tastyKey}_${index}`;
                return (
                    <div className="basket_cart" key={uniqueKey}>
                        <div className="cart_product">
                            <div className="cart_img">
                                <img src={item.images[0 | item.unit]} width={85} alt="cart image" />
                            </div>
                            <div className="cart_details">
                                <div className="cart_name">
                                    <h3>{item.title}</h3>
                                </div>
                                <p>
                                    {item.sizes && <span>{item.size}, {item.type} тесто, {item.weightProduct}</span>}
                                    {item.units && <span>{item.units[item.unit]}</span>}
                                </p>
                                <div className="cart_toTasty">
                                    {item.tasty && item.tasty.length > 0 && (
                                        <p className='cart_toTasty'>+ {item.tasty.join(",")}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="price_current">
                            <div className="cart_price">
                                <h3>{item.finalPrice} ₽ </h3>
                            </div>
                            <div className="cart_amount">
                                <div className="amount_minus">
                                    <FaMinus color="#FE5F00" onClick={() => dispatch(minusBasket(item))} />
                                </div>
                                <h3>{item.count}</h3>
                                <div className="amount_plus">
                                    <FaPlus color="#FE5F00" onClick={() => dispatch(addBasket(item))} />
                                </div>
                            </div>
                            <div className="cart_delete" onClick={() => dispatch(deleteBasket(item))}>
                                <RxCross2 cursor="pointer" />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Basket;
