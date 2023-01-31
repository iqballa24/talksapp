import { createSlice } from '@reduxjs/toolkit';

const chatsSlice = createSlice({
  name: 'chats',
  initialState: {
    list: {},
    selectedChat: {
      chatId: null,
      user: { uid: '', displayName: '', photoURL: '' },
    },
  },
  reducers: {
    receiveChatsUser(state, { payload }) {
      state.list = payload;
    },

    resetChatsUser(state) {
      state.list = {};
    },

    selectChat(state, { payload }) {
      state.selectedChat.chatId = payload.uid;
      state.selectedChat.user = payload;
    },
  },
});

export const chatsSliceAction = chatsSlice.actions;
export default chatsSlice;
