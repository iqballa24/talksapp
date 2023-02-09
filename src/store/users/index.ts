import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  resultSearch: [],
  listFriends: [],
  totalRequests: 0,
  selectedUser: {
    uid: '',
    displayName: '',
    photoURL: '',
    about: '',
    email: '',
  },
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
    selectUser(state, { payload }) {
      state.selectedUser = payload;
    },
  },
});

export const usersSliceAction = usersSlice.actions;
export default usersSlice;
