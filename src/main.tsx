import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { FirebaseProvider } from './contexts/FirebaseProvider';
import { auth, firestore } from './firebase'; // Импорт из вашего файла настроек Firebase
import Router from './router/Router';
import { persistor, store } from './store/store';
import './main.css'

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <Provider store={store}>
            <FirebaseProvider auth={auth} firestore={firestore}>
                <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                    <Router />
                </PersistGate>
            </FirebaseProvider>
        </Provider>
    );
}
