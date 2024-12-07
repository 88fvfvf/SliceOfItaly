import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProducts } from "../../types/Types";


interface IBasket {
    basket: IProducts[]
    totalPrice: number
}

const initialState: IBasket = {
    basket: [],
    totalPrice: 0
}

const basketSlice = createSlice({
    name: 'basketSlice',
    initialState,
    reducers: {
        addBasket: (state, { payload }: PayloadAction<IProducts>) => {
            const existingItem = state.basket.find(
                (item) => (
                    item.id === payload.id && item.size === payload.size && item.type === payload.type &&
                    JSON.stringify(item.tasty) === JSON.stringify(payload.tasty)
                )
            );
            if (existingItem) {
                existingItem.count++;
            } else {
                state.basket.push({
                    ...payload,
                    count: 1
                })
            }
            state.totalPrice = state.basket.reduce((acc, obj) => (obj.price * obj.count) + acc, 0)
        },
        minusBasket: (state, { payload }: PayloadAction<IProducts>) => {
            const existingItem = state.basket.find(
                (item) => (
                    item.id === payload.id && item.size === payload.size && item.type === payload.type &&
                    JSON.stringify(item.tasty) === JSON.stringify(payload.tasty)
                )
            );
            if (existingItem && existingItem.count > 1) {
                existingItem.count--
            }
            state.totalPrice = state.basket.reduce((acc, obj) => {
                return (obj.price * obj.count) + acc
            }, 0)
        },
        deleteAll: (state) => {
            state.basket = []
            state.totalPrice = 0;
        },
        deleteBasket: (state, { payload }: PayloadAction<IProducts>) => {
            const existingItem = state.basket.find(
                (item) => (
                    item.id === payload.id && item.size === payload.size && item.type === payload.type &&
                    JSON.stringify(item.tasty) === JSON.stringify(payload.tasty)
                )
            );

            if (existingItem) {
                // Обновляем корзину, чтобы удалить товар
                state.basket = state.basket.filter(
                    (item) => !(
                        item.id === payload.id && item.size === payload.size && item.type === payload.type &&
                        JSON.stringify(item.tasty) === JSON.stringify(payload.tasty)
                    )
                );

                // Обновляем общую сумму
                state.totalPrice -= existingItem.price * existingItem.count;
            }
        }

    }
})

export const { addBasket, deleteAll, deleteBasket, minusBasket } = basketSlice.actions;
export default basketSlice.reducer;