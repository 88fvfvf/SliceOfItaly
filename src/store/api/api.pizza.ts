import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IIngredients, IProducts } from '../../types/Types';

export const pizzaApi = createApi({
    reducerPath: 'pizzaApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api-git-main-88fvfvfs-projects.vercel.app/api/' }),
    tagTypes: ['Menu'],
    endpoints: (builder) => ({
        fetchProducts: builder.query<IProducts[], string | void>({
            query: (title) => ({
                url: title ? `/products?title=${encodeURIComponent(title)}` : '/products'
            })
        }),
        fetchMenu: builder.query<IProducts[], void>({
            query: () => ({
                url: '/products'
            }),
            providesTags: ['Menu']
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
        }),
        addMenuItem: builder.mutation<IProducts, Partial<IProducts>>({
            query: (newItem) => ({
                url: '/products',
                method: 'POST',
                body: newItem
            }),
            invalidatesTags: ['Menu']
        }),
    })
});

export const {
    useFetchProductsQuery,
    useFetchMenuQuery,
    useFetchIngredientsQuery,
    useFetchProductBySearchQuery,
    useFetchProductByTitleQuery,
    useAddMenuItemMutation
} = pizzaApi;
