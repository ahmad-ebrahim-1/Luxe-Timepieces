import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
    totalPrice: 0,
  },

  reducers: {
    addToCart: (state, action) => {
      const prev = state.items.find((item) => item.id === action.payload.id);

      if (prev) {
        state.items.forEach((item) => {
          if (prev.id === item.id) {
            item.quantity++;
            item.finalPrice = item.price * item.quantity;
          }
        });
      } else {
        state.items.unshift({
          ...action.payload,
          finalPrice: action.payload.price * action.payload.quantity,
        });
      }

      state.totalPrice = state.totalPrice + action.payload.price;
    },

    removeItem: (state, action) => {
      const removedItem = state.items.find(
        (item) => item.id === action.payload
      );
      state.items = state.items.filter((item) => item.id !== removedItem.id);
      state.totalPrice -= removedItem.finalPrice;
    },

    updateQuantity: (state, action) => {
      state.items.forEach((item) => {
        if (item.id === action.payload.id) {
          if (item.quantity + action.payload.amount > 0) {
            item.quantity = item.quantity + action.payload.amount;
            state.totalPrice += item.price * action.payload.amount;
          }
          item.finalPrice = item.price * item.quantity;
        }
      });
    },
  },

  extraReducers: (builder) => {},
});

export default cartSlice.reducer;
export const { addToCart, removeItem, updateQuantity } = cartSlice.actions;
