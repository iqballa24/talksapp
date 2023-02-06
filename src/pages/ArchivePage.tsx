import React from 'react';
import { Header } from '@/components/UI';
import { useAppSelector } from '@/lib/hooks/useRedux';
import { Navigate } from 'react-router-dom';
import useListenerChats from '@/lib/hooks/useListenerChats';
import { DocumentData } from 'firebase/firestore';
import { ChatItem } from '@/components/Chats';

const ArchivePage = () => {
  const { auth, chats, ui } = useAppSelector((state) => state);
  const { uid } = auth.user;

  useListenerChats(uid);

  if (!chats.hasArchive) {
    return <Navigate to="/" replace />;
  }

  const chatsFilter = [...chats.list]
    .sort((a, b) => b.date - a.date)
    .filter((chat) => chat.status === 'archive')
    .filter((chat) =>
      chat.userInfo.displayName
        .toLowerCase()
        .includes(chats.filter.toLowerCase())
    );

  return (
    <>
      <Header name={ui.language === 'en' ? 'Archive' : 'Arsip'} pathBack="/" />
      <span className="p-5 text-sm text-center border-b dark:border-dark-secondary text-dark-secondary dark:text-white">
        {ui.language === 'en'
          ? 'These chats stay archived when new message are received.'
          : 'Obrolan ini tetap diarsipkan saat pesan baru diterima.'}
      </span>
      <ul className="flex flex-col h-[600px] overflowy-scroll divide-y dark:divide-dark-secondary/50 bg-white dark:bg-dark-third">
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
    </>
  );
};

export default ArchivePage;
