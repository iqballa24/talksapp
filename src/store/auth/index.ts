import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticate: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser(state, { payload }) {
      state.user = payload;
      if (payload.emailVerified) {
        state.isAuthenticate = true;
      }else{
        state.isAuthenticate = false;
      }
    },

    unSetCurrentUser(state) {
      state.user = null;
      state.isAuthenticate = false;
    },
  },
});

export const authSliceAction = authSlice.actions;
export default authSlice;
