import { createContext } from 'react';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

export interface FirebaseContextValue {
    auth: Auth;
    firestore: Firestore;
}

export const ContextFirebase = createContext<FirebaseContextValue | null>(null);
