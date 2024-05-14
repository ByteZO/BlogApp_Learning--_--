import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  useData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(state, action) {
      state.status = true;
      state.useData = action.payload.useData;
    },
    logOut(state) {
      state.status = false;
      state.useData = null;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
