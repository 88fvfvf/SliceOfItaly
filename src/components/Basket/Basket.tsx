import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiDeleteOutline } from "react-icons/ti";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import './BasketStyle.scss';
import { deleteAllPizza, deletePizza } from "../../store/toolkit/pizzaBasket/pizza.slice";

const Basket = () => {
    const data = useAppSelector(state => state.pizzaSlice.Pizza);
    const dispatch = useAppDispatch()

    const handleClickBasket = (order: number, price: number) => {
        const pizzaData = {
            pizzaOrder: order,
            pizzaPrice: price
        };
        dispatch(deletePizza(pizzaData))
    }

    return (
        <div className="Orders">
            <div className="Order__top">
                <div className="Cart">
                    <span>
                        <PiShoppingCartSimpleLight size={29} />
                    </span>
                    <h2>Корзина</h2>
                </div>
                <div className="delete__cart" onClick={() => dispatch(deleteAllPizza())}>
                    <span><RiDeleteBin6Line color="#B6B6B6" size={20} /></span>
                    <p>Очистить корзину</p>
                </div>
            </div>
            {data?.map(order => (
                <div className="Pizza" key={order.id}>
                    <div className="Img__title_about">
                        <img src={order?.imageUrl} alt="no images" />
                        <div className="title__about">
                            <h3>{order?.title}</h3>
                        </div>
                    </div>
                    <div className="pizza__right">
                        <div className="Change__amount">
                            <CiCircleMinus color="#FE5F1E" size={30} />
                            <h3>2</h3>
                            <CiCirclePlus color="#FE5F1E" size={30} />
                        </div>
                        <div className="pizza__price">
                            <h3>{order?.price + '₽'}</h3>
                        </div>
                        <div className="delete" onClick={() => handleClickBasket(order.id, order.price)}>
                            <TiDeleteOutline color="#D7D7D7" size={30} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Basket;
