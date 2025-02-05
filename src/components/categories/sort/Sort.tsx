import { Dropdown, MenuProps, Space, Typography } from "antd";
import { useState } from "react";
import { TiFilter } from "react-icons/ti";
import { useDispatch } from 'react-redux';
import { sortProducts } from '../../../store/filter/filter.slice.ts';
import { items } from './items.ts';



const Sort = () => {
    const [sort, setSort] = useState('');
    const dispatch = useDispatch();

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        setSort(e.key);
        dispatch(sortProducts(e.key));
    };

    return (
        <Dropdown
            menu={{
                items,
                selectable: true,
                onClick: handleMenuClick,
            }}
        >
            <Typography>
                <Space style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="icon_sort">
                        <TiFilter size={22} />
                    </div>
                    <span>Сортировка</span>
                    <span style={{ color: "#FE5F1E", borderBottom: "1px dotted red" }}>{sort}</span>
                </Space>
            </Typography>
        </Dropdown>
    )
}

export default Sort