import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api";

export const addItemsToCart = createAsyncThunk(
  "cart/addItemsToCart",
  async ({ id, quantity }, { getState, rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/product/${id}`);
      if (!data.product) throw new Error("Product not found");

      const item = {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
      };

      const cartItems = [...getState().cart.cartItems, item];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return item;
    } catch (error) {
      console.error("Add to Cart Error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item to cart"
      );
    }
  }
);

export const removeItemsFromCart = createAsyncThunk(
  "cart/removeItemsFromCart",
  async (id, { getState }) => {
    const cartItems = getState().cart.cartItems.filter(
      (item) => item.product !== id
    );

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    return id;
  }
);

export const saveShippingInfo = createAsyncThunk(
  "cart/saveShippingInfo",
  async (data) => {
    localStorage.setItem("shippingInfo", JSON.stringify(data));
    return data;
  }
);

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  shippingInfo: JSON.parse(localStorage.getItem("shippingInfo")) || {},
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemsToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemsToCart.fulfilled, (state, action) => {
        state.loading = false;

        const itemIndex = state.cartItems.findIndex(
          (item) => item.product === action.payload.product
        );
        if (itemIndex >= 0) {
          state.cartItems[itemIndex].quantity = action.payload.quantity;
        } else {
          state.cartItems.push(action.payload);
        }
      })
      .addCase(addItemsToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeItemsFromCart.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (item) => item.product !== action.payload
        );
      })

      .addCase(saveShippingInfo.fulfilled, (state, action) => {
        state.shippingInfo = action.payload;
      });
  },
});

export const { clearError } = cartSlice.actions;
export default cartSlice.reducer;
