import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { pizzaApi } from "./api/api.pizza";
import filterReducer from './filter/filter.slice';
import basketSlice from './basket/basket.slice'


export const store = configureStore({
    reducer: {
        [pizzaApi.reducerPath]: pizzaApi.reducer,
        filter: filterReducer,
        basketSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pizzaApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
