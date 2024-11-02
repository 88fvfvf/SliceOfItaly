import HeaderLeft from './Left/HeaderLeft'
import HeaderRight from './Right/HeaderRight'

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
            <HeaderRight />
        </header >
    )
}

export default Header