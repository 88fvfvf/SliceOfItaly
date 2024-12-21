import { Spin } from "antd"
import './LoadSpin.scss'

const LoadSpin = () => {
    return (
        <div className="loadSpin">
            <Spin size="large" />
        </div>
    )
}

export default LoadSpin