import { useContext } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AccessDenied, IconEmailVerified, NotFoundIcon } from '../../public/svg/icone';
import { ContextFirebase } from '../main';
import App from '../page/home/App';
import NotFound from '../page/NotFound/NotFound';
import OrderPage from '../page/orderPage/OrderPage';
import ProductPage from '../page/productPage/ProductPage';
import ProfilePage from '../page/profilePage/ProfilePage';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoadSpin from '../components/loadSpin/LoadSpin';

const Router = () => {
    const firebaseContext = useContext(ContextFirebase);

    if (!firebaseContext) {
        console.error('Firebase context is not available');
        return null;
    }
    const { auth } = firebaseContext;
    const [user, loading] = useAuthState(auth);

    const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
        if (loading) {
            return <LoadSpin />; // Загружаем спиннер, если идёт загрузка
        }

        if (!user) {
            return (
                <NotFound
                    title="Доступ запрещён"
                    paragraph="Данную страницу могут просматривать только авторизованные пользователи"
                    SvgIcon={<AccessDenied />}
                />
            );
        }

        if (!user.emailVerified) {
            return (
                <NotFound
                    title="Подтвердите ваш E-Mail"
                    paragraph="Вы не можете получить доступ к этой странице, пока не подтвердите вашу почту. Проверьте вашу почту и перейдите по ссылке из письма."
                    SvgIcon={<IconEmailVerified />}
                />
            );
        }

        return <>{children}</>; // Если всё в порядке, рендерим защищённую страницу
    };


    return (
        <HelmetProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/product/:title" element={<ProductPage />} />
                    <Route path="/order" element={<OrderPage />} />
                    <Route
                        path="profile"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <NotFound
                                title="Страница не найдена"
                                paragraph="Проверьте корректность введённого адреса или повторите попытку позже"
                                SvgIcon={<NotFoundIcon />}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </HelmetProvider>
    );
};

export default Router;
