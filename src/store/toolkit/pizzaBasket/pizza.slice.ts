import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPizza } from "../../../types/IPizza";


interface IState {
    Pizza: IPizza[];
    price: number
    amount: number
}

const initialState: IState = {
    Pizza: [],
    price: 0,
    amount: 0
}

const pizzaSlice = createSlice({
    name: 'pizzaSlice',
    initialState,
    reducers: {
        addPizza: (state, action: PayloadAction<IPizza>) => {
            const pizzaToAdd = action.payload;
            state.Pizza.push(pizzaToAdd);
            state.amount = state.Pizza.length;
        },
        addPrice: (state, action: PayloadAction<number>) => {
            state.price += action.payload;
        },
        deleteAllPizza: (state) => {
            state.Pizza = []
            state.price = 0
            state.amount = 0
        },
        deletePizza: (state, action: PayloadAction<{ pizzaOrder: number; pizzaPrice: number }>) => {
            const { pizzaOrder, pizzaPrice } = action.payload;
            state.Pizza = state.Pizza.filter(d => d.id !== pizzaOrder)
            state.price -= pizzaPrice
            state.amount = state.Pizza.length
        }
    }
});

export const { addPizza, deleteAllPizza, addPrice, deletePizza } = pizzaSlice.actions;
export default pizzaSlice.reducer;
