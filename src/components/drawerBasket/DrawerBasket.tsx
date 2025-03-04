import { Drawer } from 'antd';
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addBasket, deleteBasket, minusBasket } from '../../store/basket/basket.slice';
import './DrawerBasket.scss';
import Empty from './empty/Empty';
import { Link, useNavigate } from 'react-router-dom';

interface DrawerBasketProps {
    open: boolean;
    onCloseDrawer: () => void;
}

const DrawerBasket = ({ open, onCloseDrawer }: DrawerBasketProps) => {
    const data = useAppSelector(state => state.basketSlice.basket);
    const totalPrice = useAppSelector(state => state.basketSlice.totalPrice);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const handleTransition = () => {
        if (document.startViewTransition) {
            // Включаем анимацию перехода
            document.startViewTransition(() => {
                // Переход на страницу заказа
                navigate("/order");
            });
        } else {
            // Если API не поддерживается, просто переходим
            navigate("/order");
        }
    };


    return (
        <div className='DrawerBasket'>
            <Drawer
                title={data.length > 0 ? `${data.length} товара на ${totalPrice}` : null}
                open={open}
                onClose={() => onCloseDrawer()}
                width={430}
            >
                {data?.length ? (
                    <div className="body_item">
                        {data.map((basket, index) => {
                            const tastyKey = Array.isArray(basket.tasty) ? basket.tasty.join(",") : '';
                            const uniqueKey = `${basket.id}_${basket.size || ''}_${basket.type || ''}_${basket.unit || ''}_${tastyKey}_${index}`;
                            return (
                                <div className="basket" key={uniqueKey}>
                                    <div className="basket_details">
                                        <div className="basket_img">
                                            <img src={basket.images[0 | basket.unit]} width={64} alt="no-image" loading="lazy" />
                                        </div>
                                        <div className="details">
                                            <div className="basket_title">
                                                <h3>{basket.title}</h3>
                                            </div>
                                            {basket.sizes && <p>{basket.size}, {basket.type} тесто, {basket.weightProduct}</p>}
                                            {basket.tasty && basket.tasty.length > 0 && (
                                                <p className='basket_ingredients'>+ {basket.tasty.join(",")}</p>
                                            )}
                                            {basket.units && <p>{basket.units[basket.unit]}</p>}
                                        </div>
                                        <div className="delete_basket">
                                            <IoClose size={20} cursor={'pointer'} onClick={() => dispatch(deleteBasket(basket))} />
                                        </div>
                                    </div>
                                    <div className="current">
                                        <div className='price'>{basket.finalPrice} ₽</div>
                                        <div className="counter">
                                            <FaMinus color='rgb(92, 99, 112)' cursor={'pointer'} onClick={() => dispatch(minusBasket(basket))} />
                                            <span>{basket.count}</span>
                                            <FaPlus color='rgb(92, 99, 112)' cursor={'pointer'} onClick={() => dispatch(addBasket(basket))} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <Empty />
                )}
                {data?.length > 0 && (
                    <footer>
                        <div className="subtotal">
                            <div className="info">
                                <div className="info_amount">
                                    <h3>Товаров:</h3>
                                </div>
                                <div className="cost">
                                    <strong>{data.length} шт</strong>
                                </div>
                            </div>
                            <div className="info_AllPrice">
                                <div className="info_sum">
                                    <h2>Сумма заказа:</h2>
                                </div>
                                <div className="info_price">
                                    <h3>{totalPrice} ₽</h3>
                                </div>
                            </div>
                            <Link to={"/order"} onClick={handleTransition}>
                                <button>К оформлению заказа <IoIosArrowForward size={20} /></button>
                            </Link>
                        </div>
                    </footer>
                )}
            </Drawer>
        </div>
    );
};

export default DrawerBasket;
