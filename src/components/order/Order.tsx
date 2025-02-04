import { getDatabase, push, ref, serverTimestamp, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useFirebaseAuth } from "../../hooks/useFirebaseAuth";
import { deleteAll } from "../../store/basket/basket.slice";
import { IProducts } from "../../types/Types";
import Address from "./address/Address";
import "./Order.scss";
import Basket from "./orderBasket/orderBasket";
import Payment from "./payment/Payment";
import Personal from "./personal/Personal";

interface IBasket {
    basket: IProducts[]
}

const Order = ({ basket }: IBasket) => {
    const dispatch = useAppDispatch();
    const totalPrice = useAppSelector((state) => state.basketSlice.totalPrice);
    const { user } = useFirebaseAuth();

    const [userData, setUserData] = useState({
        name: user?.displayName || "",
        email: user?.email || "",
        totalPrice: totalPrice,
        address: "",
        extraInfo: "",
        status: "Принят",
        timestamp: serverTimestamp(),
    });

    useEffect(() => {
        setUserData((prevData) => ({
            ...prevData,
            totalPrice: totalPrice,
        }));
    }, [totalPrice]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user) {
            try {
                const db = getDatabase();
                const ordersRef = ref(db, `orders/${user.uid}`);
                const newOrderRef = push(ordersRef);
                await set(newOrderRef, {
                    userData: { ...userData, timestamp: serverTimestamp() },
                    basket,
                });
                dispatch(deleteAll());
            } catch (err) {
                console.error("Error placing order", err);
            }
        }
    };

    return (
        <div className="MakingOrder">
            <div className="order">
                <Basket basket={basket} clearBasket={() => dispatch(deleteAll())} />
                <form id="orderForm" onSubmit={handleSubmit}>
                    <Personal user={user || null} handleInputChange={handleInputChange} />
                    <Address userData={userData} handleInputChange={handleInputChange} />
                </form>
            </div>
            <Payment handleSubmit={handleSubmit} />
        </div>
    );
};

export default Order;
