import { useContext } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AccessDenied, NotFoundIcon } from '../../public/svg/icone';
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

    // Проверяем, что контекст не null
    if (!firebaseContext) {
        console.error('Firebase context is not available');
        return null; // Можно вернуть null, если контекст не доступен
    }
    const { auth } = firebaseContext; // получаем объект auth из контекста
    const [user, loading] = useAuthState(auth); // хук, который возвращает пользователя, загрузку и ошибку

    const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
        return user ?
            children :
            <NotFound
                title='Доступ запрещён'
                paragraph='Данную страницу могут просматривать только авторизованные пользователи'
                SvgIcon={<AccessDenied />}
            />
    }

    return (
        <HelmetProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App />} />
                    <Route path='/product/:title' element={<ProductPage />} />
                    <Route path='/order' element={<OrderPage />} />
                    <Route
                        path='*'
                        element={
                            <NotFound
                                title="Страница не найдена"
                                paragraph="Проверьте корректность введённого адреса или повторите попытку позже"
                                SvgIcon={<NotFoundIcon />} />
                        } />
                    <Route
                        path='profile'
                        element={
                            loading ? (
                                <LoadSpin />
                            ) : (
                                <ProtectedRoute>
                                    <ProfilePage />
                                </ProtectedRoute>
                            )}
                    />
                </Routes>
            </BrowserRouter>
        </HelmetProvider>
    );
};

export default Router;
