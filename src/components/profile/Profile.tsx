import { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ContextFirebase } from '../../main';
import Header from '../Header/Header';
import { FaRegUserCircle } from "react-icons/fa";
import './Profile.scss';

const Profile = () => {
    const firebaseContext = useContext(ContextFirebase);

    // Проверяем, что контекст не null
    if (!firebaseContext) {
        console.error('Firebase context is not available');
        return null; // Можно вернуть null, если контекст не доступен
    }
    const { auth } = firebaseContext; // получаем объект auth из контекста
    const [user, loading] = useAuthState(auth); // хук, который возвращает пользователя, загрузку и ошибку

    return (
        <div className='profile'>
            <Header />
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <h1>Профиль</h1>
                    <div className="info_profile">
                        {user?.photoURL ? (
                            <img src={user.photoURL} alt="user" />
                        ) : (
                            <FaRegUserCircle size={40} />
                        )}
                        <h2>{user?.displayName}</h2>
                    </div>
                    <button onClick={() => auth.signOut()}>Выйти</button>
                </>
            )}
        </div>
    );
};


export default Profile