import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';

export const addReview = async (reviewData: any) => {
    try {
        const docRef = await addDoc(collection(db, 'reviews'), reviewData);
        console.log('Отзыв добавлен с ID: ', docRef.id);
    } catch (e) {
        console.error('Ошибка добавления отзыва: ', e);
    }
};
