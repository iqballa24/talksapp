import { postNewChat } from '@/lib/firebase/API';
import { DocumentData } from 'firebase/firestore';
import toast from 'react-hot-toast';

function asyncAddNewChat({ uid, displayName, photoURL }: DocumentData) {
  return async () => {
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

// function asyncGetListChats({ uid, collection }: DocumentData) {
//   return (dispatch: Dispatch) => {
//     const unsubscriber = onSnapshot(doc(db, collection, uid), async (doc) => {
//       const res = Object.entries(doc.data() || []).map((item) => {
//         return item;
//       });

//       const listUser = await Promise.all(
//         res.map((item) => {
//           const user = getUserById(item[1].userInfo.uid);
//           return user;
//         })
//       );

//       const data = res.map((item, index) => {
//         return {
//           chatId: item[0],
//           date: item[1].date || Timestamp.now(),
//           lastMessage: item[1].lastMessage,
//           userInfo: listUser[index][0],
//         };
//       });
//       dispatch(chatsSliceAction.receiveChatsUser(data));
//     });
//   };
// }

export { asyncAddNewChat };
