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

// get favorites
export const getFavorites = createAsyncThunk(
  "products/getFavorites",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(`/users/favorites`);
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

// toggle favorite
export const toggleFavorite = createAsyncThunk(
  "products/toggleFavorite",
  async (product, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      console.log(`toggle fav with id: ${product.id}...`);
      const res = await axios.post(`/products/favorite/${product.id}`);
      if (res.status === 200) {
        console.log("SUCCESS, fav toggled.", product.id);
        return {
          data: product,
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
    favs: [],
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

    // get favs
    builder
      .addCase(getFavorites.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.favs = action.payload.data;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // toggle fav
    builder
      .addCase(toggleFavorite.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });
  },
});

export default productsSlice.reducer;
export const { productOperationCompleted } = productsSlice.actions;
