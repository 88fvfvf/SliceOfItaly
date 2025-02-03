import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../../../firebase"

export const addReply = async (reviewId: string, replyText: string) => {
    const reviewRef = doc(db, "reviews", reviewId);

    try {
        await updateDoc(reviewRef, {
            reply: {
                text: replyText,
                timestamp: new Date().toISOString()
            }
        })
        console.log('Ответ добавлен');
    } catch (e) {
        console.error('Ошибка добавления ответа:', e);
    }
}