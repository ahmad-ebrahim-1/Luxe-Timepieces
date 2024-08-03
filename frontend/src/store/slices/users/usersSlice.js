import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

// get users
export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(`/users`);
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

// delete user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(`/users/${id}`);
      if (res.status === 200) {
        return {
          user_id: id,
        };
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const usersSlice = createSlice({
  name: "users",

  initialState: {
    isLoading: false,
    error: null,
    users: [],
    status: false,
    operationLoading: false,
    operationError: null,
  },

  reducers: {
    usersOperationCompleted: (state) => {
      state.status = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // get users
    builder
      .addCase(getUsers.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.users = action.payload.data;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    // delete user
    builder
      .addCase(deleteUser.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;

        state.users = state.users.filter(
          (user) => user.id !== action.payload.user_id
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });
  },
});

export default usersSlice.reducer;
export const { usersOperationCompleted } = usersSlice.actions;
