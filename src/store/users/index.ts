import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  resultSearch: [],
  listFriends: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    searchUsers(state, { payload }) {
      state.resultSearch = payload;
    },
    receiveListFriends(state, { payload }) {
      state.listFriends = payload;
    },
    resetListFriends(state) {
      state.listFriends = [];
    },
  },
});

export const usersSliceAction = usersSlice.actions;
export default usersSlice;
