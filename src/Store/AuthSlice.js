import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: false,
  useData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(state, actions) {
      state.state = true;
      state.useData = actions.payload.useData;
    },
    logOut(state) {
      state.state = true;
      state.useData = null;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
