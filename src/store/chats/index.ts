import { userTypes } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';

export type chatsSliceTypes = {
  list: {
    chatId: string;
    date: number;
    userInfo: userTypes;
  }[];
  selectedChat: {
    chatId: string | null;
    user: userTypes;
  };
  filter: string;
};

const initialState: chatsSliceTypes = {
  list: [],
  selectedChat: {
    chatId: null,
    user: { uid: '', displayName: '', photoURL: '', about: '', email: '' },
  },
  filter: '',
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    receiveChatsUser(state, { payload }) {
      state.list = payload;
    },

    resetChatsState(state) {
      state.list = [];
      state.selectedChat = {
        chatId: null,
        user: { uid: '', displayName: '', photoURL: '', about: '', email: '' },
      };
    },

    selectChat(state, { payload }) {
      state.selectedChat.chatId = payload.chatId;
      state.selectedChat.user = payload;
    },

    changeFilterChat(state, {payload}){
      state.filter = payload;
    }
  },
});

export const chatsSliceAction = chatsSlice.actions;
export default chatsSlice;
