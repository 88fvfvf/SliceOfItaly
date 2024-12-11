import { NotFoundIcon } from "../../../public/svg/icone"
import { BsArrowLeftShort } from "react-icons/bs";
import './NotFound.css'
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";

const NotFound = () => {
    const clickRefresh = () => {
        location.reload()
    }
    return (
        <div className="container">
            <Header />
            <div className="found">
                <div className="found_recomend">
                    <div className="found_info">
                        <h1>Страница не найдена</h1>
                        <p>
                            Проверьте корректность введённого адреса или повторите попытку.
                        </p>
                    </div>
                    <div className="found_buttons">
                        <Link to={'/'}>
                            <button>
                                <BsArrowLeftShort color="#FE5F00" size={25} />
                                На главную
                            </button>
                        </Link>
                        <button onClick={clickRefresh}>Обновить</button>
                    </div>
                </div>
                <div className="found_icon">
                    <NotFoundIcon />
                </div>
            </div>
        </div>
    )
}

export default NotFound