import { Dispatch } from '@reduxjs/toolkit';
import {
  getUserByUserName,
  updateDocument,
  uploadImage,
} from '@/lib/firebase/API';
import { usersSliceAction } from '@/store/users';
import { authSliceAction } from '@/store/auth';
import { toast } from 'react-hot-toast';
import { DocumentData } from 'firebase/firestore';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

function asyncSearchUsers(username: string) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(showLoading());
      const res = await getUserByUserName(username);
      dispatch(usersSliceAction.searchUsers(res.data));
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

function asyncUpdateUser(id: string, data: DocumentData) {
  return async (dispatch: Dispatch) => {
    try {
      toast.success('Saved');
      dispatch(authSliceAction.updateCurrentUser(data));
      const res = await updateDocument(id, data);
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

function asyncUpdateImageUser({ uid, displayName, file }: DocumentData) {
  return async (dispatch: Dispatch) => {
    try {
      const promise = uploadImage({ uid, displayName, file });

      toast.promise(promise, {
        loading: 'Loading..',
        success: 'Photo changed successfully',
        error: 'Error when uploading',
      });

      const res = await promise;
      await dispatch(authSliceAction.updateCurrentUser({ photoURL: res }));

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

export { asyncSearchUsers, asyncUpdateUser, asyncUpdateImageUser };
