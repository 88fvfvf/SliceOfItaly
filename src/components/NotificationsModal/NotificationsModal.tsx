import { Input, message, Modal, Rate, UploadFile } from "antd";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase"; // Firebase Storage
import { useFirebaseAuth } from "../../hooks/useFirebaseAuth";
import { useNotifications } from "../../hooks/useNotifications";
import './NotificationsModal.scss';

interface NotificationsModalProps {
    userId: string;
}

const NotificationsModal = ({ userId }: NotificationsModalProps) => {
    const { user } = useFirebaseAuth();
    const notifications = useNotifications(userId);

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [rating, setRating] = useState(0);
    const [commentText, setCommentText] = useState('');

    const handleSubmitReview = async () => {
        if (!commentText.trim()) {
            message.error('Коментари не опубликованы.');
            return;
        }

        const photoURLs = fileList
            .filter(file => file.url)
            .map(file => file.url);

        const reviewData = {
            userId,
            rating: rating || 5,
            comment: commentText,
            photoURLs,
            timestamp: new Date().toISOString(),
            userName: user?.displayName || 'Аноним',
        };

        try {
            await addDoc(collection(db, 'reviews'), reviewData);
            message.success('Отзыв добавлен!');
        } catch (error) {
            message.error('Ошибка добавления отзыва');
        }

        setRating(0);
        setCommentText('');
        setFileList([]);
    };

    const handleClose = async (notificationId: string) => {
        try {
            await updateDoc(doc(db, 'notifications', notificationId), { read: true });
        } catch (error) {
            console.log('Error updating notifications', error);
        }
    };

    return (
        <>
            {notifications.map((notification) => (
                <Modal
                    key={notification.id}
                    title={<p style={{ fontSize: 25 }}>Уведомление</p>}
                    onOk={() => {
                        handleSubmitReview();
                        handleClose(notification.id);
                    }}
                    visible={true}
                    centered
                    onCancel={() => handleClose(notification.id)}
                >
                    <div className="notification_body" style={{ display: 'flex', flexDirection: 'column' }}>
                        <span>{notification.message}</span>
                        <div className="body_feedback">
                            <span>Оцените наш сервис</span>
                            <Rate onChange={setRating} value={rating} />
                            <label>Оставьте комментарии для улучшения нашего сервиса.</label>
                            <Input
                                type="text"
                                placeholder="Самая лучшая пиццерия!!!"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                        </div>
                    </div>
                </Modal>
            ))}
        </>
    );
};

export default NotificationsModal;
