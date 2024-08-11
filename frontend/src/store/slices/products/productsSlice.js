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

// get product details
export const getProductDetails = createAsyncThunk(
  "products/getProductDetails",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(`/products/${id}`);
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

// add product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(`/products`, data);
      if (res.status === 201) {
        return {
          data: res.data,
        };
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// edit product
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (params, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(`/products/${params.id}`, params.data);
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

// delete product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(`/products/${id}`);
      if (res.status === 200) {
        return {
          prod_id: id,
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
    productDetails: null,
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
    // get product details
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    // add product
    builder
      .addCase(addProduct.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });
    // edit product
    builder
      .addCase(editProduct.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });
    // delete product
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;

        state.products = state.products.filter(
          (product) => product.id !== action.payload.prod_id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });
  },
});

export default productsSlice.reducer;
export const { productOperationCompleted } = productsSlice.actions;
