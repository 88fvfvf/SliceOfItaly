import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { sectionsRef } from '../../hooks/SectionsRef';
import { useFetchProductsQuery } from '../../store/api/api.pizza';
import Menu from './menu/Menu';
import NotPizzas from './notPizzas/NotPizzas';
import Filtering from './section/filtering';
import SkeletonPizza from './skeleton/SkeletonPizza';
import './StyleMain.scss';

const Main = () => {
    const { products } = useAppSelector((state) => state.filter);
    const { isLoading } = useFetchProductsQuery(); // Запуск запросаs
    const arrays = Object.values(products)
    const categories = Object.keys(products)

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
    }, [categories]);
    
    return (
        <main>
            <div className="container">
                <div className="filter__main_block">
                    <Filtering />
                    {
                        isLoading
                            ? (
                                <SkeletonPizza />
                            ) : (
                                <div className="main_block">
                                    {Array.isArray(arrays) && arrays.length > 0 ? (
                                        arrays.map((array, index) => (
                                            <div key={index}>
                                                <h1>{categories[index] || 'Без категории'}</h1>
                                                <div
                                                    id={categories[index]}
                                                    ref={(el) => { sectionsRef[categories[index]] = el }}
                                                >
                                                    <Menu data={array} key={index} />
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <NotPizzas />
                                    )}
                                </div>
                            )
                    }
                </div>
            </div>
        </main>
    );
};

export default Main;
