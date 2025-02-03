import './Address.scss'

interface IAddress {
    userData: {
        address: string
        extraInfo: string
    }
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Address = ({ userData, handleInputChange }: IAddress) => {
    return (
        <div className='address'>
            <div className="address_header">
                <h3>3. Адрес доставки</h3>
            </div>
            <div className="address_info">
                <div className="info_address">
                    <label htmlFor="address">Аддрес доставки</label>
                    <input
                        name='address'
                        placeholder='Amir Temur 33a'
                        value={userData.address}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="info_extra">
                    <label htmlFor="extra">Дополнительная информация</label>
                    <input
                        name='extraInfo'
                        placeholder="Укажите тут дополнительную информацию"
                        value={userData.extraInfo}
                        onChange={handleInputChange}
                        maxLength={30}
                    />
                </div>
            </div>
        </div>
    )
}

export default Address