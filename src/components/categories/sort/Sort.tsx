import { Dropdown, MenuProps, Space, Typography } from "antd";
import { SortIcon } from '../../../../public/svg/icone.tsx';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks.js';
import { ChangeSort } from "../../../store/toolkit/sort/Sort.Slice.js";
import { items } from './items.ts';

const Sort = () => {
    const sort = useAppSelector(state => state.SortSlice.categories)
    const dispatch = useAppDispatch()
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        dispatch(ChangeSort(e.key))
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
            <Typography.Link>
                <Space style={{display:'flex',alignItems: 'center',justifyContent:'center'}}>
                    <SortIcon />
                    <span>Сортировка:</span>
                    <span style={{ color: "#FE5F1E", borderBottom: "1px dotted red" }}>{sort}</span>
                </Space>
            </Typography.Link>
        </Dropdown>
    )
}

export default Sort