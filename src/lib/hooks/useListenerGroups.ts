import { db } from '@/lib/firebase';
import { getGroupById } from '@/lib/firebase/API';
import { useAppDispatch } from '@/lib/hooks/useRedux';
import { groupsSliceAction } from '@/store/groups';
import { doc, DocumentData, onSnapshot, Timestamp } from 'firebase/firestore';
import { useEffect } from 'react';

const useListenerGroups = (uid: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (uid === '-') return;

    const unsubscriber = onSnapshot(
      doc(db, 'usersGroups', uid),
      async (doc) => {
        const res = Object.entries(doc.data() || []).map((item) => {
          return item;
        });

        if (res) {
          const listGroup = await Promise.all(
            res.map((item: DocumentData) => {
              const user = getGroupById(item[1].idGroup);
              return user;
            })
          );

          const data = res.map((item: DocumentData, index: number) => {
            return {
              ...item[1],
              date: item[1].date || Timestamp.now(),
              groupInfo: listGroup[index][0],
            };
          });

          dispatch(groupsSliceAction.receiveListGroups(data));
        }
      }
    );

    return () => {
      unsubscriber();
    };
  }, [uid]);
};

export default useListenerGroups;
