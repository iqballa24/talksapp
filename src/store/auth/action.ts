import { Dispatch } from '@reduxjs/toolkit';
import { registerTypes, FormLoginTypes } from '@/lib/types/index';
import { toast } from 'react-hot-toast';

import { auth, db } from '@/firebase';
import {
  sendEmailVerification,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { authSliceAction } from '@/store/auth';

function asyncRegisterUser({ email, password, username }: registerTypes) {
  return async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(res.user);

      await setDoc(doc(db, 'users', res.user.uid), {
        uid: res.user.uid,
        displayName: username,
        email,
        photoURL: '',
      });

      await setDoc(doc(db, 'usersChats', res.user.uid), {});

      return { error: false };
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Something went wrong');
        console.log('Unexpected error', err);
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
      const res = await signInWithEmailAndPassword(auth, email, password);

      const {
        displayName,
        photoURL,
        uid,
        emailVerified,
      } = res.user;

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
          emailVerified,
        })
      );

      return { error: false };
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Something went wrong');
        console.log('Unexpected error', err);
      }

      return { error: true };
    }
  };
}

function asyncPreloaderProcess() {
  return async (dispatch: Dispatch) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, photoURL, uid, emailVerified } = user;
        dispatch(
          authSliceAction.setCurrentUser({
            displayName,
            email,
            photoURL,
            uid,
            emailVerified,
          })
        );
      } else {
        dispatch(authSliceAction.unSetCurrentUser());
      }
    });
  };
}

function unSetAuthUser() {
  return async (dispatch: Dispatch) => {
    signOut(auth);
    dispatch(authSliceAction.unSetCurrentUser());
  };
}

export {
  asyncRegisterUser,
  asyncPreloaderProcess,
  asyncLoginUser,
  unSetAuthUser,
};
