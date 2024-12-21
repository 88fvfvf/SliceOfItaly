import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IIngredients, IProducts } from '../../types/Types';

export const pizzaApi = createApi({
    reducerPath: 'pizzaApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api-git-main-88fvfvfs-projects.vercel.app/api/' }),
    endpoints: (builder) => ({
        fetchProducts: builder.query<IProducts[], string | void>({
            query: (title) => ({
                url: title ? `/products?title=${encodeURIComponent(title)}` : '/products'
            })
        }),
        fetchProductBySearch: builder.query<IProducts[], string>({
            query: (search) => ({
                url: `/search?q=${search}`
            })
        }),
        fetchIngredients: builder.query<IIngredients[], void>({
            query: () => ({
                url: '/ingredients'
            })
        }),
        fetchProductByTitle: builder.query<IProducts[], string>({
            query: (title) => ({
                url: `/products?title=${encodeURIComponent(title)}`
            })
        })
    })
});

export const { useFetchProductsQuery, useFetchIngredientsQuery, useFetchProductBySearchQuery, useFetchProductByTitleQuery } = pizzaApi;
