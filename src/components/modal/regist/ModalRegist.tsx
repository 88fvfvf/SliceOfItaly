import { message } from 'antd';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { useFirebaseAuth } from '../../../hooks/useFirebaseAuth';
import '../ModalLogin.scss';

interface RegistProps {
    onLogin: () => void; // Проп для переключения на окно входа
    closeModal: () => void; // Проп для закрытия модального окна
}

const Regist = ({ onLogin, closeModal }: RegistProps) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
    });
    const [error, setError] = useState("");
    const [registPassShow, setRegistPassShow] = useState(false)
    const togglePasswordShow = () => {
        setRegistPassShow((prev) => !prev)
    }

    const {auth} = useFirebaseAuth()

    const handleTarget = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegist = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password, confirmPassword, name } = formData;

        if (password !== confirmPassword) {
            setError("Пароли не совпадают");
            message.error("Пароли не совпадают");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: name });
            await sendEmailVerification(user);
            const db = getFirestore();

            // Сохранение пользователя в Firestore
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                name: name,
                role: "user", // По умолчанию роль "user"
                createdAt: new Date().toISOString(),
            });

            setError("");
            message.success("Письмо с подтверждением отправлено на вашу почту");
            closeModal();
        } catch (e: any) {
            if (e.code === "auth/email-already-in-use") {
                setError("Этот E-Mail уже зарегистрирован.")
            } else {
                setError(e.message);
                message.error(e.message);
            }
        }
    };


    return (
        <div className="modalRegist">
            <h2>Регистрация</h2>
            <div className="closeModal" onClick={closeModal}>
                <IoClose size={25} cursor={'pointer'} />
            </div>
            <form onSubmit={handleRegist}>
                <div>
                    <label htmlFor="email">E-Mail <span>*</span>:</label>
                    <input
                        onChange={handleTarget}
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="name">Полное имя <span>*</span>:</label>
                    <input
                        onChange={handleTarget}
                        type="text"
                        id="name"
                        name="name"
                        autoComplete="name"
                        required
                    />
                </div>
                <div className='passwordControl'>
                    <label htmlFor="password">Пароль <span>*</span>:</label>
                    <input
                        onChange={handleTarget}
                        type={registPassShow ? 'text' : 'password'}
                        id="password"
                        name="password"
                        autoComplete="new-password"
                        required
                    />
                    <div className='registPassShow' onClick={togglePasswordShow}>
                        {registPassShow ? (
                            <LuEye cursor={'pointer'} size={20} />
                        ) : (
                            <LuEyeClosed cursor={'pointer'} size={20} />
                        )
                        }
                    </div>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Подтвердите пароль <span>*</span>:</label>
                    <input
                        onChange={handleTarget}
                        type={registPassShow ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        autoComplete="new-password"
                        required
                    />
                </div>
                <button type="submit">Зарегистрироваться</button>
                {error && <p className='errorRegist' style={{ color: '#FE5F1E' }}>{error}</p>}
            </form>

            <div className="login">
                <button onClick={onLogin}>Войти</button>
            </div>
        </div>
    );
};

export default Regist;
