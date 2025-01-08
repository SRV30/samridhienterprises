import axiosInstance from "@/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const forgotPassword = createAsyncThunk(
  "password/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/password/forgot", { email });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Wrong email!");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "password/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/password/reset/${data.token}`,
        { password: data.password }
      );
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Password reset failed!"
      );
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  message: null,
};

const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearMessage(state) {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message =
          action.payload?.message || "Password reset email sent successfully";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "An error occurred while sending the reset email";
      })

      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message =
          action.payload?.message || "Password reset successfully";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "An error occurred while resetting the password";
      });
  },
});

export const { clearError, clearMessage } = passwordSlice.actions;
export default passwordSlice.reducer;
