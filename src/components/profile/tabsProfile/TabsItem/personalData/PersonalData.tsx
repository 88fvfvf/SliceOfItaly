import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { useFirebaseAuth } from "../../../../../hooks/useFirebaseAuth";
import "./PersonalData.scss";

const PersonalData = () => {
    const [newDisplayName, setNewDisplayName] = useState('');
    const [changeState, setChangeState] = useState(false)
    const { user, auth } = useFirebaseAuth()

    const handleChangeDisplayName = async () => {
        if (user && newDisplayName) {
            try {
                await updateProfile(user, {
                    displayName: newDisplayName,
                });
                setChangeState(false)
                console.log('Display name updated successfully');
            } catch (err) {
                alert('Error updating display name');
            }
        } else {
            alert('Please enter a new display name');
        }
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
                </div>
            </div>
            <button onClick={() => auth.signOut()}>Выйти с аккаунта</button>
        </div>
    );
};

export default PersonalData;
