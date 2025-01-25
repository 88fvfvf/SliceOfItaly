import React, { ReactNode } from 'react';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { ContextFirebase } from './FirebaseContext'; // Корректный путь к контексту

type FirebaseProviderProps = {
    auth: Auth;
    firestore: Firestore;
    children: ReactNode;
};

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ auth, firestore, children }) => {
    return (
        <ContextFirebase.Provider value={{ auth, firestore }}>
            {children}
        </ContextFirebase.Provider>
    );
};
