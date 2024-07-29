import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

// get favorites
export const getFavorites = createAsyncThunk(
  "favs/getFavorites",
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
  "favs/toggleFavorite",
  async (product, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(`/products/favorite/${product.id}`);
      if (res.status === 200 || res.status === 201) {
        return { ...product };
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const favsSlice = createSlice({
  name: "favs",

  initialState: {
    isLoading: false,
    error: null,
    favs: [],
    status: false,
    operationLoading: false,
    operationError: null,
  },

  reducers: {
    favsOperationCompleted: (state) => {
      state.status = false;
      state.error = null;
    },

    clearFavs: (state) => {
      state.favs = [];
    },
  },

  extraReducers: (builder) => {
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

        if (action.payload && action.payload.id) {
          const isFav = state.favs.find(
            (product) => product.id === action.payload.id
          );
          if (!!isFav) {
            state.favs = state.favs.filter(
              (product) => product.id !== action.payload.id
            );
          } else {
            state.favs.unshift(action.payload);
          }
        }
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });
  },
});

export default favsSlice.reducer;
export const { favsOperationCompleted, clearFavs } = favsSlice.actions;
