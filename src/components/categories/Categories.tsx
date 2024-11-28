import { Segmented, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { sectionsRef } from '../../hooks/SectionsRef';
import Sort from './sort/Sort';
import './StyleCategories.scss';
import { useFetchProductsQuery } from '../../store/api/api.pizza';
import { useAppSelector } from '../../hooks/hooks';

const Categories = () => {
    const [activeSegment, setActiveSegment] = useState('Пиццы');
    const { isLoading } = useFetchProductsQuery();
    const [isScrolling, setIsScrolling] = useState(false);
    const { products } = useAppSelector((state) => state.filter);
    const categories = Object.keys(products)

    const handleSegmentChange = (value: string) => {
        setIsScrolling(true); // Устанавливаем состояние скроллинга
        setActiveSegment(value);
        sectionsRef[value]?.scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => setIsScrolling(false), 500); // Снимаем флаг после завершения скролла
    };

    useEffect(() => {
        if (!categories) return; // Ждём загрузки данных

        const observer = new IntersectionObserver(
            (entries) => {
                if (isScrolling) return; // Если мы инициировали скролл, игнорируем IntersectionObserver
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSegment(entry.target.id);
                    }
                });
            },
            { threshold: 0.7 }
        );

        // Наблюдаем за секциями
        Object.values(sectionsRef).forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => {
            Object.values(sectionsRef).forEach((section) => {
                if (section) observer.unobserve(section);
            });
        };
    }, [categories, isScrolling]); // Завязываемся на `data`

    return (
        <div className="Categories">
            <div className="container">
                <div className="container__sticky">
                    <div className="item">
                        <ul>
                            {isLoading
                                ? (
                                    <Skeleton.Button active style={{ borderRadius: 20, width: 580, height: 56 }} />
                                )
                                : (
                                    Array.isArray(categories) && categories.length > 0
                                        ? (
                                            <Segmented
                                                options={categories}
                                                value={activeSegment}
                                                size="large"
                                                onChange={handleSegmentChange}
                                            />
                                        ) : (
                                            null
                                        )
                                )
                            }
                        </ul>
                    </div>
                    <div className="DropDown">
                        <Sort />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;
