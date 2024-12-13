import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { pizzaApi } from "./api/api.pizza";
import filterReducer from './filter/filter.slice';
import basketSlice from './basket/basket.slice';

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Используем localStorage

// Настройка persist для Redux Persist
const persistConfig = {
    key: 'root',  // Уникальный ключ для хранилища
    storage,      // Используем localStorage для сохранения
    blacklist: ['pizzaApi', 'filter'], // Исключаем RTK Query API из сохранения
};

// Комбинирование редьюсеров
const rootReducer = combineReducers({
    [pizzaApi.reducerPath]: pizzaApi.reducer, // RTK Query
    filter: filterReducer,                    // Ваши слайсы
    basketSlice,                              // Состояние корзины
});

// Оборачивание редьюсеров для Redux Persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Создание store с persistedReducer
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Отключаем проверку сериализуемости (необходимо для Redux Persist)
        }).concat(pizzaApi.middleware), // Добавляем middleware RTK Query
});

// Создание persistor для управления хранилищем
export const persistor = persistStore(store);

// Включение слушателей RTK Query
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
