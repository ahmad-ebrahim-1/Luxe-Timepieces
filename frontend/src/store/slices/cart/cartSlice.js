import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

// get cart items
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get("users/Basket");
      if (res.status === 200) {
        return {
          data: res.data,
        };
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(`/products/${product.id}/basket`);
      if (res.status === 201) {
        return {
          basket_id: res.data.basketItem.id,
          quantity: res.data.basketItem.quantity,
          product: product,
        };
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// delete item
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (basket_id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(`/basket/${basket_id}`);
      if (res.status === 200) {
        return {
          basket_id: basket_id,
        };
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// incease quantity
export const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async (basket_id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.patch(`/basket/increase/${basket_id}`);
      if (res.status === 200) {
        return {
          basket_id: basket_id,
        };
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// decrease quantity
export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async (basket_id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.patch(`/basket/decrease/${basket_id}`);
      if (res.status === 200) {
        return {
          basket_id: basket_id,
        };
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

function calculateTotalPrice(items) {
  let totalPrice = 0;
  items.forEach((item) => {
    totalPrice += parseFloat(item.product.sale_price) * parseInt(item.quantity);
  });

  return totalPrice.toFixed(2);
}

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    error: null,
    isLoading: false,
    items: [],
    operationLoading: false,
    operationError: null,
    status: false,
    totalPrice: 0,
  },

  reducers: {
    cartOperationCompleted: (state) => {
      state.operationError = null;
      state.status = false;
    },
    clearItems: (state) => {
      state.items = [];
    },
  },

  extraReducers: (builder) => {
    // get cart items
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.data;
        state.totalPrice = calculateTotalPrice(state.items);
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
    // add to cart
    builder
      .addCase(addToCart.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;

        state.items.unshift(action.payload);
        state.totalPrice = calculateTotalPrice(state.items);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });
    // delete cart item
    builder
      .addCase(deleteCartItem.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;

        state.items = state.items.filter(
          (item) => item.basket_id !== action.payload.basket_id
        );
        state.totalPrice = calculateTotalPrice(state.items);
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });
    // increase quantity
    builder
      .addCase(increaseQuantity.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;

        state.items = state.items.map((item) => {
          if (item.basket_id === action.payload.basket_id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return { ...item };
        });
        state.totalPrice = calculateTotalPrice(state.items);
      })
      .addCase(increaseQuantity.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });
    // decrease quantity
    builder
      .addCase(decreaseQuantity.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;

        state.items = state.items.map((item) => {
          if (item.basket_id === action.payload.basket_id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return { ...item };
        });
        state.totalPrice = calculateTotalPrice(state.items);
      })
      .addCase(decreaseQuantity.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });
  },
});

export default cartSlice.reducer;
export const { cartOperationCompleted, clearItems } = cartSlice.actions;
