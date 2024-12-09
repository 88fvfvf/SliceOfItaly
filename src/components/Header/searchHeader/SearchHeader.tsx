import { Input } from 'antd';
import { SearchIcon } from '../../../../public/svg/icone';
import './Search.scss';
import { useFetchProductBySearchQuery } from '../../../store/api/api.pizza';
import { useState, useEffect } from 'react';

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
                style={{
                    backgroundColor: 'rgb(243 244 246)',
                    width: '765px',
                    height: '44px',
                    borderRadius: '15px',
                    border: 'none'
                }}
            />
            {data && data.length > 0 && (
                <div className="search_bar">
                    {data.map((bar) => (
                        <div className="bar_item" key={bar.id}>
                            <img src={bar.images[0]} alt="No image" />
                            <div className="item_title">
                                <p>{bar.title}</p>
                            </div>
                            <div className="item_price">
                                <p>{bar.prices[0]} ₽</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchHeader;
