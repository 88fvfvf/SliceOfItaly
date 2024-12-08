import { IconEmpty } from "../../../../public/svg/icone"
import './Empty.scss'

const Empty = () => {
    return (
        <div className='Empty'>
            <IconEmpty />
            <h2>Пока тут пусто</h2>
            <strong>Добавьте пиццу. Или две!</strong>
        </div>
    )
}

export default Empty