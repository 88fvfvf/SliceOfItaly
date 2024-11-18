import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategories, Item } from '../../types/Types';

export const pizzaApi = createApi({
    reducerPath: 'pizzaApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api-git-main-88fvfvfs-projects.vercel.app/api/' }),
    endpoints: (builder) => ({
        fetchProducts: builder.query<Item, void>({
            query: () => ({
                url: '/products'
            })
        }),
        fetchCategories: builder.query<ICategories[], void>({
            query: () => ({
                url: '/categories'
            })
        })
    })
})

export const { useFetchProductsQuery, useFetchCategoriesQuery } = pizzaApi