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
import { updateDocument, uploadFile } from '@/lib/firebase/API';
import { ref } from 'firebase/storage';

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
  image,
  isGroup,
}: DocumentData) {
  return async () => {
    const id = +new Date();
    const date = Timestamp.now();

    try {
      if (image) {
        const res = await uploadFile({ file: image });

        const data = {
          messages: arrayUnion({
            id,
            text,
            senderId,
            date,
            image: res,
          }),
        };

        await updateDocument({ collection, data, id: chatId });
      } else {
        const data = {
          messages: arrayUnion({
            id,
            text,
            senderId,
            date,
          }),
        };

        await updateDocument({ collection, data, id: chatId });
      }

      if (isGroup) {
        await updateDocument({
          collection: 'usersGroups',
          data: {
            [chatId + '.lastMessage']: text === '' ? 'Send image' : text,
            [chatId + '.date']: serverTimestamp(),
          },
          id: senderId,
        });
      } else {
        await updateDocument({
          collection: 'usersChats',
          data: {
            [chatId + '.lastMessage']: text === '' ? 'Send image' : text,
            [chatId + '.date']: serverTimestamp(),
          },
          id: senderId,
        });

        await updateDocument({
          collection: 'usersChats',
          data: {
            [chatId + '.lastMessage']: text === '' ? 'Send image' : text,
            [chatId + '.date']: serverTimestamp(),
          },
          id: receiverId,
        });
      }
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
