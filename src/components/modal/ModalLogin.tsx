import React, { useContext, useState } from 'react';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { IoClose } from "react-icons/io5";
import { ContextFirebase } from '../../main';
import { Divider, message } from 'antd';
import './ModalLogin.scss';
import Regist from './regist/ModalRegist';
import { User } from 'firebase/auth';
import { LuEyeClosed, LuEye } from "react-icons/lu";

interface ModalLoginProps {
    closeModal: () => void;
}

const ModalLogin: React.FC<ModalLoginProps> = ({ closeModal }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    const [user, setUser] = useState<User | null>(null); // Состояние для хранения данных о пользователе
    const [showPassword, setShowPassword] = useState(false)

    const firebaseContext = useContext(ContextFirebase);
    if (!firebaseContext) {
        throw new Error("Firebase context is not available.");
    }

    const { auth } = firebaseContext;
    const [isRegist, setIsRegist] = useState(false);

    const googleLogIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setUser(user); // Сохраняем данные пользователя
            message.success('Вы успешно вошли через Google!');
            closeModal();
        } catch (error) {
            console.error('Error during Google sign-in:', error);
        }
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            if (!user.emailVerified) {
                setLoginMessage("Email не подтверждён. Проверьте почту.");
                return;
            }
            setUser(user); // Сохраняем данные пользователя
            message.success(`Вы вошли как ${user.displayName}`);
            closeModal();
        } catch {
            setLoginMessage("E-Mail или Пароль не верный");
        }
    };

    const togglePasswordShow = () => {
        setShowPassword((prev) => !prev)
    }

    return (
        <div>
            <div className="modal">
                {isRegist ? (
                    <Regist onLogin={() => setIsRegist(false)} closeModal={closeModal} />
                ) : (
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
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    placeholder="Введите пароль"
                                    required
                                />
                                <div className='showPasswordIcon' onClick={togglePasswordShow}>
                                    {showPassword ? (
                                        <LuEye cursor={'pointer'} size={20} />
                                    ) : (
                                        <LuEyeClosed cursor={'pointer'} size={20} />
                                    )
                                    }
                                </div>
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
                        {user && (
                            <div className="userInfo">
                                <p>Добро пожаловать, {user.displayName || 'Пользователь'}</p>
                                <p>Email: {user.email}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModalLogin;
