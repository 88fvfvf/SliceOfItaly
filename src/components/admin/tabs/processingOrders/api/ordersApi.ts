import { get, getDatabase, onValue, ref, remove, update } from "firebase/database";
import { IProcessingOrders } from "../../../../../types/Types";
import { IUserData } from "../../../../profile/tabsProfile/TabsItem/currentOrders/CurrentOrders";
import { addDoc, collection, doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../../../../firebase";

export const fetchOrders = (
  callback: (
    orders: IProcessingOrders[], userData: IUserData[]) => void, onError: (error: string) => void) => {
  const db = getDatabase();
  const orderRef = ref(db, `orders/`);

  const unsubscribe = onValue(
    orderRef,
    (snapshot) => {
      const data = snapshot.val();
      const ordersArray: IProcessingOrders[] = [];
      const userDataArray: IUserData[] = [];

      if (data) {
        for (let orderId in data) {
          const orderData = data[orderId];
          for (let orderKey in orderData) {
            const order = orderData[orderKey];
            ordersArray.push({
              id: orderKey,
              basket: order.basket || [],
              userId: orderId,
            });
            userDataArray.push(order.userData || {});
          }
        }
      }

      callback(ordersArray, userDataArray);
    },
    (error) => {
      onError("Ошибка загрузки заказов. Пожалуйста, попробуйте позже.");
      console.error("Ошибка загрузки заказов:", error);
    }
  );

  return unsubscribe;
};


async function sendNotification(userId: string, orderId: string) {
  try {
    await addDoc(collection(db, "notifications"), {
      userId,
      message: "Ваш заказ доставлен!",
      timestamp: serverTimestamp(),
      orderId,
      read: false, // Пометка, что уведомление еще не прочитано
    });
  } catch (err) {
    console.error("Ошибка при отправке уведомления:", err);
  }
}

export const updateOrderStatus = async (userId: string, orderKey: string, newStatus: string) => {
  const database = getDatabase();
  const firestore = getFirestore();

  const orderRef = ref(database, `orders/${userId}/${orderKey}`);
  try {
    // Получить данные заказа
    const snapshot = await get(orderRef);
    if (!snapshot.exists()) throw new Error("Заказ не найден");

    const orderData = snapshot.val();

    if (newStatus === "Доставлено") {
      // 1. Перенос в Firestore
      const orderHistoryRef = doc(firestore, `orderHistory/${userId}/orders/${orderKey}`);
      await setDoc(orderHistoryRef, {
        ...orderData,
        userData: { ...orderData.userData, status: newStatus },
        timestamp: new Date().toISOString(),
      });
      sendNotification(userId, orderKey);

      // 2. Удаление из Realtime Database
      await remove(orderRef);
    } else {
      // Обновление статуса в Realtime Database
      const userDataRef = ref(database, `orders/${userId}/${orderKey}/userData`);
      await update(userDataRef, { status: newStatus });
    }
  } catch (error) {
    console.error("Ошибка при обновлении статуса:", error);
  }
};
