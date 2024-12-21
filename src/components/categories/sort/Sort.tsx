import { Dropdown, MenuProps, Space, Typography } from "antd";
import { SortIcon } from '../../../../public/svg/icone.tsx';
import { items } from './items.ts';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { sortProducts } from '../../../store/filter/filter.slice.ts';

const Sort = () => {
    const [sort, setSort] = useState('популярности');
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
                defaultSelectedKeys: ['3'],
                onClick: handleMenuClick,
            }}
        >
            <Typography>
                <Space style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <SortIcon />
                    <span>Сортировка:</span>
                    <span style={{ color: "#FE5F1E", borderBottom: "1px dotted red" }}>{sort}</span>
                </Space>
            </Typography>
        </Dropdown>
    )
}

export default Sort