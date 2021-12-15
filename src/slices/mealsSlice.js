import { createSlice } from '@reduxjs/toolkit';

export const mealsSlice = createSlice({
    name: 'meals',
    initialState: { 
        value: []
    },
    reducers: {
        setMeals: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setMeals } = mealsSlice.actions;
export default mealsSlice.reducer;