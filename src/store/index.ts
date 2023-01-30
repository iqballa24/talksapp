import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import uiSlice from '@/store/ui';
import AuthSlice from '@/store/auth';
import usersSlice from '@/store/users';

const store = configureStore({
  reducer: {
    loadingBar: loadingBarReducer,
    ui: uiSlice.reducer,
    auth: AuthSlice.reducer,
    users: usersSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
