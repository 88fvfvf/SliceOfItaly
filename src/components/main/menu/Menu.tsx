import { Link } from 'react-router-dom';
import { IProducts } from '../../../types/Types';
import './Menu.scss';


interface IPropsMenu {
    data: IProducts[],
}

const Menu = ({ data }: IPropsMenu) => {
    return (
        <>
            {data.map(data => (
                <div className="main__menu" key={data.id}>
                    <Link to={`/product/${data.title}`}>
                        <div className="main__img">
                            <img src={data?.images[0]} alt={data?.title} loading="lazy" />
                        </div>
                        <div className="main__title_pizza">
                            <h3>{data?.title}</h3>
                        </div>
                        <div className="pizza_desc">
                            {'description' in data &&
                                <p>{data.description ? (
                                    data?.description.length > 50
                                        ? data.description.slice(0, 50) + '...' : data.description
                                ) : (
                                    <p>...</p>
                                )
                                }
                                </p>
                            }
                        </div>
                    </Link>
                    <div className="pizza__options">
                        <div className="main__price_button">
                            <h3><span>от</span> {data?.price} ₽</h3>
                            <button>
                                <span>+</span> Добавить
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Menu