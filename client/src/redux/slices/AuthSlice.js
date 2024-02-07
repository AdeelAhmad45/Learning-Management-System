import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/AxiosInstance";
import toast from "react-hot-toast";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: JSON.parse(localStorage.getItem('data')) || {}
}

export const createAccount = createAsyncThunk("auth/signup", async(data) => {
    try {
        const res = axiosInstance.post("user/register", data);
        toast.promise(res, {
            loading: "Wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account"
        });
        
        return (await res).data
    } catch (error) {
       toast.error(error?.response?.data?.message) 
    }
})

export const login = createAsyncThunk("auth/login", async(data) => {
    try {
        const res = axiosInstance.post("user/login", data);
        toast.promise(res, {
            loading: "Wait! authentication in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to login"
        });
        
        return (await res).data
    } catch (error) {
       toast.error(error?.response?.data?.message) 
    }
}) 

export const logout = createAsyncThunk("auth/logout", async() => {
    try {
        const res = axiosInstance.post("user/logout");
        toast.promise(res, {
            loading: "Wait! logout in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to logout"
        });
        
        return (await res).data
    } catch (error) {
       toast.error(error?.response?.data?.message) 
    }
}) 

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })
        .addCase(logout.fulfilled, (state) => {
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role = "";
        })
    }
})

export default authSlice.reducer;