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
const firebaseConfig = {
    apiKey: "AIzaSyDNWzfXKj3qe20uUlEnjvdF7Pfkq5l7vYk",
    authDomain: "sliceofitaly-f829c.firebaseapp.com",
    projectId: "sliceofitaly-f829c",
    storageBucket: "sliceofitaly-f829c.firebasestorage.app",
    messagingSenderId: "728372266742",
    appId: "1:728372266742:web:3cd4fd0d15d8756ed4ced7",
    measurementId: "G-SYGJEMWJ61"
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
    console.error("Element with id 'root' not found in the document.");
}
