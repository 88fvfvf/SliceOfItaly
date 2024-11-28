import { TbPizzaOff } from 'react-icons/tb'
import './NotFound.scss'

const NotFound = () => {
    return (
        <div className='NotFound'>
            <TbPizzaOff size={100} />
            <h2>Упсс.. пиццы не найдены</h2>
        </div>
    )
}

export default NotFound