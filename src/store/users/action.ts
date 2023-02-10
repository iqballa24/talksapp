import { Dispatch } from '@reduxjs/toolkit';
import {
  acceptRequestFriend,
  deleteRequestFriend,
  getUserByUserName,
  sendRequestFriend,
  updateDocumentUsers,
  uploadProfileImage,
} from '@/lib/firebase/API';
import { usersSliceAction } from '@/store/users';
import { authSliceAction } from '@/store/auth';
import { toast } from 'react-hot-toast';
import { DocumentData } from 'firebase/firestore';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { RootState } from '@/store';

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

function asyncUpdateUser(uid: string, data: DocumentData) {
  return async (dispatch: Dispatch) => {
    try {
      const promise = updateDocumentUsers(uid, data);

      toast.promise(promise, {
        loading: 'Loading..',
        success: 'Saved',
        error: 'Failed',
      });

      const res = promise;
      dispatch(authSliceAction.updateCurrentUser(data));

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
      const promise = uploadProfileImage({ uid, displayName, file });

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

function asyncAddNewFriends(uid: string) {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { users } = getState();

    const checkUserHasAdd = users.listFriends.filter(
      (item: DocumentData) => item.userId === uid
    );

    try {
      if (checkUserHasAdd.length > 0)
        throw new Error('You had sent a request to this user');

      const promise = sendRequestFriend(uid);

      toast.promise(promise, {
        loading: 'Loading..',
        success: 'Request send successfully',
        error: 'Failed',
      });

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

function asyncRejectFriend(uid: string) {
  return async () => {
    try {
      const promise = deleteRequestFriend(uid);

      toast.promise(promise, {
        loading: 'Loading..',
        success: 'Remove successfully',
        error: 'Failed',
      });

      await promise;
    } catch (err) {
      if (err instanceof Error) {
        console.log('Unexpected error', err.message);
      } else {
        console.log('Unexpected error', err);
      }
      toast.error('Something went wrong');
    }
  };
}

function asyncAcceptFriend({ uid, displayName, photoURL }: DocumentData) {
  return async () => {
    try {
      const promise = acceptRequestFriend({ uid, displayName, photoURL });

      toast.promise(promise, {
        loading: 'Loading..',
        success: 'New chat successfully added',
        error: 'Failed to add a new chat',
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
export {
  asyncSearchUsers,
  asyncUpdateUser,
  asyncUpdateImageUser,
  asyncAddNewFriends,
  asyncRejectFriend,
  asyncAcceptFriend,
};
