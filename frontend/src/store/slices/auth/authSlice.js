import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
import Cookies from "universal-cookie";
import { clearFavs } from "../favs/favsSlice";
import { clearItems } from "../cart/cartSlice";

const cookie = new Cookies();

// login
export const login = createAsyncThunk(
  "auth/login",
  async (params, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(`/login`, params);
      if (res.status === 200) {
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

// register
export const register = createAsyncThunk(
  "auth/register",
  async (params, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(`/register`, params);
      if (res.status === 200) {
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

//logout
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;
  try {
    const res = await axios.post(`/logout`);
    if (res.status === 200) {
      cookie.remove("access_token");
      dispatch(clearFavs());
      dispatch(clearItems());
      return {
        data: res.data,
      };
    }
  } catch (error) {
    return rejectWithValue(error);
  }
});

// get authenticated user
export const getAuthenticatedUser = createAsyncThunk(
  "auth/getAuthenticatedUser",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(`/user`);
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

const authSlice = createSlice({
  name: "auth",

  initialState: {
    isLoading: false,
    error: null,
    user: null,
    status: false,
    message: "",
  },

  reducers: {
    authOperationCompleted: (state) => {
      state.error = null;
      state.status = false;
      state.message = "";
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
        state.user = action.payload.data.user;
        state.status = true;
        state.message = `Login successful, Welcome back ${
          state.user.first_name + " " + state.user.last_name
        }`;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = true;
        state.message =
          "There is an error, please enter your email and password correctly";
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
        state.user = action.payload.data.user;
        state.status = true;
        state.message = `Register successful, Welcome ${
          state.user.first_name + " " + state.user.last_name
        }`;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = true;
        state.message = "There is an error, please try again later";
      });
    // logout
    builder
      .addCase(logout.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.user = null;
        state.status = true;
        state.message = "Logout successful";
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = true;
        state.message = "There is an error, please try again later";
      });
    // get authenticated user
    builder
      .addCase(getAuthenticatedUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getAuthenticatedUser.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.user = action.payload.data;
        state.status = true;
        state.message = `Authenticated as ${
          state.user.first_name + " " + state.user.last_name
        }`;
      })
      .addCase(getAuthenticatedUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = true;
        state.message = "Unauthenticated";
      });
  },
});

export default authSlice.reducer;
export const { authOperationCompleted } = authSlice.actions;
