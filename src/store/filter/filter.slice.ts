import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProducts } from "../../types/Types";
import { pizzaApi } from "../api/api.pizza";


interface ProductState {
    originalProducts: IProducts[]; // Оригинальные данные
    products: Record<string, IProducts[]>; // Отфильтрованные данные
}

export interface IFilter {
    FromSlider: number,
    ToSlider: number,
    Ingredients: string[] | undefined,
    Sizes: string[],
    Types: []
}

const initialState: ProductState = {
    originalProducts: [],
    products: {},
};
const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        applyFilter: (state, { payload }: PayloadAction<IFilter>) => {
            // 1. Start with original products
            let filteredProducts = state.originalProducts;

            // 2. Apply price filter
            filteredProducts = filteredProducts.filter(
                (product) => product.price >= payload.FromSlider && product.price <= payload.ToSlider
            );

            // 3. Apply Ingredients filter (if provided)
            if (payload.Ingredients?.length) {
                filteredProducts = filteredProducts.filter((product) =>
                    payload.Ingredients!.every((ingredient) => product.description?.toLowerCase()?.includes(ingredient.toLowerCase()))
                );
            }

            // 4. Apply Sizes filter (if provided)
            if (payload.Sizes?.length) {
                filteredProducts = filteredProducts.filter((product) =>
                    payload.Sizes!.every((sizes) => product.sizes?.includes(sizes))
                );
            }

            if (payload.Types?.length) {
                filteredProducts = filteredProducts.filter((product) =>
                    payload.Types!.every((types) => product.types?.includes(types))
                )
            }

            // 5. Regroup filtered products by categories
            state.products = filteredProducts.reduce<Record<string, IProducts[]>>((acc, product) => {
                if (!acc[product.category]) {
                    acc[product.category] = [];
                }
                acc[product.category].push(product);
                return acc;
            }, {});
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            pizzaApi.endpoints.fetchProducts.matchFulfilled,
            (state, action: PayloadAction<IProducts[]>) => {
                // Сохраняем оригинальный массив продуктов
                state.originalProducts = action.payload;

                // По умолчанию сохраняем их в поле products, сгруппировав по категориям
                state.products = action.payload.reduce<Record<string, IProducts[]>>((acc, product) => {
                    if (!acc[product.category]) {
                        acc[product.category] = [];
                    }
                    acc[product.category].push(product);
                    return acc;
                }, {});
            }
        );
    },
});

export const { applyFilter } = filterSlice.actions;
export default filterSlice.reducer;