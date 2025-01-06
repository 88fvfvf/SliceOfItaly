import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import './NotFound.css';


interface NotFoundProps {
    title: string
    paragraph: string
    SvgIcon: React.ComponentType
}

const NotFound = ({ title, paragraph, SvgIcon }: NotFoundProps) => {
    const clickRefresh = () => {
        location.reload()
    }
    return (
        <div className="container">
            <Header />
            <div className="found">
                <div className="found_recomend">
                    <div className="found_info">
                        <h1>{title}</h1>
                        <p>
                            {paragraph}
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
                    <SvgIcon />
                </div>
            </div>
        </div>
    )
}

export default NotFound