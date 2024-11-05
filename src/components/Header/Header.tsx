import HeaderLeft from './Left/HeaderLeft'
import HeaderRight from './Right/HeaderRight'
import SearchHeader from './searchHeader/SearchHeader'

const Header = () => {
    return (
        <header style={{ borderBottom: '1px solid #EDEDED' }}>
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBlock: '10px'
            }}>
                <HeaderLeft />
                <SearchHeader />
                <HeaderRight />
            </div>
        </header >
    )
}

export default Header