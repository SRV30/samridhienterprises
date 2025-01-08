import axiosInstance from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUserDetails = createAsyncThunk(
  "userDetails/getUserDetails", 
  async (id, { rejectWithValue }) => {  
    try {
      const response = await axiosInstance.get(`/admin/user/${id}`);
      return response.data.user;  
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Get single user failed!" }
      );
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch user details";
      });
  },
});

export const { clearError } = userDetailsSlice.actions;
export const selectUserDetails = (state) => state.userDetails;
export default userDetailsSlice.reducer;