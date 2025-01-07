import { IoClose } from 'react-icons/io5';
import '../ModalLogin.scss';

interface RegistProps {
    onLogin: () => void; // Проп для переключения на окно входа
    closeModal: () => void; // Проп для закрытия модального окна
}

const Regist = ({ onLogin, closeModal }: RegistProps) => {
    return (
        <div className="modalRegist">
            <h2>Регистрация</h2>
            <div className="closeModal" onClick={closeModal}>
                <IoClose size={25} cursor={'pointer'} />
            </div>
            <form>
                <div>
                    <label htmlFor="email">E-Mail <span>*</span>:</label>
                    <input type="email" id="email" name="email" autoComplete="email" required />
                </div>
                <div>
                    <label htmlFor="username">Полное имя <span>*</span>:</label>
                    <input type="text" id="username" name="username" autoComplete="name" required />
                </div>
                <div>
                    <label htmlFor="password">Пароль <span>*</span>:</label>
                    <input type="password" id="password" name="password" autoComplete="new-password" required />
                </div>
                <div>
                    <label htmlFor="repassword">Подтвердите пароль <span>*</span>:</label>
                    <input type="password" id="repassword" name="repassword" autoComplete="new-password" required />
                </div>
                <button type="submit">Зарегистрироваться</button>
            </form>

            <div className="login">
                <button onClick={onLogin}>Войти</button>
            </div>
        </div>
    );
};

export default Regist;