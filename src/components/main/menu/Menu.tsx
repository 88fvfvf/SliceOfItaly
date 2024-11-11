import { IBreakfast, ICocktails, IDesserts, IDrinks, IPizza, ISnacks } from '../../../types/Types'
import './Menu.scss'

type ProductType = IPizza | IBreakfast | IDrinks | ISnacks | ICocktails | IDesserts;

interface IPropsMenu<T extends ProductType> {
    data: T
}

const Menu = <T extends ProductType>({ data }: IPropsMenu<T>) => {
    return (
        <div className="main__menu">
            <div className="main__img">
                <img src={data?.images[0]} alt={data?.title} />
            </div>
            <div className="main__title_pizza">
                <h3>{data?.title}</h3>
            </div>
            <div className="pizza_desc">
                {'description' in data &&
                    <p>{data?.description.length > 60
                        ? data.description.slice(0, 60) + '...' : data.description
                    }
                    </p>
                }
            </div>
            <div className="pizza__options">
                <div className="main__price_button">
                    <h3><span>от</span> {data?.price} ₽</h3>
                    <button><span>+</span> Добавить</button>
                </div>
            </div>
        </div>
    )
}

export default Menu