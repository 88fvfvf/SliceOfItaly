import HeaderLeft from './Left/HeaderLeft'
import HeaderRight from './Right/HeaderRight'
import SearchHeader from './searchHeader/SearchHeader'

const Header = () => {
    return (
        <header
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '45px',
            }}>
            <HeaderLeft />
            <SearchHeader />
            <HeaderRight />
        </header >
    )
}

export default Header