import { messageTypes } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';

type SliceState = { data: messageTypes[]; filter: string };

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { data: [], filter: '' } as SliceState,
  reducers: {
    clearMessages(state) {
      state.data = [];
    },
    receiveMessages(state, { payload }) {
      state.data = payload;
    },
    changeFilterMessage(state, { payload }) {
      state.filter = payload;
    },
  },
});

export const messageSliceAction = messagesSlice.actions;
export default messagesSlice;
