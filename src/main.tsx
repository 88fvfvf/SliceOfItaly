import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Router from './router/Router';
import { persistor, store } from './store/store';

import { initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { createContext } from 'react';

// Firebase configuration
// Firebase configuration using environment variables
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

// Define the type for context value
type FirebaseContextType = {
    auth: Auth;
    firestore: Firestore;
};

// Create the Firebase context with the correct type
export const ContextFirebase = createContext<FirebaseContextType | null>(null);

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <Provider store={store}>
            <ContextFirebase.Provider value={{ auth, firestore }}>
                <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                    <Router />
                </PersistGate>
            </ContextFirebase.Provider>
        </Provider>
    );
} else {
    console.error('Failed to find the root element');
}
