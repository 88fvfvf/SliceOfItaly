import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";

// Создаем хук с типизацией для dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Создаем хук с типизацией для useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
