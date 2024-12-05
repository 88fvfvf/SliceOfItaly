import { useState } from "react";
import DrawerBasket from "../../drawerBasket/DrawerBasket";
import { FaArrowRight } from "react-icons/fa6";
import './HeaderRight.scss';

const HeaderRight = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <div className="header__right" onClick={showDrawer}>
            <div className="price">
                <span>Корзина</span>
            </div>
            <div className="header__left_line"></div>
            <div className="basket">
                <div className="arrow">
                    <FaArrowRight color="#fff" />
                </div>
                <span>{1}</span>
            </div>
            <div className='DrawerBasket' onClick={(e) => e.stopPropagation()}>
                <DrawerBasket open={open} onCloseDrawer={onClose} />
            </div>
        </div>
    );
};

export default HeaderRight;
