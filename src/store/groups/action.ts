import {
  createGroup,
  getDetailMember,
  sendRequestMember,
  updateDocument,
  updateProfileGroup,
} from '@/lib/firebase/API';
import { RootState } from '@/store';
import { groupsSliceAction } from '@/store/groups';
import { Dispatch } from '@reduxjs/toolkit';
import { DocumentData } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

function asyncCreateNewGroup({ subject, description, photo }: DocumentData) {
  return async () => {
    try {
      if (!photo) throw Error('Upload profile picture first');
      if (subject === '') throw Error('Set your group subject');

      const promise = createGroup({ subject, description, photo });

      toast.promise(promise, {
        loading: 'Loading...',
        success: 'New group successfully added',
        error: 'Failed to add a new group',
      });

      await promise;
      return true;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Something went wrong');
        console.log('Unexpected error', err);
      }
      return false;
    }
  };
}

function asyncGetDetailMember(member: string[]) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(showLoading());

      const res = await getDetailMember(member);
      const data = res.map((item) => item[0]);

      dispatch(groupsSliceAction.receiveDetailMember(data));
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

function asyncAddNewMembers(uid: string) {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { group } = getState();

    const data = { member: [...group.selectedGroup.member, uid] };

    const checkUserHasAdd = group.selectedGroup.member.includes(uid);

    try {
      if (checkUserHasAdd)
        throw new Error('You had sent a request to this user');

      const promise = sendRequestMember({
        uid,
        idGroup: group.selectedGroup.idGroup,
        data,
      });

      toast.promise(promise, {
        loading: 'Loading..',
        success: 'Request send successfully',
        error: 'Failed',
      });

      dispatch(groupsSliceAction.addMember(uid));

      await promise;
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

function asyncUpdateImageGroup({ id, subject, file }: DocumentData) {
  return async (dispatch: Dispatch) => {
    try {
      const promise = updateProfileGroup({ id, subject, file });

      toast.promise(promise, {
        loading: 'Loading..',
        success: 'Photo changed successfully',
        error: 'Error when uploading',
      });

      const res = await promise;
      dispatch(groupsSliceAction.setPhotoSelectedGroup(res));
      return res;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Ops, Something went wrong');
        console.log('Unexpected error', err);
      }
    }
  };
}

function asyncUpdateGroup(id: string, data: DocumentData) {
  return async (dispatch: Dispatch) => {
    try {
      const promise = updateDocument({ collection: 'groups', data, id });

      toast.promise(promise, {
        loading: 'Loading..',
        success: 'Saved',
        error: 'Failed',
      });

      const res = promise;

      dispatch(groupsSliceAction.setSubjectSelectedGroup(data.subject));
      dispatch(groupsSliceAction.setDescriptionSelectedGroup(data.description));

      return res;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Ops, Something went wrong');
        console.log('Unexpected error', err);
      }
    }
  };
}

export {
  asyncCreateNewGroup,
  asyncGetDetailMember,
  asyncAddNewMembers,
  asyncUpdateImageGroup,
  asyncUpdateGroup
};
