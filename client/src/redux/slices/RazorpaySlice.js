import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/AxiosInstance";

const initialState = {
    key: "",
    subscription_id: "",
    isPaymentVarified:  false,
    allPayments: {},
    finalMonth: {},
    monthlySalesRecord: []
}

export const  getRazorPayId = createAsyncThunk("/rozorpay/getId", async() => {
    try {
        const response = await axiosInstance.get("/payments/razorpay-key")
        return response.data;
    } catch (error) {
        toast.error("Failed to load data");
    }
})

export const  purchaseCourseBundle = createAsyncThunk("/purchaseCourse", async() => {
    try {
        const response = await axiosInstance.post("/payments/subscribe")
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const  verifyUserPayment = createAsyncThunk("/payments/verify", async(data) => {
    try {
        const response = await axiosInstance.post("/payments/verify", {
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_subscription_id: data.razorpay_subscription_id,
            razorpay_signature: data.razorpay_signature
        })
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const getPaymentRecord = createAsyncThunk("/payments/record", async(data) => {
    try {
        const response = axiosInstance.get("/payments?count=100");
        toast.promise(response, {
            loading: "Getting the payments records",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to get payments records"
        })
        return (await response).data
    } catch (error) {
        toast.error("Opration failed");
    }
});

export const cancelCourseBundle = createAsyncThunk("/payments/cancel", async(data) => {
    try {
        const response = axiosInstance.post("/payments/unsubscribe");
        toast.promise(response, {
            loading: "Unsubscribing the bundle",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to unsubscribe"
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

const razorpaySlice = createSlice({
    name: "razorpay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getRazorPayId.fulfilled, (state, action) => {
            state.key = action?.payload?.key;
        })
        .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
            state.subscription_id = action?.payload?.subscription_id;
        })
        .addCase(verifyUserPayment.fulfilled, (state, action) => {
            toast.success(action?.payload?.success);
            state.isPaymentVarified = action?.payload?.success;
        })
        .addCase(verifyUserPayment.rejected, (state, action) => {
            toast.success(action?.payload?.success);
            state.isPaymentVarified = action?.payload?.success;
        })
        .addCase(getPaymentRecord.fulfilled, (state, action) => {
            state.allPayments = action?.payload?.allPayments;
            state.finalMonth = action?.payload?.finalMonth;
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
        })
    }
})

export default razorpaySlice.reducer;