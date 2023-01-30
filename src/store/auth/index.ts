import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticate: !!localStorage.getItem('isAuthenticate'),
  user: {
    uid: '-',
    displayName: '-',
    email: '-',
    photoURL: '',
    about: '-',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser(state, { payload }) {
      state.user = payload;
      if (payload.emailVerified) {
        state.isAuthenticate = true;
        localStorage.setItem('isAuthenticate', 'true');
      } else {
        state.isAuthenticate = false;
        localStorage.removeItem('isAuthenticate');
      }
    },

    unSetCurrentUser(state) {
      state.user = initialState.user;
      state.isAuthenticate = false;
      localStorage.removeItem('isAuthenticate');
    },

    updateCurrentUser(state, { payload }) {
      state.user = { ...state.user, ...payload };
    },
  },
});

export const authSliceAction = authSlice.actions;
export default authSlice;
