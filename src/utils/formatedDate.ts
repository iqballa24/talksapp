import { format } from 'date-fns';
import isToday from 'date-fns/isToday';
import isYesterday from 'date-fns/isYesterday';
import { Timestamp } from 'firebase/firestore';

export const formatedDate = (time: Timestamp, todayFormat = true) => {
  const dateCreated = time.toDate();

  return isYesterday(dateCreated)
    ? 'Yesterday'
    : isToday(dateCreated)
    ? todayFormat
      ? 'Today'
      : format(dateCreated, 'HH:mm')
    : format(dateCreated, 'L/d/yy');
};
