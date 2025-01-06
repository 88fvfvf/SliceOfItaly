import { BsFillPersonFill } from "react-icons/bs";
import { TbLogin2 } from "react-icons/tb";
import "./Login.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalLogin from "../../modalLogin/ModalLogin";

const Login = () => {
    const user = false
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
            {user ? (
                <Link to="/profile" className="log__container__login">
                    <BsFillPersonFill size={20} />
                    <p>Профиль</p>
                </Link>
            ) : (
                <div className="log__container__login" onClick={() => setShowModal(true)}>
                    <TbLogin2 size={20} />
                    <p>Войти</p>
                </div>
            )}
            {showModal && <ModalLogin closeModal={() => setShowModal(false)} />}
        </div>
    )
}

export default Login