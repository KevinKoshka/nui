import { createSlice } from '@reduxjs/toolkit';

export const LOGIN_STATUS = {
    AUTHORIZED: 'AUTHORIZED',
    UNAUTHORIZED: 'UNAUTHORIZED'
};

export const loginSlice = createSlice({
    name: 'login',
    initialState: { 
        value: LOGIN_STATUS.UNAUTHORIZED
    },
    reducers: {
        allow: (state) => {
            state.value = LOGIN_STATUS.AUTHORIZED;
        },
        deny: (state) => {
            state.value = LOGIN_STATUS.UNAUTHORIZED
        }
    }
});

export const { allow, deny } = loginSlice.actions;
export default loginSlice.reducer;