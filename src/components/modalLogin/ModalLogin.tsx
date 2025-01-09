import { Divider } from 'antd';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { IoClose } from "react-icons/io5";
import { ContextFirebase } from '../../main';
import './ModalLogin.scss';
import Regist from './regist/Regist';

interface ModalLoginProps {
    closeModal: () => void; // Проп для закрытия модального окна
}
const ModalLogin: React.FC<ModalLoginProps> = ({ closeModal }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");

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
        } catch (error) {
            console.error('Error during Google sign-in:', error);
        }
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password); // Попытка входа в систему
            const user = userCredential.user; // Получение информации о пользователе

            if (!user.emailVerified) {
                setLoginMessage("Email не подтверждён. Проверьте почту.");
                return;
            }
            closeModal()
        } catch {
            setLoginMessage("E-Mail или Пароль не верный");
        }
    }

    return (
        <div>
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
                            <form onSubmit={handleLogin}>
                                <div>
                                    <label htmlFor="email">E-Mail <span>*</span>:</label>
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        id="email"
                                        name="email"
                                        autoComplete="email"
                                        placeholder="sliceOfItaly@gmail.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password">Пароль <span>*</span>:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="current-password"
                                        placeholder="Введите пароль"
                                        required
                                    />
                                </div>
                                <button type="submit">Войти</button>
                                <p style={{ color: '#FE5F1E' }}>{loginMessage}</p>
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
        </div>
    );
};

export default ModalLogin;