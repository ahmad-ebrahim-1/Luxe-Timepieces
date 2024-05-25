import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth/authSlice";
import cartSlice from "./slices/cart/cartSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
  },
});

export default store;
