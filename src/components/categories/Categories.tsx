import { Segmented } from 'antd';
import Sort from './sort/Sort';
import './StyleCategories.scss';

const Categories = () => {
    return (
        <div className='Categories'>
            <div className="container">
                <div className="container__sticky">
                    <div className="item">
                        <ul>
                            <Segmented
                                options={['Пиццы', 'Завтрак', 'Закуски', 'Коктейли', 'Напитки', 'Десерты']}
                                size='large'
                                onChange={(value) => {
                                    console.log(value);

                                }}
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
