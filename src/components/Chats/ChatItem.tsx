import React from 'react';
import { ChatItemProps } from '@/lib/types/PropTypes';
import { formatedDate } from '@/utils/formatedDate';
import { DocumentData } from 'firebase/firestore';
import { chatsSliceAction } from '@/store/chats';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/lib/hooks/useRedux';
import useWindowSize from '@/lib/hooks/useWindowSize';

const ChatItem: React.FC<ChatItemProps> = ({
  chatId,
  uid,
  displayName,
  lastMessage,
  photoURL,
  time,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const date = formatedDate(time);
  const size = useWindowSize();

  const handleSelect = ({
    chatId,
    uid,
    displayName,
    photoURL,
  }: DocumentData) => {
    dispatch(
      chatsSliceAction.selectChat({ chatId, uid, displayName, photoURL })
    );
    if (size.width < 560) {
      return navigate(`/message/${chatId}`);
    }
  };

  return (
    <li
      className="p-3 flex flex-row space-x-2 items-center hover:bg-gray-50 dark:hover:bg-dark cursor-pointer"
      onClick={() => handleSelect({ chatId, uid, displayName, photoURL })}
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
        <p className="text-sm text-gray-400 truncate">
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
