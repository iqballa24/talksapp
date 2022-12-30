import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: !!localStorage.getItem('darkMode'),
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state, { payload }) {
      state.isDarkMode = payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
