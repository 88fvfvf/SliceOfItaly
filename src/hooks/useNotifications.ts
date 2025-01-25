import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export const useNotifications = (userId: string) => {
    const [notifications, setNotifications] = useState<{ id: string;[key: string]: any }[]>([]);

    useEffect(() => {
        if (!userId) return;

        const q = query(
            collection(db, "notifications"),
            where("userId", "==", userId),
            where("read", "==", false) // Получаем только непрочитанные уведомления
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newNotifications = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNotifications(newNotifications);
        });

        return () => unsubscribe();
    }, [userId]);

    return notifications;
};
