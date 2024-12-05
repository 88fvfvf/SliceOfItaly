import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../page/home/App';
import ProductPage from '../page/productPage/ProductPage';
import { HelmetProvider } from 'react-helmet-async';

const Router = () => {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App />} />
                    <Route path='/product/:title' element={<ProductPage />} />
                </Routes>
            </BrowserRouter>
        </HelmetProvider>
    );
};

export default Router;
