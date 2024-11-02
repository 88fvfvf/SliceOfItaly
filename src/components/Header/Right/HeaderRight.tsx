import { NavLink } from "react-router-dom";
import { BasketIcone } from "../../../../public/svg/icone";
import { useAppSelector } from "../../../hooks/hooks";
import './HeaderRight.scss'

const HeaderRight = () => {
    const { price, amount } = useAppSelector(state => state.pizzaSlice)

    return (
        <div className="header__right">
            <NavLink to='/basket'>
                <div className="price">
                    <span>{price} ₽</span>
                </div>
                <div className="header__left_line"></div>
                <div className="basket">
                    <BasketIcone />
                    <span>{amount}</span>
                </div>
            </NavLink>
        </div>
    )
}

export default HeaderRight