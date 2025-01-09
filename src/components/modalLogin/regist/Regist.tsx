import { IoClose } from 'react-icons/io5';
import '../ModalLogin.scss';
import { useContext, useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { ContextFirebase } from '../../../main';
import { useAuthState } from 'react-firebase-hooks/auth';

interface RegistProps {
    onLogin: () => void; // Проп для переключения на окно входа
    closeModal: () => void; // Проп для закрытия модального окна
}

const Regist = ({ onLogin, closeModal }: RegistProps) => {
    const firebaseContext = useContext(ContextFirebase);

    // Проверяем, что контекст не null
    if (!firebaseContext) {
        console.error('Firebase context is not available');
        return null; // Можно вернуть null, если контекст не доступен
    }
    const { auth } = firebaseContext; // получаем объект auth из контекста

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
    })
    const [message, setMessage] = useState("")
    const [error, setError] = useState("");

    const handleTarget = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegist = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { email, password, confirmPassword, name } = formData;

        if (password !== confirmPassword) {
            setError("Пароли не совпадают")
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            await updateProfile(user, { displayName: name })

            await sendEmailVerification(user)
            setMessage("Письмо с подтверждением отправлено на вашу почту")
            setError("")
        } catch (e: any) {
            setMessage(e.message)
        }
    }

    const [user] = useAuthState(auth)
    console.log(user)

    return (
        <div className="modalRegist">
            <h2>Регистрация</h2>
            <div className="closeModal" onClick={closeModal}>
                <IoClose size={25} cursor={'pointer'} />
            </div>
            <form onSubmit={handleRegist}>
                <div>
                    <label htmlFor="email">E-Mail <span>*</span>:</label>
                    <input onChange={handleTarget} type="email" id="email" name="email" autoComplete="email" required />
                </div>
                <div>
                    <label htmlFor="name">Полное имя <span>*</span>:</label>
                    <input onChange={handleTarget} type="text" id="name" name="name" autoComplete="name" required />
                </div>
                <div>
                    <label htmlFor="password">Пароль <span>*</span>:</label>
                    <input onChange={handleTarget} type="password" id="password" name="password" autoComplete="new-password" required />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Подтвердите пароль <span>*</span>:</label>
                    <input onChange={handleTarget} type="password" id="confirmPassword" name="confirmPassword" autoComplete="new-password" required />
                </div>
                <button type="submit">Зарегистрироваться</button>
                {error && <p className="error">{error}</p>}
                {message && <p className="success">{message}</p>}
            </form>

            <div className="login">
                <button onClick={onLogin}>Войти</button>
            </div>
        </div>
    );
};

export default Regist;