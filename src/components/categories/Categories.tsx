import { Segmented } from 'antd';
import Sort from './sort/Sort';
import './StyleCategories.scss';
import { useEffect, useState } from 'react';
import { sectionsRef } from '../../hooks/SectionsRef';

const Categories = () => {
    const [activeSegment, setActiveSegment] = useState('Пиццы');

    const handleSegmentChange = (value: string) => {
        setActiveSegment(value);
        sectionsRef[value]?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSegment(entry.target.id);
                }
            });
        }, { threshold: 0.7 });

        // Обновляем рефы для секций
        Object.values(sectionsRef).forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => {
            Object.values(sectionsRef).forEach((section) => {
                if (section) observer.unobserve(section);
            });
        };
    }, []);

    return (
        <div className='Categories'>
            <div className="container">
                <div className="container__sticky">
                    <div className="item">
                        <ul>
                            <Segmented
                                options={['Пиццы', 'Завтраки', 'Закуски', 'Коктейли', 'Напитки', 'Десерты']}
                                value={activeSegment}
                                size='large'
                                onChange={handleSegmentChange}
                            />
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
