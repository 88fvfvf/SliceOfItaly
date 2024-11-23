import { Skeleton } from 'antd'
import './Skeleton.scss'

const SkeletonPizza = () => {
    const skeletons = Array.from({ length: 6 });
    return (
        <div className="SkeletonBlock">
            <Skeleton.Input style={{ width: 60, height: 40 }} active />
            <div className='SkeletonPizza'>
                {skeletons.map((_, index) => (
                    <div key={index}>
                        <Skeleton.Node active />
                        <Skeleton
                            active
                            title={true}
                            paragraph={{ width: [250, 200], rows: 2 }}
                            style={{ paddingTop: 30 }}
                        />
                        <div className="SkeletonButtons">
                            <Skeleton.Button active />
                            <Skeleton.Button active size='large' shape='round' className='addButton' />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SkeletonPizza