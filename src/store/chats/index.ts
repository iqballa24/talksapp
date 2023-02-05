import { userTypes } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';

export type chatsSliceTypes = {
  list: {
    status: string;
    chatId: string;
    date: number;
    userInfo: userTypes;
  }[];
  hasArchive: boolean;
  selectedChat: {
    chatId: string | null;
    status: string;
    user: userTypes;
  };
  filter: string;
};

const initialState: chatsSliceTypes = {
  list: [],
  selectedChat: {
    chatId: null,
    status: "",
    user: { uid: '', displayName: '', photoURL: '', about: '', email: '' },
  },
  hasArchive: false,
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
        status: '',
        user: { uid: '', displayName: '', photoURL: '', about: '', email: '' },
      };
    },

    selectChat(state, { payload }) {
      state.selectedChat.chatId = payload.chatId;
      state.selectedChat.status = payload.status;
      state.selectedChat.user = payload;
    },

    changeFilterChat(state, { payload }) {
      state.filter = payload;
    },

    hasArchive(state, { payload }) {
      state.hasArchive = payload;
    },
  },
});

export const chatsSliceAction = chatsSlice.actions;
export default chatsSlice;
