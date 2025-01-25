import { useEffect, useState } from "react";
import { fetchOrders } from "../components/admin/tabs/processingOrders/api/ordersApi";
import { IProcessingOrders } from "../types/Types";
import { IUserData } from "../components/profile/tabsProfile/TabsItem/currentOrders/CurrentOrders";

export const useOrders = (user: any) => {
    const [orders, setOrders] = useState<IProcessingOrders[]>([]);
    const [userData, setUserData] = useState<IUserData[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            const unsubscribe = fetchOrders(
                (ordersArray, userDataArray) => {
                    setOrders(ordersArray);
                    setUserData(userDataArray);
                },
                (errorMsg) => {
                    setError(errorMsg);
                }
            );

            return () => unsubscribe();
        }
    }, [user]);

    return { orders, userData, error };
};
