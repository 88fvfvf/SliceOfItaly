import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Router from './router/Router';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = createRoot(rootElement); // Используем createRoot
    root.render(
        <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                <Router />
            </PersistGate>
        </Provider >
    );
} else {
    console.error("Element with id 'root' not found in the document.");
}
