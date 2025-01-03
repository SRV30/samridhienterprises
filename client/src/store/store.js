import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth";
import userDetailsReducer from "@/store/auth/userDetails";
import usersReducer from "@/store/auth/allUsers";
import passwordReducer from "@/store/auth/forgotPassword";
import profileReducer from "@/store/auth/profile";
import productsReducer from "@/store/products/productsSlice";
import productDetailsReducer from "@/store/products/productDetailsSlice";
import contactReducer from "@/store/extra/contactSlice";
import aboutUsReducer from "@/store/extra/aboutUsSlice";
import cartReducer from "@/store/extra/cartSlice";
import orderReducer from "@/store/orders/orderSlice";
import paymentDetailsReducer from "@/store/extra/paymentDetailsSlice";
import singleOrderReducer from "@/store/orders/singleOrderSlice";
import adminDataReducer from "@/store/extra/adminDataSlice";
import adminOrdersReducer from "@/store/orders/adminOrderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    userDetails: userDetailsReducer,
    getUsers: usersReducer,
    password: passwordReducer,
    profile: profileReducer,
    products: productsReducer,
    productDetails: productDetailsReducer,
    contact: contactReducer,
    aboutUs: aboutUsReducer,
    cart: cartReducer,
    order: orderReducer,
    paymentDetails: paymentDetailsReducer,
    singleOrder: singleOrderReducer,
    adminData: adminDataReducer,
    adminOrders: adminOrdersReducer,
  },
});

export default store;
