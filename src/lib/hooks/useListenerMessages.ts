import { useEffect } from 'react';
import { db } from '@/lib/firebase';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';
import { messageSliceAction } from '@/store/messages';
import { onSnapshot, doc } from 'firebase/firestore';
import { DocumentData } from 'firebase/firestore';
import { filterUser } from '@/utils/filterUser';

const useListenerMessages = (chatId: string) => {
  const dispatch = useAppDispatch();
  const { group, chats } = useAppSelector((state) => state);

  useEffect(() => {
    const unsubscriber = onSnapshot(doc(db, 'chats', chatId), (doc) => {
      const res = doc.data();

      if (chats.selectedChat.isGroup) {
        const data = res?.messages.map((item: DocumentData) => {
          const user = filterUser(group.detailMember, item.senderId);
          return { ...item, userInfo: user[0] };
        });
        dispatch(messageSliceAction.receiveMessages(data));
      } else {
        dispatch(messageSliceAction.receiveMessages(res?.messages));
      }
    });

    return () => {
      unsubscriber();
    };
  }, [chatId, group]);
};

export default useListenerMessages;
