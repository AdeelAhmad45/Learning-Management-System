import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/AuthSlice";
import courseSliceReducer from "./slices/CourseSlice";
import razorpaySliceReducer from "./slices/RazorpaySlice";
import lectureSliceReducer from "./slices/LectureSlice";
import statSliceReducer from "./slices/StatSlice";

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course: courseSliceReducer,
        razorpay: razorpaySliceReducer,
        lecture: lectureSliceReducer,
        stat: statSliceReducer
    },
    devTools: true
});

export default store;