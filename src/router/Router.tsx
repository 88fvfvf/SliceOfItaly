import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../page/home/App';
import ProductPage from '../page/productPage/ProductPage';
import { HelmetProvider } from 'react-helmet-async';
import NotFound from '../page/NotFound/NotFound';
import OrderPage from '../page/orderPage/OrderPage';

const Router = () => {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App />} />
                    <Route path='/product/:title' element={<ProductPage />} />
                    <Route path='/order' element={<OrderPage />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </HelmetProvider>
    );
};

export default Router;
