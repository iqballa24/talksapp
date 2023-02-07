import { format } from 'date-fns';
import isToday from 'date-fns/isToday';
import isYesterday from 'date-fns/isYesterday';
import { Timestamp } from 'firebase/firestore';

export type formatDate = {
  time: Timestamp;
  showTime?: boolean;
  showTodayTime?: boolean;
};

export const formatedDate = ({
  time,
  showTime = true,
  showTodayTime = true,
}: formatDate) => {
  const dateCreated = time.toDate();

  return isYesterday(dateCreated)
    ? showTime
      ? format(dateCreated, 'HH:mm')
      : 'Yesterday'
    : isToday(dateCreated)
    ? showTodayTime
      ? format(dateCreated, 'HH:mm')
      : 'Today'
    : showTime
    ? format(dateCreated, 'HH:mm')
    : format(dateCreated, 'L/d/yy');
};
