import { format } from 'date-fns';
import isYesterday from 'date-fns/isYesterday';

export const formatedDate = (time: any) => {
  const now = +new Date();
  const oneDay = 60 * 60 * 24;
  const dateCreated = time.toDate();
  const isOneDay = now - dateCreated > now - oneDay;

  return isYesterday(dateCreated)
    ? 'Yesterday'
    : isOneDay
    ? format(dateCreated, 'L/d/yy')
    : format(dateCreated, 'HH:mm');
};
