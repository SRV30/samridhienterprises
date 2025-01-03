import axiosInstance from '@/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAdminData = createAsyncThunk(
  'admin/fetchAdminData',
  async () => {
    try {
      const response = await axiosInstance.get('/admin/data'); 
      return response.data;
    } catch (error) {
      throw Error(error.message || 'Error fetching data');
    }
  }
);

const initialState = {
  usersCount: 0,
  productsCount: 0,
  ordersCount: 0,
  earnings: [],
  loading: false,
  error: null,
};

const adminDataSlice = createSlice({
  name: 'adminData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminData.fulfilled, (state, action) => {
        state.loading = false;
        state.usersCount = action.payload.usersCount;
        state.productsCount = action.payload.productsCount;
        state.ordersCount = action.payload.ordersCount;
        state.earnings = action.payload.earnings;
      })
      .addCase(fetchAdminData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adminDataSlice.reducer;
