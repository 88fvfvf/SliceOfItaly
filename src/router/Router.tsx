import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../page/home/App';
import NotFound from '../page/NotFound/NotFound';
import OrderPage from '../page/orderPage/OrderPage';
import ProductPage from '../page/productPage/ProductPage';
import Profile from '../page/profile/Profile';
import { AccessDenied, NotFoundIcon } from '../../public/svg/icone';

const Router = () => {
    const isAuth = false

    const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
        return isAuth ?
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
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>}
                    />
                </Routes>
            </BrowserRouter>
        </HelmetProvider>
    );
};

export default Router;
