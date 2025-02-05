import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { useFirebaseAuth } from "../../../../../hooks/useFirebaseAuth";
import "./PersonalData.scss";

const PersonalData = () => {
    const { user, auth } = useFirebaseAuth()
    const [newDisplayName, setNewDisplayName] = useState('');
    const [changeState, setChangeState] = useState(false)
    const [cardNumber, setCardNumber] = useState("")
    const [expiry, setExpiry] = useState("");

    const handleChangeDisplayName = async () => {
        if (user && newDisplayName) {
            try {
                await updateProfile(user, {
                    displayName: newDisplayName,
                });
                setChangeState(false)
            } catch (err) {
                alert('Error updating display name');
            }
        } else {
            alert('Please enter a new display name');
        }
    };

    const formatCardNumber = (value: string) => {
        // Удаляем все нецифровые символы
        const digitsOnly = value.replace(/\D/g, "");
        // Ограничиваем длину до 16 цифр
        const limitedDigits = digitsOnly.slice(0, 16)
        // Добавляем пробелы после каждых 4 цифр
        return limitedDigits.replace(/(\d{4})/g, "$1 ").trim()
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatCardNumber(event.target.value);
        setCardNumber(formattedValue);
    };

    const formatExpiry = (value: string) => {
        const digitsOnly = value.replace(/\D/g, "").slice(0, 4);
        if (digitsOnly.length > 2) {
            return `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}`;
        }
        return digitsOnly;
    };


    return (
        <div className="PersonalData">
            <h1>Личные данные</h1>
            <div className="allInputData">
                <div className="personal_input">
                    <div>
                        <label htmlFor="Имя">Имя</label>
                        {changeState ? (
                            <>
                                <input
                                    value={newDisplayName}
                                    onChange={(e) => setNewDisplayName(e.target.value)} // Обновляем имя при изменении
                                    type="text"
                                    placeholder="Введите новое имя"
                                />
                                <span onClick={handleChangeDisplayName}>Сохранить</span>
                            </>
                        ) : (
                            <>
                                <input
                                    value={user?.displayName || ""}
                                    type="text"
                                    disabled
                                    placeholder="Введите новое имя"
                                />
                                <span onClick={() => setChangeState(true)}>Изменить</span>
                            </>
                        )}
                    </div>
                    <div>
                        <label htmlFor="email">E-Mail</label>
                        <input
                            value={user?.email || ""}
                            disabled
                            type="text"
                            placeholder="E-Mail"
                        />
                    </div>
                    <div className="card_input">
                        <label htmlFor="card">Карта</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            maxLength={19}
                            value={cardNumber}
                        />
                        <input
                            type="text"
                            value={expiry}
                            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                            placeholder="MM/YY"
                            maxLength={5}
                            className="validThru"
                        />
                    </div>
                    <button className="btn_change_allInput">Изменить</button>
                </div>
            </div>
            <button onClick={() => auth.signOut()}>Выйти с аккаунта</button>
        </div>
    );
};

export default PersonalData;
