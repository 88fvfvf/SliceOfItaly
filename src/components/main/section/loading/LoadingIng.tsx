import { Skeleton } from 'antd'

const LoadingIng = () => {
    const loading = Array.from({ length: 6 })
    return (
        <>
            {loading.map((_, index) => (
                <div style={{
                    display: 'flex',
                    width: 240,
                    gap: 10
                }}
                    key={index}
                >
                    <Skeleton.Avatar style={{ width: "35px", borderRadius: 5 }} shape='square' active />
                    <Skeleton.Button style={{ width: "190px" }} active />
                </div>
            ))}
        </>
    )
}

export default LoadingIng