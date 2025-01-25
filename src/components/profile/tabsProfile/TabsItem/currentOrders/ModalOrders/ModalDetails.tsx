import { IoClose } from 'react-icons/io5';
import { IProducts } from '../../../../../../types/Types';
import { IUserData } from '../CurrentOrders';
import './ModalDetails.scss';

type IModalProps = {
    setModalDetails: React.Dispatch<React.SetStateAction<boolean>>;
    userData: IUserData;
    modalOrders: IProducts[]; // Corrected type
};

const ModalDetails = ({ setModalDetails, modalOrders, userData }: IModalProps) => {
    return (
        <div className='modal_details'>
            <div className="modal_container">
                <div className="modal_header">
                    <div className='closeModalDetails' onClick={() => setModalDetails(false)}>
                        <IoClose size={30} cursor={'pointer'} />
                    </div>
                    <h3>Статус Заказа: <span>{userData.status}</span></h3>
                </div>
                <div className="modal_body">
                    {modalOrders?.map((item, index) => (
                        <div className="item" key={index}>
                            <div className="item_img">
                                <img src={item.images[0 | item.unit]} alt="img" />
                            </div>
                            <div className="item_details">
                                <div className="details_desc">
                                    <h2>{item.title}</h2>
                                    {item.type && <h3>{item?.type},{item?.size},{item.weightProduct}</h3>}
                                    {item.tasty && <span>{item.tasty.join(",")}</span>}
                                </div>
                            </div>
                            <div className="details_sum">
                                <span>
                                    {item.count}штук по
                                    <strong> {item.finalPrice}₽
                                    </strong>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="modal_footer">
                    <span>Имя: {userData.name}</span>
                    <span>Адрес: {userData.address}</span>
                    <span>E-Mail: {userData.email}</span>
                    {userData.extraInfo !== '' &&
                        <span>
                            Дополнительная информация: {userData.extraInfo}
                        </span>
                    }
                </div>
            </div>
        </div>
    );
};

export default ModalDetails;