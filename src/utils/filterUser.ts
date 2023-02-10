import { userTypes } from '@/lib/types';

export function filterUser(data: userTypes[], uid: string) {
  return data.filter((item) => item.uid === uid);
}
