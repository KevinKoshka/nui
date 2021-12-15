import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';
import mealsReducer from './slices/mealsSlice';
import activeMealReducer from './slices/activeMealSlice';

export default configureStore({
    reducer: {
        login: loginReducer,
        meals: mealsReducer,
        activeMeal: activeMealReducer
    },
});