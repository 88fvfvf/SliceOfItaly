import HeaderLeft from '../../../components/Header/Left/HeaderLeft';
import Login from '../../../components/Header/login/Login';
import './OrderHeader.scss'

const OrderHeader = () => {
    return (
        <div className="OrderHeader">
            <HeaderLeft />
            <Login />
        </div>
    )
}

export default OrderHeader