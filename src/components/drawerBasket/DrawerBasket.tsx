import { Drawer } from 'antd'
import './DrawerBasket.scss'
import { IoClose } from "react-icons/io5";
import { FaMinus, FaPlus } from "react-icons/fa6";

interface DrawerBasketProps {
    open: boolean;
    onCloseDrawer: () => void;
}

const DrawerBasket = ({ open, onCloseDrawer }: DrawerBasketProps) => {
    return (
        <div className='DrawerBasket'>
            <Drawer
                title={'2 товара на 900 ₽'}
                open={open}
                onClose={() => onCloseDrawer()}
                width={430}
            // footer={<div>lorem20</div>}
            >
                <div className="basket">
                    <div className="basket_details">
                        <div className="basket_img">
                            <img src="https://media.dodostatic.net/image/r:292x292/11EE7D6199159D8F9FCA5BC54846866F.jpg" width={64} alt="no-image" loading="lazy"/>
                        </div>
                        <div className="details">
                            <div className="basket_title">
                                <h3>Пепперони фреш</h3>
                            </div>
                            <p>25 см, Традиционное тесто, 470 гр</p>
                            <p className='basket_ingredients'>+ моцарелла, сырный бортик, пряная говядина</p>
                        </div>
                        <div className="delete_basket">
                            <IoClose size={20} cursor={'pointer'} />
                        </div>
                    </div>
                    <div className="current">
                        <div className='price'>1 178 ₽</div>
                        <div className="counter">
                            <FaMinus color='rgb(92, 99, 112)' cursor={'pointer'} />
                            <span>1</span>
                            <FaPlus color='rgb(92, 99, 112)' cursor={'pointer'} />
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default DrawerBasket