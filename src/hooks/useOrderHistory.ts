import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { DataType } from '../types/Types';
import { useFirebaseAuth } from './useFirebaseAuth';

export const useOrderHistory = () => {
    const { user } = useFirebaseAuth();
    const [orders, setOrders] = useState<DataType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            if (!user) return;

            try {
                setLoading(true);
                const ordersRef = collection(db, `orderHistory/${user.uid}/orders`);

                // Уберите where для проверки, если данные не появляются
                const q = query(ordersRef, orderBy('timestamp', 'desc'));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    console.warn('No orders found for the user.');
                }

                const newOrders: DataType[] = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as DataType[];

                setOrders(newOrders);
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError('Failed to load order history. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, [user]);

    useEffect(() => {
        if (!user) {
            setOrders([]);
            setLoading(false);
            setError(null);
        }
    }, [user]);


    return { orders, loading, error };
};
