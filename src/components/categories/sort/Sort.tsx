import { Dropdown, MenuProps, Space, Typography } from "antd";
import { SortIcon } from '../../../../public/svg/icone.tsx';
import { items } from './items.ts';
import { useState } from "react";

const Sort = () => {
    const [sort, setSort] = useState('популярности')
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        setSort(e.key);
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
                <Space style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <SortIcon />
                    <span>Сортировка:</span>
                    <span style={{ color: "#FE5F1E", borderBottom: "1px dotted red" }}>{sort}</span>
                </Space>
            </Typography.Link>
        </Dropdown>
    )
}

export default Sort