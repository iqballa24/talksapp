import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  resultSearch: [],
  listFriends: [],
  totalRequests: 0,
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
    receiveTotalRequests(state, { payload }) {
      state.totalRequests = payload;
    },
    resetListFriends(state) {
      state.listFriends = [];
    },
  },
});

export const usersSliceAction = usersSlice.actions;
export default usersSlice;
