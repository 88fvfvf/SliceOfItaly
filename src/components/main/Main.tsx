import { useEffect } from 'react';
import useSectionsData from '../../hooks/Sections';
import { sectionsRef } from '../../hooks/SectionsRef';
import Menu from './menu/Menu';
import Filtering from './section/filtering';
import './StyleMain.scss';

const Main = () => {
    const sections = useSectionsData();

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
    }, [sections]);

    return (
        <main>
            <div className="container">
                <div className="filter__main_block">
                    <Filtering />
                    <div className="main_block">
                        {sections.map(({ title, data, className }) => (
                            <div key={title}>
                                <h1>
                                    {data.isLoading ? '' : title}
                                </h1>
                                <div className={className} id={title} ref={(el) => { sectionsRef[title] = el; }}>
                                    {data.data?.map(item => <Menu data={item} key={item.id} />)}
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