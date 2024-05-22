import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    isLoading: false,
    error: null,
    user: {},
    userLoggedIn: false,
  },

  reducers: {},

  extraReducers: (builder) => {},
});

export default authSlice.reducer;
