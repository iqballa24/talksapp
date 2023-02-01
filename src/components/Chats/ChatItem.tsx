import React from 'react';
import { format } from 'date-fns';
import isYesterday from 'date-fns/isYesterday';
import { ChatItemProps } from '@/lib/types/PropTypes';
import { formatedDate } from '@/utils/formatedDate';

const ChatItem: React.FC<ChatItemProps> = ({
  chatId,
  uid,
  displayName,
  lastMessage,
  photoURL,
  time,
  onSelect,
}) => {
  const date = formatedDate(time);

  return (
    <li
      className="p-3 flex flex-row space-x-2 items-center hover:bg-gray-50 dark:hover:bg-dark cursor-pointer"
      onClick={() => onSelect({ chatId, uid, displayName, photoURL })}
    >
      <div className="w-2/12">
        <img
          src={photoURL}
          alt="profile user"
          className="w-[49px] h-[49px] rounded-[50%]"
        />
      </div>
      <div className="w-8/12 h-full flex flex-col justify-start">
        <span className="text-base text-dark dark:text-white">
          {displayName}
        </span>
        <p className="text-sm text-gray-400">
          {lastMessage || 'click to start the conversation'}
        </p>
      </div>
      <div className="w-2/12 h-full flex justify-end">
        <time className="text-xs text-gray-400">{date}</time>
      </div>
    </li>
  );
};

export default React.memo(ChatItem);
