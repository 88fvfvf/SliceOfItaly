import { Avatar, Button, Input, Rate, Tooltip } from 'antd';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { RiDeleteBin5Line } from "react-icons/ri";
import { db } from '../../../../firebase';
import { useUserRole } from '../../../../hooks/useUserRole';
import './Comments.scss';
import { addReply } from './reviewService';
import dayjs from 'dayjs';
import 'dayjs/locale/ru'; // Подключаем русскую локализацию
import { useFirebaseAuth } from '../../../../hooks/useFirebaseAuth';
import NotActivity from '../../notActivity/NotActivity';

interface IReview {
    id: string;
    userId: string;
    rating: number;
    comment: string;
    timestamp: string;
    userName: string;
    reply?: {
        text: string;
        timestamp: string;
    };
}

const Comments: React.FC = () => {
    const { role } = useUserRole();
    const { user } = useFirebaseAuth()
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [replyStates, setReplyStates] = useState<{ [key: string]: boolean }>({});
    const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchReviews = async () => {
            const querySnapshot = await getDocs(collection(db, 'reviews'));
            const fetchedReviews = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as IReview[];
            const arrayComments = fetchedReviews.sort((a, b) => b.rating - a.rating);
            setReviews(arrayComments);
        };

        fetchReviews();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'reviews', id));
            setReviews(prevReviews => prevReviews.filter(review => review.id !== id));
            console.log('Отзыв удален');
        } catch (e) {
            console.error('Ошибка удаления отзыва:', e);
        }
    };

    const handleReply = async (reviewId: string) => {
        if (!replyTexts[reviewId]?.trim()) return;
        await addReply(reviewId, replyTexts[reviewId]);

        // Обновляем список отзывов вручную
        setReviews(prevReviews =>
            prevReviews.map(review =>
                review.id === reviewId
                    ? { ...review, reply: { text: replyTexts[reviewId], timestamp: new Date().toISOString() } }
                    : review
            )
        );

        setReplyTexts(prev => ({ ...prev, [reviewId]: '' })); // Очищаем поле
        setReplyStates(prev => ({ ...prev, [reviewId]: false })); // Закрываем форму
    };

    return (
        <div className="comments">
            <h1>Отзывы клиентов</h1>
            {reviews.length > 0 ? (
                <div className="comment__body">
                    {reviews.map(review => (
                        <div className="comments__items" key={review.id}>
                            <div className="comments__item-info">
                                <div className="comments__item-avatar_name">
                                    <Avatar
                                        style={{ backgroundColor: "#FE5F1E", verticalAlign: 'middle' }}
                                        size="large"
                                    >
                                        {review.userName ? review.userName.charAt(0).toUpperCase() : 'A'}
                                    </Avatar>
                                    <div className="comments__item-name">
                                        <h3>{review.userName}</h3>
                                    </div>
                                </div>
                                <div className="comment_item-left">
                                    <div className="comments__item-rate_date">
                                        <div className="comments__item-rate">
                                            <Rate disabled defaultValue={review.rating} />
                                        </div>
                                        <div className="comments__item-date">
                                            <span>{dayjs(review.timestamp).locale('ru').format('D MMMM HH:mm')}</span>
                                        </div>
                                    </div>
                                    {role === 'admin' ? (
                                        <div className="comment_delete" onClick={() => handleDelete(review.id)}>
                                            <Tooltip placement="top" title={'Удалить комментарий'}>
                                                <RiDeleteBin5Line size={20} cursor={'pointer'} />
                                            </Tooltip>
                                        </div>
                                    ) : (
                                        user?.uid === review.userId && (
                                            <div className="comment_delete" onClick={() => handleDelete(review.id)}>
                                                <Tooltip placement="top" title={'Удалить комментарий'}>
                                                    <RiDeleteBin5Line size={20} cursor={'pointer'} />
                                                </Tooltip>
                                            </div>
                                        )
                                    )
                                    }
                                </div>
                            </div>
                            <div className="comments__item-body">
                                <div className="comments__item-text">
                                    <p>{review.comment}</p>
                                </div>
                            </div>
                            {review.reply ? (
                                <div className="replyfrom_admin">
                                    <strong>Ответ от заведения:</strong>
                                    <p>{review.reply.text}</p>
                                </div>
                            ) : (
                                role === 'admin' && (
                                    <div className="addreplyfrom_admin">
                                        <span onClick={() => setReplyStates(prev => ({ ...prev, [review.id]: !prev[review.id] }))}>
                                            {replyStates[review.id] ? 'Отмена' : 'Ответить'}
                                        </span>
                                        {replyStates[review.id] && (
                                            <div className="replyfrom_admin__body">
                                                <Input
                                                    placeholder="Введите ваш ответ"
                                                    value={replyTexts[review.id] || ''}
                                                    onChange={(e) => setReplyTexts(prev => ({ ...prev, [review.id]: e.target.value }))}
                                                />
                                                <Button danger onClick={() => handleReply(review.id)}>Ответить</Button>
                                            </div>
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <NotActivity text='Отзывов пока нет' />
            )
            }
        </div>
    );
};

export default Comments;
