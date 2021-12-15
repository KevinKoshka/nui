import { createSlice } from '@reduxjs/toolkit';

export const activeMealSlice = createSlice({
    name: 'activeMeal',
    initialState: { 
        value: null
    },
    reducers: {
        setActiveMeal: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setActiveMeal } = activeMealSlice.actions;
export default activeMealSlice.reducer;