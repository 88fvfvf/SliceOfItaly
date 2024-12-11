import { TbPizzaOff } from 'react-icons/tb'
import './NotPizzas.scss'

const NotPizzas = () => {
    return (
        <div className='NotPizzas'>
            <TbPizzaOff size={100} />
            <h2>Упсс.. пиццы не найдены</h2>
        </div>
    )
}

export default NotPizzas