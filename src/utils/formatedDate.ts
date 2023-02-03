import { format } from 'date-fns';
import isYesterday from 'date-fns/isYesterday';
import { Timestamp } from 'firebase/firestore';

export const formatedDate = (time: Timestamp) => {
  const now = +new Date();
  const dateCreated = time.toDate();
  const isOneDay = format(dateCreated, 'd') === format(now, 'd');
  
  return isYesterday(dateCreated)
    ? 'Yesterday'
    : isOneDay
    ? format(dateCreated, 'HH:mm')
    : format(dateCreated, 'L/d/yy');
};
