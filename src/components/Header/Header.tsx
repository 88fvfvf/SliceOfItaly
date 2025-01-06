import HeaderLeft from './Left/HeaderLeft'
import HeaderRight from './Right/HeaderRight'
import SearchHeader from './searchHeader/SearchHeader'
import './HeadeStyler.css'
import Login from './login/Login'

const Header = () => {
    return (
        <header style={{ paddingInline: '20px' }}>
            <div className="container">
                <div className="allheader">
                    <HeaderLeft />
                    <SearchHeader />
                    <Login />
                    <HeaderRight />
                </div>
            </div>
        </header >
    )
}

export default Header