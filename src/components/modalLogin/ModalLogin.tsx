import React, { useContext, useState } from 'react';
import './ModalLogin.scss';
import { Divider } from 'antd';
import { IoClose } from "react-icons/io5";
import Regist from './regist/Regist';
import { ContextFirebase } from '../../main';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

interface ModalLoginProps {
    closeModal: () => void; // Проп для закрытия модального окна
}
const ModalLogin: React.FC<ModalLoginProps> = ({ closeModal }) => {
    const firebaseContext = useContext(ContextFirebase);
    // Проверяем, что контекст не равен null
    if (!firebaseContext) {
        throw new Error("Firebase context is not available.");
    }

    const { auth } = firebaseContext;
    const [isRegist, setIsRegist] = useState(false);

    const googleLogIn = async () => {
        try {
            // Создание провайдера Google
            const provider = new GoogleAuthProvider();

            // Ожидание ответа от окна для аутентификации через Google
            const result = await signInWithPopup(auth, provider);

            // Получение информации о пользователе
            const user = result.user;
            closeModal();
            console.log(user);
        } catch (error) {
            console.error('Error during Google sign-in:', error);
        }
    }

    return (
        <div className="modal">
            {isRegist ? (
                <>
                    <Regist onLogin={() => setIsRegist(false)} closeModal={() => closeModal()} />
                </>
            ) : (
                <>
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
                                <label htmlFor="email">E-Mail <span>*</span>:</label>
                                <input type="email" id="email" name="email" autoComplete="email" placeholder="sliceOfItaly@gmail.com" required />
                            </div>
                            <div>
                                <label htmlFor="password">Пароль <span>*</span>:</label>
                                <input type="password" id="password" name="password" autoComplete="current-password" placeholder="Введите пароль" required />
                            </div>
                            <button type="submit">Войти</button>
                        </form>
                        <Divider />
                        <div className="loginVia">
                            <p>Войти через</p>
                        </div>
                        <div className="google">
                            <button onClick={googleLogIn}>Войти через Google</button>
                        </div>
                        <div className="registration">
                            <button onClick={() => setIsRegist(true)}>Регистрация</button>
                        </div>
                    </div >
                </>
            )}
        </div >
    );
};

export default ModalLogin;