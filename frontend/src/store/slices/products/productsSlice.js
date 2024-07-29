import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

// get products
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(`/products`);
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

const productsSlice = createSlice({
  name: "products",

  initialState: {
    isLoading: false,
    error: null,
    products: [],
    status: false,
    operationLoading: false,
    operationError: null,
  },

  reducers: {
    productOperationCompleted: (state) => {
      state.status = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // get products
    builder
      .addCase(getProducts.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.products = action.payload.data;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
export const { productOperationCompleted } = productsSlice.actions;
