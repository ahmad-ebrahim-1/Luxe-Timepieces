import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth/authSlice";
import cartSlice from "./slices/cart/cartSlice";
import productsSlice from "./slices/products/productsSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    products: productsSlice,
  },
});

export default store;
