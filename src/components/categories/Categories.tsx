import { Segmented } from 'antd';
import Sort from './sort/Sort';
import './StyleCategories.scss';

const Categories = () => {
    return (
        <div className='Categories'>
            <div className="item">
                <h1>Все пиццы</h1>
                <ul>
                    <Segmented
                        options={['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Сырные']}
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
    );
};

export default Categories;
