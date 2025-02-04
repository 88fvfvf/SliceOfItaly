import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';

export const addReview = async (reviewData: any) => {
    try {
        await addDoc(collection(db, 'reviews'), reviewData);
    } catch (e) {
        console.error('Ошибка добавления отзыва: ', e);
    }
};
