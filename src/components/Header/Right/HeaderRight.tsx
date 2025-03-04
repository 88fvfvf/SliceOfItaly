import { useState } from "react";
import DrawerBasket from "../../drawerBasket/DrawerBasket";
import { FaArrowRight } from "react-icons/fa6";
import './HeaderRight.scss';
import { useAppSelector } from "../../../hooks/hooks";
import { BsBasket } from "react-icons/bs";

const HeaderRight = () => {
    const amount = useAppSelector(state => state.basketSlice.basket)
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="header__right" onClick={showDrawer}>
                <div className="price">
                    <span>Корзина</span>
                </div>
                {amount.length > 0 ? (
                    <>
                        <div className="header__left_line"></div>
                        <div className="basket">
                            <div className="arrow">
                                <FaArrowRight color="#fff" />
                            </div>
                            <span>{amount.length}</span>
                        </div>
                    </>
                ) : (
                    null
                )}
                <div className='DrawerBasket' onClick={(e) => e.stopPropagation()}>
                    <DrawerBasket open={open} onCloseDrawer={onClose} />
                </div>
            </div>
            <div className="fixed_basket" onClick={showDrawer}>
                <BsBasket size={30} color="#fff" />
                <div className="fixed_basket__amount">
                    <span>{amount.length}</span>
                </div>
            </div>
        </>
    );
};

export default HeaderRight;


