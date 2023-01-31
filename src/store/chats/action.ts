import { db } from '@/lib/firebase';
import { postNewChat } from '@/lib/firebase/API';
import { chatsSliceAction } from '@/store/chats';
import { Dispatch } from '@reduxjs/toolkit';
import { doc, DocumentData, onSnapshot } from 'firebase/firestore';
import toast from 'react-hot-toast';

function asyncAddNewChat({ uid, displayName, photoURL }: DocumentData) {
  return async (dispatch: Dispatch) => {
    try {
      const promise = postNewChat({ uid, displayName, photoURL });

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

function asyncGetListChats({ uid, collection }: DocumentData) {
  return async (dispatch: Dispatch) => {
    try {
      const unsubscriber = onSnapshot(doc(db, collection, uid), (doc) => {
        dispatch(chatsSliceAction.receiveChatsUser(doc.data()));
      });

      return () => {
        unsubscriber();
      };
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

export { asyncAddNewChat, asyncGetListChats };
