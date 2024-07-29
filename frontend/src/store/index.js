import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth/authSlice";
import cartSlice from "./slices/cart/cartSlice";
import productsSlice from "./slices/products/productsSlice";
import favsSlice from "./slices/favs/favsSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    products: productsSlice,
    favs: favsSlice,
  },
});

export default store;
