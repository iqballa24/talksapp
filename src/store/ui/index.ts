import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: !!localStorage.getItem('darkMode'),
  accentColor: localStorage.getItem('accentColor') ?? 'primary',
  language: localStorage.getItem('language') ?? 'en',
  showModalTheme: false,
  showModalLang: false,
  showModalColors: false,
  showModalAddNewFriends: false,
  showModalFilterMessage: false,
  showModalAddNewMembers: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state, { payload }) {
      state.isDarkMode = payload;
      if (payload) {
        localStorage.setItem('darkMode', 'dark');
      } else {
        localStorage.removeItem('darkMode');
      }
    },
    changeAccentColor(state, { payload }) {
      state.accentColor = payload;
      localStorage.setItem('accentColor', payload);
    },
    changeLanguage(state, { payload }) {
      state.language = payload;
      if (payload === 'en') {
        localStorage.setItem('language', payload);
      } else {
        localStorage.setItem('language', payload);
      }
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
    toggleModalAddNewFriends(state) {
      state.showModalAddNewFriends = !state.showModalAddNewFriends;
    },
    toggleModalFilterMessages(state) {
      state.showModalFilterMessage = !state.showModalFilterMessage;
    },
    toggleModalAddNewMembers(state) {
      state.showModalAddNewMembers = !state.showModalAddNewMembers;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
