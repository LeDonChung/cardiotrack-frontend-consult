import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/APIClient"; 

const initialState = {
    errorResponse: null
};

const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get(`/api/v1/user/info?token=${token}`);
        return response.data; // Trả về dữ liệu người dùng
    } catch (error) {
        return rejectWithValue(error.response?.data || "Lỗi API không lấy được thông tin user.");
    }
});

const login = createAsyncThunk('user/login', async (request, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/api/v1/auth/login', request);
        console.log("🚀 ~ file: UserSlice.js:20 ~ login ~ response:", response);
        
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Lỗi khi gọi API đăng nhập.");
    }
});

const UserSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},

    extraReducers: (builder) => {
         // fetchUserInfo
         builder.addCase(fetchUserInfo.pending, (state) => {
            state.errorResponse = null;
        });
        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
            localStorage.setItem("userInfo", JSON.stringify(action.payload.data));
            login(action.payload.data);
            state.errorResponse = null;
        });
        builder.addCase(fetchUserInfo.rejected, (state, action) => {
            state.errorResponse = action.payload;
        });

        // login
        builder.addCase(login.pending, (state, action) => {
            state.errorResponse = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            localStorage.setItem('token', action.payload.data);
            state.errorResponse = null;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.errorResponse = action.payload;
        });
    }
});

export const { } = UserSlice.actions;
export {fetchUserInfo, login}; 
export default UserSlice.reducer;