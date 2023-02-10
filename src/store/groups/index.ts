import { groupInfoTypes, userTypes } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';

export type groupsSliceTypes = {
  list: {
    idGroup: string;
    invitedBy: string;
    status: string;
    groupInfo: groupInfoTypes;
  }[];
  detailMember: userTypes[];
  selectedGroup: groupInfoTypes;
};

const initialState: groupsSliceTypes = {
  list: [],
  selectedGroup: {
    idGroup: '',
    subject: '',
    description: '',
    photoURL: '',
    createdAt: 0,
    createdBy: '',
    member: [],
  },
  detailMember: [],
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    receiveListGroups(state, { payload }) {
      state.list = payload;
    },
    receiveDetailMember(state, { payload }) {
      state.detailMember = payload;
    },
    selectGroup(state, { payload }) {
      state.selectedGroup = payload;
    },
    addMember(state, { payload }) {
      state.selectedGroup.member.push(payload);
    },
  },
});

export const groupsSliceAction = groupsSlice.actions;
export default groupsSlice;
