import { Dispatch } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { registerTypes, FormLoginTypes } from '@/lib/types/index';
import { toast } from 'react-hot-toast';
import {
  registerUser,
  loginUser,
  onAuthStateChanged,
  signOut,
  getUserById,
} from '@/lib/firebase/API';
import { auth } from '@/lib/firebase';
import { authSliceAction } from '@/store/auth';
import { chatsSliceAction } from '@/store/chats';
import { usersSliceAction } from '@/store/users';
import { messageSliceAction } from '@/store/messages';

function asyncRegisterUser({ email, password, username }: registerTypes) {
  return async () => {
    try {
      const res = await registerUser({ email, password, username });

      return { res, error: false };
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }

      return { error: true };
    } finally {
      unSetAuthUser();
    }
  };
}

function asyncLoginUser({ email, password }: FormLoginTypes) {
  return async (dispatch: Dispatch) => {
    try {
      const res = await loginUser({ email, password });
      const { uid, emailVerified } = res.user;

      const user = await getUserById(uid);
      const { displayName, photoURL, about } = user[0];

      if (!emailVerified) {
        return toast.error('Verify your email to activate your account');
      }

      toast.success('Login successful');
      dispatch(
        authSliceAction.setCurrentUser({
          displayName,
          email,
          photoURL,
          uid,
          about,
          emailVerified,
        })
      );

      return { error: false };
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }

      return { error: true };
    }
  };
}

function asyncPreloaderProcess() {
  return async (dispatch: Dispatch) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { uid, emailVerified } = user;

        try {
          dispatch(showLoading());
          const res = await getUserById(uid);
          const { displayName, photoURL, about, email } = res[0];

          await dispatch(
            authSliceAction.setCurrentUser({
              displayName,
              email,
              photoURL,
              about,
              uid,
              emailVerified,
            })
          );
        } catch (err) {
          dispatch(authSliceAction.unSetCurrentUser());
        } finally {
          dispatch(hideLoading());
        }
      } else {
        dispatch(authSliceAction.unSetCurrentUser());
      }
    });
  };
}

function unSetAuthUser() {
  return async (dispatch: Dispatch) => {
    signOut(auth);
    dispatch(chatsSliceAction.resetChatsState());
    dispatch(authSliceAction.unSetCurrentUser());
    dispatch(usersSliceAction.resetListFriends());
    dispatch(usersSliceAction.receiveTotalRequests(0));
    dispatch(messageSliceAction.clearMessages());
  };
}

export {
  asyncRegisterUser,
  asyncPreloaderProcess,
  asyncLoginUser,
  unSetAuthUser,
};
