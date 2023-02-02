import { db } from '@/lib/firebase';
import { useAppDispatch } from '@/lib/hooks/useRedux';
import { messageSliceAction } from '@/store/messages';
import { onSnapshot, doc } from 'firebase/firestore';
import { useEffect } from 'react';

const useListenerMessages = (chatId: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscriber = onSnapshot(doc(db, "chats", chatId), (doc) => {
      dispatch(messageSliceAction.receiveMessages(doc.data()));
    });

    return () => {
      unsubscriber();
    };
  }, [chatId]);
};

export default useListenerMessages;
