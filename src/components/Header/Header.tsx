import HeaderLeft from './Left/HeaderLeft'
import HeaderRight from './Right/HeaderRight'
import SearchHeader from './searchHeader/SearchHeader'
import './HeadeStyler.css'

const Header = () => {
    return (
        <header>
            <div className="container">
                <div className="allheader">
                    <HeaderLeft />
                    <SearchHeader />
                    <HeaderRight />
                </div>
            </div>
        </header >
    )
}

export default Header