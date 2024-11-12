import { BasketIcone } from "../../../../public/svg/icone";
import './HeaderRight.scss';

const HeaderRight = () => {
    return (
        <div className="header__right">
            <div className="price">
                <span>{330} ₽</span>
            </div>
            <div className="header__left_line"></div>
            <div className="basket">
                <BasketIcone />
                <span>{1}</span>
            </div>
        </div>
    )
}

export default HeaderRight