import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { useFetchCategoriesQuery, useFetchProductsQuery } from '../../store/api/api.pizza';
import Menu from './menu/Menu';
import Filtering from './section/filtering';
import './StyleMain.scss';
import { sectionsRef } from '../../hooks/SectionsRef';

const Main = () => {
    const { data: options } = useFetchCategoriesQuery();
    const { products } = useAppSelector((state) => state.filter);
    useFetchProductsQuery(); // Запуск запроса
    const arrays = Object.values(products);

    useEffect(() => {
        const observer = new IntersectionObserver(() => { }, { threshold: 0.7 });

        // Обновляем рефы для секций
        Object.values(sectionsRef).forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => {
            Object.values(sectionsRef).forEach((section) => {
                if (section) observer.unobserve(section);
            });
        };
    }, [options]);

    return (
        <main>
            <div className="container">
                <div className="filter__main_block">
                    <Filtering />
                    <div className="main_block">
                        {options &&
                            arrays.map((array, index) => (
                                <div key={index}>
                                    <h1>{options[index]?.categories || 'Без категории'}</h1>
                                    <div
                                        id={options[index]?.categories}
                                        ref={(el) => { sectionsRef[options[index]?.categories] = el }}
                                    >
                                        <Menu data={array} key={index} />
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Main;
