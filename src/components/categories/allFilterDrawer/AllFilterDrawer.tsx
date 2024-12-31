import { Drawer } from 'antd';
import { useState } from 'react';
import { LuSettings2 } from 'react-icons/lu';
import Filtering from '../../main/section/filtering';

const AllFilterDrawer = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation(); // Останавливаем всплытие события
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    console.log(open);

    return (
        <div className="allFilter">
            <div onClick={showDrawer}>
                <LuSettings2 size={30} />
            </div>
            <Drawer
                onClose={onClose}
                open={open}
                width={'100%'}
                id='filterDrawer'
            >
                <Filtering />
            </Drawer>
        </div>
    );
};

export default AllFilterDrawer;
