import React from 'react';
import './ModalLogin.scss';
import { Divider } from 'antd';
import { IoClose } from "react-icons/io5";

interface ModalLoginProps {
    closeModal: () => void; // Проп для закрытия модального окна
}
const ModalLogin: React.FC<ModalLoginProps> = ({ closeModal }) => {
    return (
        <div className="modal">
            <div className="modalLogin">
                <div className="closeModal" onClick={closeModal}>
                    <IoClose size={25} cursor={'pointer'} />
                </div>
                <div className="modalTitle">
                    <h2>Вход в аккаунт</h2>
                    <p>Введите свою почту, чтобы войти в <br /> свой аккаунт</p>
                </div>
                <form>
                    <div>
                        <label htmlFor="username">E-Mail <span>*</span>:</label>
                        <input type="email" id="email" name="email" placeholder='sliceOfItaly@gmail.com' />
                    </div>
                    <div>
                        <label htmlFor="password">Пароль <span>*</span>:</label>
                        <input type="password" id="password" name="password" placeholder='Введите пароль' />
                    </div>
                    <button type="submit">Войти</button>
                </form>
                <Divider />
                <div className="loginVia">
                    <p>Войти через</p>
                </div>
                <div className="google">
                    <button>Войти через Google</button>
                </div>
                <div className="registration">
                    <button>Регистрация</button>
                </div>
            </div>
        </div>
    );
};

export default ModalLogin;