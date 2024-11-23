import { Segmented, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { sectionsRef } from '../../hooks/SectionsRef';
import Sort from './sort/Sort';
import './StyleCategories.scss';
import { useFetchCategoriesQuery } from '../../store/api/api.pizza';

interface IOptions {
    label: string; // для отображения текста
    value: string; // уникальное значение
}

const Categories = () => {
    const [activeSegment, setActiveSegment] = useState('Пиццы');
    const { data, isLoading } = useFetchCategoriesQuery();
    const handleSegmentChange = (value: string) => {
        setActiveSegment(value);
        sectionsRef[value]?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (!data) return; // Ждём загрузки данных

        const observer = new IntersectionObserver(
            (entries) => {
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
    }, [data]); // Завязываемся на `data`


    const options = data
        ? data.map((item): IOptions => ({
            label: item.categories, // Отображаемое имя
            value: item.categories, // Уникальное значение
        }))
        : [];


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
                                    <Segmented
                                        options={options}
                                        value={activeSegment}
                                        size="large"
                                        onChange={handleSegmentChange}
                                    />
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
