import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../config/config";


const initialState = {
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null
};

export const signupUser = createAsyncThunk('user/signup', async (userData) => {
    try {
        const response = await axios.post(`${baseUrl}user/signup`, userData, { withCredentials: true });
        return response.data;
    } catch (error) {
        return error.response?.data;
    }
});

export const loginUser = createAsyncThunk('user/login', async (userData) => {
    try {
        const response = await axios.post(`${baseUrl}user/login`, userData, { withCredentials: true });
        return response.data;
    } catch (error) {
        return error.response?.data;
    }
});


export const checkAuth = createAsyncThunk('user/check-auth', async () => {
    try {
        const response = await axios.get(`${baseUrl}user/check-auth`, { withCredentials: true,headers: { 'Cache-Control': 'no-cache,no-store,must-revalidate,proxy-revalidate' } });
        return response.data;
    } catch (error) {
        return error.response?.data;
    }
});


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.isAuthenticated = false;
                state.isLoading = true;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.isLoading = false;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.isLoading = false;
                state.error = action.payload.message;
            })
            .addCase(loginUser.pending, (state) => {
                state.isAuthenticated = false;
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.isLoading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.isLoading = false;
                state.error = action.payload.message;
            })
    }
})

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;