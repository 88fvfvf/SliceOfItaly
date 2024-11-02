import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategories } from "../../../types/ICategories";


const initialState: Omit<ICategories, 'id'> = {
    categories: 'популярности'
}

const SortSlice = createSlice({
    name: 'SortSlice',
    initialState,
    reducers: {
        ChangeSort: (state, action: PayloadAction<string>) => {
            state.categories = action.payload
        }
    }
})

export const { ChangeSort } = SortSlice.actions
export default SortSlice.reducer