import React from 'react';
import ChatItem from '@/components/Chats/ChatItem';
import { useAppSelector } from '@/lib/hooks/useRedux';
import { DocumentData } from '@firebase/firestore';
import useListenerChats from '@/lib/hooks/useListenerChats';
import { MdOutlineArchive } from 'react-icons/md';
import { Link } from 'react-router-dom';

const ChatsList = () => {
  const { auth, chats, ui } = useAppSelector((state) => state);
  const { uid: currUserId } = auth.user;

  useListenerChats(currUserId);

  if (chats.list.length === 0) {
    return (
      <p className="font-light text-sm text-center text-dark-secondary dark:text-grey mt-5">
        {ui.language === 'en'
          ? '-- No conversation yet --'
          : '-- Belum ada percakapan --'}
      </p>
    );
  }

  const chatsFilter = [...chats.list]
    .sort((a, b) =>
      chats.isSort
        ? a.userInfo.displayName.localeCompare(b.userInfo.displayName)
        : b.date - a.date
    )
    .filter(
      (chat) =>
        chat.status === 'active' &&
        chat.userInfo.displayName
          .toLowerCase()
          .includes(chats.filter.toLowerCase())
    );

  return (
    <React.Fragment>
      {chats.hasArchive && (
        <Link
          to="/archive"
          className="p-4 flex flex-row justify-center gap-4 items-center border-y dark:border-dark-secondary hover:bg-gray-50 dark:hover:bg-dark cursor-pointer"
        >
          <MdOutlineArchive size={22} className={`text-${ui.accentColor}`} />
          <p className="text-dark-secondary dark:text-white">
            {ui.language === 'en' ? 'Archived' : 'Diarsipkan'}
          </p>
        </Link>
      )}
      <ul className="flex flex-col h-full max-h-[600px] overflow-y-scroll divide-y dark:divide-dark-secondary/50 bg-white dark:bg-dark-third">
        {chatsFilter.map((chat: DocumentData) => (
          <ChatItem
            key={chat.chatId}
            chatId={chat.chatId}
            lastMessage={chat.lastMessage}
            status={chat.status}
            userInfo={chat.userInfo}
            time={chat.date}
          />
        ))}
      </ul>
    </React.Fragment>
  );
};

export default React.memo(ChatsList);
