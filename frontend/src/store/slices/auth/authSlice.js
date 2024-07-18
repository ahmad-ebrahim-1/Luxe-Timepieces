import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
import Cookies from "universal-cookie";

const cookie = new Cookies();

// login
export const login = createAsyncThunk(
  "auth/login",
  async (params, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      console.log("login loading...");
      const res = await axios.post(`/login`, params);
      if (res.status === 200) {
        console.log(res);
        console.log("SUCCESS, login.");
        cookie.set("access_token", res.data.access_token);
        return {
          data: res.data,
        };
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// login
export const register = createAsyncThunk(
  "auth/register",
  async (params, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      console.log("register loading...");
      const res = await axios.post(`/register`, params);
      if (res.status === 200) {
        console.log(res);
        console.log("SUCCESS, register.");
        cookie.set("access_token", res.data.access_token);
        return {
          data: res.data,
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
    user: null,
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
        state.status = true;
        state.user = action.payload.data.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = true;
      });
    // register
    builder
      .addCase(register.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.status = true;
        state.user = action.payload.data.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = true;
      });
  },
});

export default authSlice.reducer;
export const { authOperationCompleted } = authSlice.actions;
