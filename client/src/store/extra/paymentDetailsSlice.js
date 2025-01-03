import axiosInstance from "@/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPaymentDetails = createAsyncThunk(
  "paymentDetails/fetchPaymentDetails",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/get/paymentDetails");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updatePaymentDetails = createAsyncThunk(
  "paymentDetails/updatePaymentDetails",
  async (paymentDetails, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axiosInstance.put(
        "/update/paymentDetails",
        paymentDetails,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const paymentDetailsSlice = createSlice({
  name: "paymentDetails",
  initialState: {
    paymentDetails: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetPaymentDetailsState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPaymentDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPaymentDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.paymentDetails = action.payload;
    });
    builder.addCase(fetchPaymentDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updatePaymentDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePaymentDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.paymentDetails = action.payload.paymentDetails;
    });
    builder.addCase(updatePaymentDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetPaymentDetailsState } = paymentDetailsSlice.actions;
export default paymentDetailsSlice.reducer;
