import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loginUserInfo: {},
        loginUserToken: ''
    },
    reducers: {
        setLoginUserInfo: (state, action) => {
            state.loginUserInfo = { ...action.data, ...action.payload };
        },
        setLoginUserToken: (state, action) => {
            state.loginUserToken =action.payload;
        }
    }
});

export const { setLoginUserInfo, setLoginUserToken } = authSlice.actions;

export default authSlice.reducer;