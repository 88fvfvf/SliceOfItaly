import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBreakfast, ICocktails, IDesserts, IDrinks, IPizza, ISnacks } from '../../types/Types';

export const pizzaApi = createApi({
    reducerPath: 'pizzaApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api-nine-flax-84.vercel.app/api/server' }),
    endpoints: (builder) => ({
        fetchPizza: builder.query<IPizza[], undefined>({
            query: () => ({
                url: '/pizza'
            })
        }),
        fetchBreakFast: builder.query<IBreakfast[], undefined>({
            query: () => ({
                url: '/breakfast'
            })
        }),
        fetchSnacks: builder.query<ISnacks[], undefined>({
            query: () => ({
                url: '/snacks'
            })
        }),
        fetchCocktails: builder.query<ICocktails[], undefined>({
            query: () => ({
                url: '/cocktails'
            })
        }),
        fetchDrinks: builder.query<IDrinks[], undefined>({
            query: () => ({
                url: '/drinks'
            })
        }),
        fetchDesserts: builder.query<IDesserts[], undefined>({
            query: () => ({
                url: '/desserts'
            })
        }),
    })
})

export const {
    useFetchPizzaQuery,
    useFetchBreakFastQuery,
    useFetchSnacksQuery,
    useFetchCocktailsQuery,
    useFetchDrinksQuery,
    useFetchDessertsQuery
} = pizzaApi