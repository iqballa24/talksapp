import {
  arrayUnion,
  doc,
  DocumentData,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { Dispatch } from '@reduxjs/toolkit';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';
import { messageSliceAction } from '@/store/messages';
import { updateDocument } from '@/lib/firebase/API';

function asyncGetMessages({ chatId, collection }: DocumentData) {
  return async (dispatch: Dispatch) => {
    try {
      const unsubscriber = onSnapshot(doc(db, collection, chatId), (doc) => {
        dispatch(messageSliceAction.receiveMessages(doc.data()));
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

function asyncSendMessages({
  collection,
  text,
  chatId,
  senderId,
  receiverId,
}: DocumentData) {
  return async () => {
    const id = +new Date();
    const date = Timestamp.now();

    const data = {
      messages: arrayUnion({
        id,
        text,
        senderId,
        date,
      }),
    };

    try {
      await updateDocument({ collection, data, id: chatId });

      await updateDocument({
        collection: 'usersChats',
        data: {
          [chatId + '.lastMessage']: text,
          [chatId + '.date']: serverTimestamp(),
        },
        id: senderId,
      });

      await updateDocument({
        collection: 'usersChats',
        data: {
          [chatId + '.lastMessage']: text,
          [chatId + '.date']: serverTimestamp(),
        },
        id: receiverId,
      });
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

export { asyncGetMessages, asyncSendMessages };
