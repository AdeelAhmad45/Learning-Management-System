import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/AxiosInstance";

const initialState = {
    courseData: []
}

export const getAllCourses = createAsyncThunk("/course/get", async() => {
    try {
        const response = axiosInstance.get("/courses");
        toast.promise(response, {
            loading: "loading course data...",
            success: "Course loaded successfully",
            error: "Failed to get course"
        });
        return (await response).data.courses
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const deleteCourse = createAsyncThunk("/course/delete", async(id) => {
    try {
        const response = axiosInstance.delete(`/courses/${id}`);
        toast.promise(response, {
            loading: "Deleting course data...",
            success: "Course deleted successfully",
            error: "Failed to delete course"
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const createNewCourse = createAsyncThunk("/course/create", async(data) => {
    try {
        let formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("category", data?.category);
        formData.append("createdBy", data?.createdBy);
        formData.append("thumbnail", data?.thumbnail);
    
        const res = axiosInstance.post("/courses", formData);
        toast.promise(res, {
            loading: "Creating a new course",
            success: "Course created successfully",
            error: "Failed to create course"
        })
    
        return (await res).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if (action.payload) {
                console.log(action.payload);
                state.courseData = [...action.payload];
            }
        })
    }
});

export default courseSlice.reducer;