import { db } from '@/lib/firebase';
import { getUserById } from '@/lib/firebase/API';
import { useAppDispatch } from '@/lib/hooks/useRedux';
import { usersSliceAction } from '@/store/users';
import { onSnapshot, doc, DocumentData } from 'firebase/firestore';
import { useEffect } from 'react';

const useListenerFriends = (uid: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (uid === '-') return;

    const unsubscriber = onSnapshot(
      doc(db, 'usersFriends', uid),
      async (doc) => {
        const res = doc.data()?.data;

        if (res) {
          const listUser = await Promise.all(
            res.map((item: DocumentData) => {
              const user = getUserById(item.userId);
              return user;
            })
          );

          const totalRequests = res.filter(
            (item: DocumentData) => item.status === 'pending'
          ).length;

          const data = res.map((item: DocumentData, index: number) => {
            return {
              ...item,
              userInfo: listUser[index][0],
            };
          });

          dispatch(usersSliceAction.receiveListFriends(data));
          dispatch(usersSliceAction.receiveTotalRequests(totalRequests));
        }
      }
    );

    return () => {
      unsubscriber();
    };
  }, [uid]);
};

export default useListenerFriends;
