import LoadingWrapper from '../../hooks/LoadingWrapper';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
import { useUserRole } from '../../hooks/useUserRole';
import Admin from '../admin/Admin';
import Header from '../Header/Header';
import NotificationsModal from '../NotificationsModal/NotificationsModal';
import './Profile.scss';
import TabsProfile from './tabsProfile/UserProfile';

enum UserRole {
    User = 'user',
    Admin = 'admin',
}

const Profile = () => {
    const { role, loading } = useUserRole();
    const { user } = useFirebaseAuth();
    return (
        <LoadingWrapper loading={loading || role === undefined}>
            <div className="profile">
                {user && <NotificationsModal userId={user.uid} />}
                <Header />
                {role === UserRole.User && <TabsProfile />}
                {role === UserRole.Admin && <Admin />}
            </div>
        </LoadingWrapper>
    );
};




export default Profile