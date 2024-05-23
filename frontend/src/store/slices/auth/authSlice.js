import { createSlice } from "@reduxjs/toolkit";

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

  extraReducers: (builder) => {},
});

export default authSlice.reducer;
export const { authOperationCompleted } = authSlice.actions;
