import { db } from '@/lib/firebase';
import { getUserById } from '@/lib/firebase/API';
import { useAppDispatch } from '@/lib/hooks/useRedux';
import { chatsSliceAction } from '@/store/chats';
import { doc, onSnapshot, Timestamp } from 'firebase/firestore';
import { useEffect } from 'react';

const useListenerChats = (uid: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (uid === '-') return;

    const unsubscriber = onSnapshot(doc(db, 'usersChats', uid), async (doc) => {
      const res = Object.entries(doc.data() || []).map((item) => {
        return item;
      });

      const listUser = await Promise.all(
        res.map((item) => {
          const user = getUserById(item[1].userInfo.uid);
          return user;
        })
      );

      const data = res.map((item, index) => {
        return {
          chatId: item[0],
          date: item[1].date || Timestamp.now(),
          lastMessage: item[1].lastMessage,
          userInfo: listUser[index][0],
        };
      });
      dispatch(chatsSliceAction.receiveChatsUser(data));
    });

    return () => {
      unsubscriber();
    };
  }, [uid]);
};

export default useListenerChats;
