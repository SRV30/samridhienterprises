import axiosInstance from "@/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSingleOrder = createAsyncThunk(
  "singleOrder/fetchSingleOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/order/${orderId}`);
      return data.order;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch the order"
      );
    }
  }
);

const singleOrderSlice = createSlice({
  name: "singleOrder",
  initialState: {
    loading: false,
    order: null, 
    error: null,
  },
  reducers: {
    clearSingleOrderError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchSingleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong!";
      });
  },
});

export const { clearSingleOrderError } = singleOrderSlice.actions;
export default singleOrderSlice.reducer;
