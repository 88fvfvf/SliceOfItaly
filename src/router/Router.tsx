import { BrowserRouter as AppRouter, Route } from 'react-router-dom';
import App from '../page/App';

const Router = () => {
    return (
        <AppRouter>
            <Route path='/' element={<App />} />
        </AppRouter>
    );
};

export default Router;
