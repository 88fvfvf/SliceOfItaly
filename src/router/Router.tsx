import { Route, BrowserRouter as AppRouter } from 'react-router-dom';
import App from '../page/App';
import Basket from '../components/Basket/Basket';

const Router = () => {
    return (
        <AppRouter>
            <Route path='/' element={<App />} />
            <Route path='/basket' element={<Basket />} />
        </AppRouter>
    );
};

export default Router;
