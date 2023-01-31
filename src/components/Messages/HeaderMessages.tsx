import { useAppSelector } from '@/lib/hooks/useRedux';
import React from 'react';
import { MdSearch, MdMoreVert } from 'react-icons/md';

const HeaderMessages = () => {
  const { selectedChat } = useAppSelector((state) => state.chats);

  return (
    <div
      className="flex flex-row items-center justify-between min-h-[62px] px-4 bg-grey-secondary dark:bg-dark"
      role="figure"
    >
      <div className="flex flex-row items-center space-x-5">
        <img
          src={selectedChat.user.photoURL}
          alt="profile picture"
          className="rounded-[50%] w-10 h-10"
        />
        <h1 className="text-dark dark:text-grey text-base">
          {selectedChat.user.displayName}
        </h1>
      </div>
      <div className="flex flex-row space-x-7 text-dark-secondary dark:text-grey">
        <MdSearch className="cursor-pointer" size={24} role="button" />
        <MdMoreVert className="cursor-pointer" size={24} role="button" />
      </div>
    </div>
  );
};

export default React.memo(HeaderMessages);
