import { messageTypes } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';

type SliceState = { data: messageTypes[] };

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { data: [] } as SliceState,
  reducers: {
    clearMessages(state) {
      state.data = [];
    },
    receiveMessages(state, { payload }) {
      state.data = payload.messages;
    },
  },
});

export const messageSliceAction = messagesSlice.actions;
export default messagesSlice;
