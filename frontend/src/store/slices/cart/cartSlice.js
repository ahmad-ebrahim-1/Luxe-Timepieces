import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

// add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (prod_id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      console.log(`adding to cart...`);
      const res = await axios.post(`/products/${prod_id}/basket`);
      console.log(res);
      if (res.status === 201) {
        console.log("SUCCESS, item added.");
        return {
          data: res.data,
        };
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",

  initialState: {
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
  },

  extraReducers: (builder) => {
    // add to cart
    builder
      .addCase(addToCart.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.operationError = null;
        state.operationError = false;
        state.status = true;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });
  },
});

export default cartSlice.reducer;
export const { removeItem, updateQuantity, cartOperationCompleted } =
  cartSlice.actions;
