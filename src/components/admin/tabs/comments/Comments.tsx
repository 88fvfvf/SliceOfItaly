import { Avatar, Rate, Tooltip } from 'antd';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { RiDeleteBin5Line } from "react-icons/ri";
import { db } from '../../../../firebase';
import './Comments.scss';

interface IReview {
    id: string;
    userId: string;
    rating: number;
    comment: string;
    timestamp: string;
    userName: string;
}

const Comments: React.FC = () => {
    const [reviews, setReviews] = useState<IReview[]>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const querySnapshot = await getDocs(collection(db, 'reviews'));
            const fetchedReviews = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as IReview[];
            setReviews(fetchedReviews);
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

    return (
        <div className="comments">
            <h1>Отзывы наших клиентов</h1>
            <div className="comment__body">
                {reviews.map(review => (
                    <div className="comments__items">
                        <div className="comments__item-info">
                            <div className="comments__item-avatar_name">
                                <Avatar
                                    style={{ backgroundColor: "#FE5F1E", verticalAlign: 'middle' }}
                                    size="large"
                                >
                                    {review.userName[0]}
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
                                        <span>12 февраля 15:32</span>
                                    </div>
                                </div>
                                <div className="comment_delete" onClick={() => handleDelete(review.id)}>
                                    <Tooltip placement="top" title={'Удалить комментарий'}>
                                        <RiDeleteBin5Line size={20} cursor={'pointer'} />
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                        <div className="comments__item-body">
                            <div className="comments__item-text">
                                <p>
                                    {review.comment}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;
