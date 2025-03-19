// services/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    removeToken: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
