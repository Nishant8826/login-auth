import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    token: null,
    status: 'idle',
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            console.log('state>>>', state)
            console.log('action>>>', action)
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
        },
        logout: (state) => {
            console.log('sattet>>',state)
            state.user = null;

            state.token = null;
        }
    }
})

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;