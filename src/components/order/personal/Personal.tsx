import { User } from 'firebase/auth'
import './Personal.scss'

interface IPersonal {
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    user: User | null
}

const Personal = ({ handleInputChange, user }: IPersonal) => {
    return (
        <div className="personal">
            <div className="personal_header">
                <h3>2. Персональная информация</h3>
            </div>
            <div className="personal_form">
                <div className="form_name">
                    <label htmlFor="name">Имя получателя</label>
                    <input
                        name='name'
                        placeholder="Имя получателя"
                        value={user?.displayName || ''}
                        onChange={handleInputChange}
                        disabled
                        required
                    />
                </div>
                <div className="form_email">
                    <label htmlFor="email">E-Mail получателя</label>
                    <input
                        name='email'
                        placeholder="E-Mail получателя"
                        value={user?.email || ''}
                        disabled
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>
        </div>
    )
}

export default Personal