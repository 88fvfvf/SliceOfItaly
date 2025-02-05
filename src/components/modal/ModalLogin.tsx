import { Divider, message } from 'antd';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, User } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
import './ModalLogin.scss';
import Regist from './regist/ModalRegist';
import { FcGoogle } from "react-icons/fc";


interface ModalLoginProps {
    closeModal: () => void;
}

const ModalLogin: React.FC<ModalLoginProps> = ({ closeModal }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    const [user, setUser] = useState<User | null>(null); // Состояние для хранения данных о пользователе
    const [showPassword, setShowPassword] = useState(false)
    const { auth } = useFirebaseAuth()
    const [isRegist, setIsRegist] = useState(false);
    const db = getFirestore();


    const googleLogIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Проверяем, есть ли пользователь в Firestore
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                // Создаем новую запись, если пользователь не найден
                await setDoc(userDocRef, {
                    email: user.email,
                    name: user.displayName || "Google User",
                    role: "user", // По умолчанию роль "user"
                    createdAt: new Date().toISOString(),
                });
            }

            message.success("Вы успешно вошли через Google!");
            closeModal();
        } catch (error: any) {
            console.error("Ошибка при входе через Google:", error);
            message.error("Ошибка входа через Google: " + error.message);
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

            // Проверяем роль пользователя в Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                if (userData.role === "admin") {
                    message.success("Вы вошли как администратор!");
                } else {
                    message.success("Вы успешно вошли.");
                }
            } else {
                message.error("Ошибка: пользователь не найден в базе данных.");
            }

            setUser(user); // Сохраняем данные пользователя
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
                            <button onClick={googleLogIn}>
                                <FcGoogle size={22} />Google
                            </button>
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
