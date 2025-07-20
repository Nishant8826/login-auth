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
        const response = await axios.get(`${baseUrl}user/check-auth`, { withCredentials: true, });
        return response.data;
    } catch (error) {
        return error.response?.data;
    }
});

export const logout = createAsyncThunk('user/logout', async () => {
    try {
        const response = await axios.post(`${baseUrl}user/logout`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        return error.response?.data;
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => { }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.isAuthenticated = false;
                state.isLoading = true;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.isAuthenticated = action.payload.success;
                state.user = action.payload?.user ? action.payload?.user : null;
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
                state.isAuthenticated = action.payload.success;
                state.user = action.payload?.user ? action.payload?.user : null;
                state.isLoading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.isLoading = false;
                state.error = action.payload.message;
            })
            .addCase(checkAuth.pending, (state) => {
                state.isAuthenticated = false;
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isAuthenticated = action.payload.success;
                state.user = action.payload?.user ? action.payload?.user : null;
                state.isLoading = false;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.isLoading = false;
                state.error = action.payload.message;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.isLoading = false;
                state.user = null;
            })
    }
})

export const { setUser } = authSlice.actions;
export default authSlice.reducer;