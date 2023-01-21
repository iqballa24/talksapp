import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: !!localStorage.getItem('darkMode'),
  accentColor: localStorage.getItem('accentColor') ?? 'primary',
  language: localStorage.getItem('language') ?? 'en',
  showModalTheme: false,
  showModalLang: false,
  showModalColors: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state, { payload }) {
      state.isDarkMode = payload;
    },
    changeAccentColor(state, { payload }) {
      state.accentColor = payload;
    },
    changeLanguage(state, { payload }) {
      state.language = payload;
    },
    toggleModalTheme(state) {
      state.showModalTheme = !state.showModalTheme;
    },
    toggleModalLang(state) {
      state.showModalLang = !state.showModalLang;
    },
    toggleModalColors(state) {
      state.showModalColors = !state.showModalColors;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
