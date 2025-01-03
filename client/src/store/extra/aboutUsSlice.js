import axiosInstance from '@/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAboutUs = createAsyncThunk('aboutUs/fetchAboutUs', async () => {
  const response = await axiosInstance.get('/get/about-us');
  return response.data;
});

export const updateAboutUs = createAsyncThunk(
  'aboutUs/updateAboutUs',
  async (data) => {
    const response = await axiosInstance.put('/update/about-us', data);
    return response.data;
  }
);

const aboutUsSlice = createSlice({
  name: 'aboutUs',
  initialState: {
    aboutUs: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutUs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAboutUs.fulfilled, (state, action) => {
        state.loading = false;
        state.aboutUs = action.payload;
        state.error = null;
      })
      .addCase(fetchAboutUs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.aboutUs = null;
      })
      .addCase(updateAboutUs.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAboutUs.fulfilled, (state, action) => {
        state.loading = false;
        state.aboutUs = action.payload;
        state.error = null;
      })
      .addCase(updateAboutUs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default aboutUsSlice.reducer;
