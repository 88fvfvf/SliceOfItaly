import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IIngredients, IProducts } from '../../types/Types';

export const pizzaApi = createApi({
    reducerPath: 'pizzaApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api-git-main-88fvfvfs-projects.vercel.app/api/' }),
    endpoints: (builder) => ({
        fetchProducts: builder.query<IProducts[], void>({
            query: () => ({
                url: '/products'
            })
        }),
        fetchIngredients: builder.query<IIngredients[], void>({
            query: () => ({
                url: '/ingredients'
            })
        })
    })
})

export const { useFetchProductsQuery, useFetchIngredientsQuery } = pizzaApi