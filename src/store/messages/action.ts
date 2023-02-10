import { doc, DocumentData, onSnapshot } from 'firebase/firestore';
import { Dispatch } from '@reduxjs/toolkit';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';
import { messageSliceAction } from '@/store/messages';
import { sendMessageGroup, sendMessagePersonal } from '@/lib/firebase/API';
import { RootState } from '@/store';

function asyncGetMessages({ chatId, collection }: DocumentData) {
  return async (dispatch: Dispatch) => {
    try {
      const unsubscriber = onSnapshot(doc(db, collection, chatId), (doc) => {
        dispatch(messageSliceAction.receiveMessages(doc.data()?.messages));
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
  text,
  chatId,
  senderId,
  receiverId,
  image,
  isGroup,
}: DocumentData) {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { group } = getState();
    const { member } = group.selectedGroup;

    try {
      if (isGroup) {
        return await sendMessageGroup({
          text,
          chatId,
          senderId,
          image,
          member,
        });
      }
      return await sendMessagePersonal({
        text,
        chatId,
        senderId,
        receiverId,
        image,
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
