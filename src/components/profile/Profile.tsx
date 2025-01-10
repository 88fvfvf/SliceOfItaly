import { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ContextFirebase } from '../../main';
import Header from '../Header/Header';
import './Profile.scss';
import TabsProfile from './tabsProfile/TabsProfile';

const Profile = () => {
    const firebaseContext = useContext(ContextFirebase);

    // Проверяем, что контекст не null
    if (!firebaseContext) {
        console.error('Firebase context is not available');
        return null; // Можно вернуть null, если контекст не доступен
    }
    const { auth } = firebaseContext; // получаем объект auth из контекста
    const [loading] = useAuthState(auth); // хук, который возвращает пользователя, загрузку и ошибку

    return (
        <div className='profile'>
            <Header />
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <TabsProfile />
                </>
            )}
        </div>
    );
};


export default Profile