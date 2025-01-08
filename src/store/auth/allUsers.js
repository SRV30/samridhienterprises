import axiosInstance from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllUser = createAsyncThunk(
  "getUsers/getAllUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/admin/users");
      return response.data.users;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Get all users failed!" }
      );
    }
  }
);

const usersSlice = createSlice({
  name: "getUsers",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearError } = usersSlice.actions;
export const selectUsers = (state) => state.getUsers;
export const selectLoading = (state) => state.getUsers.loading;
export const selectError = (state) => state.getUsers.error;
export default usersSlice.reducer;