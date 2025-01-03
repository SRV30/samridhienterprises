import axiosInstance from "@/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  product: {},
  loading: false,
  error: null,
};

export const getProductDetails = createAsyncThunk(
  "productDetails/getProductDetails",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/product/${productId}`);
      return response.data.product;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productDetailsSlice.reducer;
