import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Router from './router/Router';
import { store } from './store/store';

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement); // Используем createRoot
    root.render(
        <Provider store={store}>
            <Router />
        </Provider>
    );
} else {
    console.error("Element with id 'root' not found in the document.");
}
