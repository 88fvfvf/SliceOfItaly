import { Input } from 'antd'
import { SearchIcon } from '../../../../public/svg/icone'

const SearchHeader = () => {
    return (
        <div>
            <Input
                type='search'
                placeholder='Поиск пиццы...'
                prefix={<SearchIcon />}
                style={
                    {
                        backgroundColor: 'rgb(243 244 246)',
                        width: '765px',
                        height: '44px',
                        borderRadius: '15px',
                        border: 'none'
                    }
                }
            />
        </div>
    )
}

export default SearchHeader