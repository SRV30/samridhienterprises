import axiosInstance from "@/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all orders
export const fetchAllOrders = createAsyncThunk(
  "adminOrders/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/admin/orders", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      await axiosInstance.put(
        `/admin/order/${orderId}`,
        { status },
        { withCredentials: true }
      );
      return { orderId, status };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update order status"
      );
    }
  }
);

// Delete order
export const deleteOrder = createAsyncThunk(
  "adminOrders/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/admin/order/${orderId}`, {
        withCredentials: true,
      });
      return orderId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete order"
      );
    }
  }
);

// Bulk update orders
export const bulkUpdateOrders = createAsyncThunk(
  "adminOrders/bulkUpdateOrders",
  async ({ orderIds, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/admin/orders/bulk-update`,
        { orderIds, status },
        { withCredentials: true }
      );
      return response.data.orders;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to bulk update orders"
      );
    }
  }
);

// Admin Order Slice
const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    totalAmount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all orders
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.totalAmount = action.payload.totalAmount;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update order status
    builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { orderId, status } = action.payload;
        const order = state.orders.find((order) => order._id === orderId);
        if (order) {
          order.orderStatus = status;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete order
    builder
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Bulk update orders
    builder
      .addCase(bulkUpdateOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(bulkUpdateOrders.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrders = action.payload;
        state.orders = state.orders.map(
          (order) =>
            updatedOrders.find((updated) => updated._id === order._id) || order
        );
      })
      .addCase(bulkUpdateOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
