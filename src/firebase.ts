// Импорты из Firebase SDK
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Импортируем Firebase Storage

// Firebase конфигурация (замените на свои данные из Firebase Console)
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    databaseURL: import.meta.env.VITE_FIREBASE_REALTIME_DB
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Экспорт авторизации и Firestore
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Получаем экземпляр Firebase Storage


// Экспорт приложения (если нужно в будущем)
export default app;
