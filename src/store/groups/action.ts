import { createGroup, getDetailMember } from '@/lib/firebase/API';
import { groupsSliceAction } from '@/store/groups';
import { Dispatch } from '@reduxjs/toolkit';
import { DocumentData } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

function asyncCreateNewGroup({ subject, description, photo }: DocumentData) {
  return async () => {
    try {
      const promise = createGroup({ subject, description, photo });

      toast.promise(promise, {
        loading: 'Loading...',
        success: 'New group successfully added',
        error: 'Failed to add a new group',
      });

      const res = await promise;
      return res;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Something went wrong');
        console.log('Unexpected error', err);
      }
    }
  };
}

function asyncGetDetailMember(member: string[]) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(showLoading());
      const res = await getDetailMember(member);
      dispatch(groupsSliceAction.receiveDetailMember(res[0]));
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Something went wrong');
        console.log('Unexpected error', err);
      }
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { asyncCreateNewGroup, asyncGetDetailMember };
