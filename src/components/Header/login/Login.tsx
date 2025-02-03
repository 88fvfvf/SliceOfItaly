import { useEffect, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { TbLogin2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useFirebaseAuth } from "../../../hooks/useFirebaseAuth";
import ModalLogin from "../../modal/ModalLogin";
import "./Login.scss";
import { useNotifications } from "../../../hooks/useNotifications";
import { Badge } from "antd";

const Login = () => {
    const { user, loading } = useFirebaseAuth()
    const [showModal, setShowModal] = useState(false)
    const { user: userFirebase } = useFirebaseAuth();
    const notifications = useNotifications(userFirebase?.uid || "");

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
                    user.emailVerified ? (
                        // Если пользователь подтвердил почту
                        <Badge count={notifications.length} color="#FE5F1E">
                            <Link viewTransition to="/profile" className="log__container__login">
                                <BsFillPersonFill size={20} />
                                <p>Профиль</p>
                            </Link>
                        </Badge>

                    ) : (
                        // Если пользователь не подтвердил почту
                        <Link to="/profile" className="log__container__login">
                            <div className="log__container__warning">
                                <p>Подтвердите почту</p>
                            </div>
                        </Link>
                    )
                ) : (
                    // Если пользователь не авторизован
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