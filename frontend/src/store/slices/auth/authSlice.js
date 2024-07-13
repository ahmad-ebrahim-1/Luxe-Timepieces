import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

// login
export const login = createAsyncThunk(
  "auth/login",
  async (params, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      console.log("login loading...");
      const res = await axios.get(`/login`, params);
      if (res.status === 200) {
        console.log("SUCCESS, login.");
        return {
          data: res.data.data,
        };
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState: {
    isLoading: false,
    error: null,
    user: {},
    status: false,
  },

  reducers: {
    authOperationCompleted: (state) => {
      state.error = null;
      state.status = false;
    },
  },

  extraReducers: (builder) => {
    // login
    builder
      .addCase(login.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { authOperationCompleted } = authSlice.actions;
