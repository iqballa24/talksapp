import { Dispatch } from '@reduxjs/toolkit';
import { getUserByUserName } from '@/lib/firebase/API';
import { usersSliceAction } from '@/store/users';
import { toast } from 'react-hot-toast';

function asyncSearchUsers(username: string) {
  return async (dispatch: Dispatch) => {
    try {
      const res = await getUserByUserName(username);
      dispatch(usersSliceAction.searchUsers(res.data));
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

export { asyncSearchUsers };
