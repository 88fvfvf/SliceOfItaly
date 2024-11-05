import { Skeleton } from 'antd'
import './Skeleton.scss'

const SkeletonPizza = () => {
    return (
        <div className='SkeletonPizza'>
            <Skeleton.Node active />
            <Skeleton
                active
                title={true}
                paragraph={{ width: [300, 200], rows: 2 }}
                style={{ paddingTop: 30 }}
            />
            <div className="SkeletonButtons">
                <Skeleton.Button active />
                <Skeleton.Button active size='large' shape='round' className='addButton' />
            </div>
        </div>
    )
}

export default SkeletonPizza