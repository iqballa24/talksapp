import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  resultSearch: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    searchUsers(state, { payload }) {
      state.resultSearch = payload;
    },
  },
});

export const usersSliceAction = usersSlice.actions;
export default usersSlice;
