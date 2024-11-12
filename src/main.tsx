import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './page/App';
import { store } from './store/store';

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement); // Используем createRoot
    root.render(
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
} else {
    console.error("Element with id 'root' not found in the document.");
}
