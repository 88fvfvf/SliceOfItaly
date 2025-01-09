import { message } from 'antd';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { useContext, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { ContextFirebase } from '../../../main';
import '../ModalLogin.scss';

interface RegistProps {
    onLogin: () => void; // Проп для переключения на окно входа
    closeModal: () => void; // Проп для закрытия модального окна
}

const Regist = ({ onLogin, closeModal }: RegistProps) => {
    const firebaseContext = useContext(ContextFirebase);

    if (!firebaseContext) {
        console.error('Firebase context is not available');
        return null;
    }
    const { auth } = firebaseContext;

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
    });

    const [error, setError] = useState("");

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

            setError("");
            message.success("Письмо с подтверждением отправлено на вашу почту");
            closeModal();
        } catch (e: any) {
            setError(e.message);
            message.error(e.message);
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
                <div>
                    <label htmlFor="password">Пароль <span>*</span>:</label>
                    <input
                        onChange={handleTarget}
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="new-password"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Подтвердите пароль <span>*</span>:</label>
                    <input
                        onChange={handleTarget}
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        autoComplete="new-password"
                        required
                    />
                </div>
                <button type="submit">Зарегистрироваться</button>
                {error && <p className="error">{error}</p>}
            </form>

            <div className="login">
                <button onClick={onLogin}>Войти</button>
            </div>
        </div>
    );
};

export default Regist;
