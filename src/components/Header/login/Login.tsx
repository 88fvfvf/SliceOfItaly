import { useContext, useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsFillPersonFill } from "react-icons/bs";
import { TbLogin2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { ContextFirebase } from "../../../main";
import ModalLogin from "../../modalLogin/ModalLogin";
import "./Login.scss";

const Login = () => {
    const firebaseContext = useContext(ContextFirebase);

    // Проверяем, что контекст не null
    if (!firebaseContext) {
        console.error('Firebase context is not available');
        return null; // Можно вернуть null, если контекст не доступен
    }
    const { auth } = firebaseContext; // получаем объект auth из контекста
    const [user, loading] = useAuthState(auth); // хук, который возвращает пользователя, загрузку и ошибку
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (showModal) {
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = `${scrollBarWidth}px`
        } else {
            document.body.style.overflow = ''
            document.body.style.paddingRight = "";
        }

        return () => {
            document.body.style.overflow = ''
            document.body.style.paddingRight = "";
        }
    }, [showModal])

    return (
        <div className="log__container">
            {loading ? (
                <div className="loading">
                    <span>Загрузка...</span>
                </div>
            ) : (
                user ? (
                    <Link to="/profile" className="log__container__login">
                        <BsFillPersonFill size={20} />
                        <p>Профиль</p>
                    </Link>
                ) : (
                    <div className="log__container__login" onClick={() => setShowModal(true)}>
                        <TbLogin2 size={20} />
                        <p>Войти</p>
                    </div>
                )
            )}
            {showModal && <ModalLogin closeModal={() => setShowModal(false)} />}
        </div>
    )
}

export default Login