import { Pagination, Rate } from 'antd'
import { useState } from 'react'
import { useAppDispatch } from '../../hooks/hooks'
import { useFetchPizzaQuery } from '../../store/api/api.pizza'
import { addPizza, addPrice } from '../../store/toolkit/pizzaBasket/pizza.slice'
import './StyleMain.scss'
import SkeletonPizza from './skeleton/SkeletonPizza'
import Filtering from './section/filtering'

const Main = () => {
    const [page, setPage] = useState<number>(1)
    const { data, isLoading } = useFetchPizzaQuery(page)
    const dispatch = useAppDispatch()

    const handleClick = (page: number) => {
        setPage(page)
    }

    return (
        <main>
            <Filtering />
            <div className="main">
                <div className="main_block">
                    {data?.map(pizza => (
                        isLoading ? (
                            <SkeletonPizza key={pizza.id} />
                        ) : (
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
                        )
                    ))}
                </div>
                <Pagination
                    defaultCurrent={1}
                    total={10}
                    pageSize={6}
                    onChange={handleClick}
                    style={{ paddingTop: "30px" }}
                />
            </div>
        </main>
    )
}

export default Main