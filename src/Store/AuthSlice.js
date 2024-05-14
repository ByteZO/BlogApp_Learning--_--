import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: false,
  useData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(state, action) {
      state.state = true;
      state.useData = action.payload.useData;
    },
    logOut(state) {
      state.state = false;
      state.useData = null;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
