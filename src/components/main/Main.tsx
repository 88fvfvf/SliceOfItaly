import {
    useFetchBreakFastQuery,
    useFetchCocktailsQuery,
    useFetchDessertsQuery,
    useFetchDrinksQuery,
    useFetchPizzaQuery,
    useFetchSnacksQuery
} from '../../store/api/api.pizza';
import './StyleMain.scss';
import Menu from './menu/Menu';
import Filtering from './section/filtering';
import SkeletonPizza from './skeleton/SkeletonPizza';

const Main = () => {
    const sections = [
        { title: 'Пиццы', data: useFetchPizzaQuery(undefined), className: 'main__pizza' },
        { title: 'Завтраки', data: useFetchBreakFastQuery(undefined), className: 'main__breakfast' },
        { title: 'Закуски', data: useFetchSnacksQuery(undefined), className: 'main__snacks' },
        { title: 'Коктейли', data: useFetchCocktailsQuery(undefined), className: 'main__cocktails' },
        { title: 'Напитки', data: useFetchDrinksQuery(undefined), className: 'main__drinks' },
        { title: 'Десерты', data: useFetchDessertsQuery(undefined), className: 'main__desserts' },
    ];

    return (
        <main>
            <div className="container">
                <div className="filter__main_block">
                    <Filtering />
                    <div className="main_block">
                        {sections.map(({ title, data, className }) => (
                            <div key={title}>
                                <h1>{data.isLoading ? '' : title}</h1>
                                <div className={className}>
                                    {data.isLoading ? (
                                        <SkeletonPizza />
                                    ) : (
                                        data.data?.map(item => <Menu data={item} key={item.id} />)
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Main