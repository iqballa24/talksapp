import {  changeStatusChat } from '@/lib/firebase/API';
import toast from 'react-hot-toast';

function asycnChangeStatusChat(uid: string, status: string) {
  return async () => {
    try {
      const promise = changeStatusChat(uid, status);

      toast.promise(promise, {
        loading: 'Loading..',
        success: `Chat successfully ${status}d`,
        error: `Failed to ${status} a chat`,
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

export { asycnChangeStatusChat };
