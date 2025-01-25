import { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ContextFirebase } from '../contexts/FirebaseContext';

export const useFirebaseAuth = () => {
    const firebaseContext = useContext(ContextFirebase);

    if (!firebaseContext) {
        throw new Error('Firebase context is not available');
    }

    const { auth, firestore } = firebaseContext;
    const [user, loading, error] = useAuthState(auth);

    return { auth, user, firestore, loading, error };
};
