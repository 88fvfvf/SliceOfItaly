import { NavLink } from "react-router-dom"
import { PizzaIcon } from "../../../../public/svg/icone"
import './headerLeft.css'

const HeaderLeft = () => {
    return (
        <div className="header__left">
            <NavLink to='/'>
                <div className="header__logo">
                    <PizzaIcon />
                </div>
                <div className="header__text">
                    <h1>Slice of Italy</h1>
                    <p>Итальянский вкус рядом</p>
                </div>
            </NavLink>
        </div>
    )
}

export default HeaderLeft