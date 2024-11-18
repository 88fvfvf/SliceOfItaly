import { createSlice } from "@reduxjs/toolkit";
import { pizzaApi } from "../api/api.pizza";


const initialState = {
    products: []
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            pizzaApi.endpoints.fetchProducts.matchFulfilled,
            (state, { payload }) => {
                state.products = payload
            }   
        )
    }
})

export default filterSlice.reducer
