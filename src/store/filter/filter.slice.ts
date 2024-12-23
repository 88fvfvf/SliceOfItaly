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
    Sizes: string[] | undefined,
    Types: string[] | undefined
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

            filteredProducts = filteredProducts.filter((product) => {
                // Проверка диапазона цены
                const matchesPrice = product.prices[0] >= payload.FromSlider && product.prices[0] <= payload.ToSlider;

                // Проверка ингредиентов
                const matchesIngredients = payload.Ingredients?.length
                    ? payload.Ingredients.every((ingredient) =>
                        product.description?.toLowerCase()?.includes(ingredient.toLowerCase())
                    )
                    : true;

                // Проверка размеров
                const matchesSizes = payload.Sizes?.length
                    ? payload.Sizes.every((size) => product.sizes?.includes(size))
                    : true;

                // Проверка типов
                const matchesTypes = payload.Types?.length
                    ? payload.Types.every((type) => product.types?.includes(type))
                    : true;

                return matchesPrice && matchesIngredients && matchesSizes && matchesTypes;
            });

            // 5. Regroup filtered products by categories
            state.products = filteredProducts.reduce((acc: Record<string, IProducts[]>, product: IProducts) => {
                if (!acc[product.category]) {
                    acc[product.category] = [];
                }
                acc[product.category].push(product);
                return acc;
            }, {});
        },
        sortProducts: (state, { payload }: PayloadAction<string>) => {
            const sortType = payload;
            const sortedProducts = { ...state.products };

            Object.keys(sortedProducts).forEach(category => {
                sortedProducts[category] = sortedProducts[category].slice().sort((a, b) => {
                    if (sortType === 'популярности') {
                        return b.rating - a.rating;
                    } else if (sortType === 'по цене') {
                        return b.prices[0] - a.prices[0];
                    } else if (sortType === 'по алфавиту') {
                        return a.title.localeCompare(b.title);
                    }
                    return 0;
                });
            });

            state.products = sortedProducts;
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

export const { applyFilter, sortProducts } = filterSlice.actions;
export default filterSlice.reducer;