import { useContext } from 'react';
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

    return (
        <div className='profile'>
            <Header />
            <>
                <TabsProfile />
            </>
        </div>
    );
};


export default Profile