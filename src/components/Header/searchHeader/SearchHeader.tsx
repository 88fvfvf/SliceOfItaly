import { Input } from 'antd';
import { SearchIcon } from '../../../../public/svg/icone';
import './Search.scss';
import { useFetchProductBySearchQuery } from '../../../store/api/api.pizza';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SearchHeader = () => {
    const [search, setSearch] = useState<string>('');
    const { data } = useFetchProductBySearchQuery(search);

    // Дебаунс для задержки поиска
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setSearch(search);
        }, 1000); // Задержка в 1 секунду

        return () => clearTimeout(timeoutId);
    }, [search]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <div className='Search'>
            <Input
                type='search'
                placeholder='Поиск пиццы...'
                onChange={handleSearchChange}
                prefix={<SearchIcon />}
            />
            {data && data.length > 0 && (
                <div className="search_bar">
                    {data.map((bar) => (
                        <Link to={`/product/${bar.title}`} onClick={() => setSearch('')}>
                            <div className="bar_item" key={bar.id}>
                                <img src={bar.images[0]} alt="No image" />
                                <div className="item_title">
                                    <p>{bar.title}</p>
                                </div>
                                <div className="item_price">
                                    <p>{bar.prices[0]} ₽</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchHeader;
