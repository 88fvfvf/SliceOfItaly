import { Rate } from 'antd'
import { useAppDispatch } from '../../hooks/hooks'
import { useFetchPizzaQuery } from '../../store/api/api.pizza'
import { addPizza, addPrice } from '../../store/toolkit/pizzaBasket/pizza.slice'
import './StyleMain.scss'
import Filtering from './section/filtering'
import SkeletonPizza from './skeleton/SkeletonPizza'

const Main = () => {
    const { data, isLoading } = useFetchPizzaQuery(undefined)
    const dispatch = useAppDispatch()

    return (
        <main>
            <div className="container">
                <div className="filter__main_block">
                    <Filtering />
                    <div className="main_block">
                        {isLoading ? (
                            // Показываем несколько скелетонов пока идет загрузка
                            Array.from({ length: 6 }).map((_, index) => (
                                <SkeletonPizza key={index} />
                            ))
                        ) : (
                            data?.map(pizza => (
                                <div key={pizza.id} className="main__pizza">
                                    <div className="main__img">
                                        <img src={pizza?.imageUrl} alt="unwnown" />
                                    </div>
                                    <div className="main__title_pizza">
                                        <h3>{pizza?.title}</h3>
                                    </div>
                                    <div className="pizza_rate">
                                        <Rate disabled defaultValue={pizza.rating} />
                                    </div>
                                    <div className="pizza_desc">
                                        <p>{pizza.description}</p>
                                    </div>
                                    <div className="pizza__options">
                                        <div className="main__price_button">
                                            <h3><span>от</span> {pizza?.price} ₽</h3>
                                            <button onClick={() => {
                                                dispatch(addPrice(pizza?.price));
                                                dispatch(addPizza(pizza));
                                            }}><span>+</span> Добавить</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Main