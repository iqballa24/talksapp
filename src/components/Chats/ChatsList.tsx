import React, { useEffect } from 'react';
import ChatItem from '@/components/Chats/ChatItem';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';
import { asyncGetListChats } from '@/store/chats/action';
import { DocumentData } from '@firebase/firestore';
import { chatsSliceAction } from '@/store/chats';

const ChatsList = () => {
  const { auth, chats, ui } = useAppSelector((state) => state);
  const { uid: currUserId } = auth.user;
  const dispatch = useAppDispatch();

  const handleSelect = ({
    chatId,
    uid,
    displayName,
    photoURL,
  }: DocumentData) => {
    dispatch(
      chatsSliceAction.selectChat({ chatId, uid, displayName, photoURL })
    );
  };

  useEffect(() => {
    if (currUserId !== '-') {
      dispatch(
        asyncGetListChats({ uid: currUserId, collection: 'usersChats' })
      );
    }
  }, [currUserId]);

  if (chats.list.length === 0) {
    return (
      <p className="font-light text-sm text-center text-dark-secondary dark:text-grey mt-5">
        {ui.language === 'en'
          ? '-- No conversation yet --'
          : '-- Belum ada percakapan --'}
      </p>
    );
  }

  const chatsSorted = [...chats.list];
  chatsSorted.sort((a, b) => b.date - a.date);

  return (
    <ul className="flex flex-col h-[600px] overflowy-scroll divide-y dark:divide-dark-secondary/50 bg-white dark:bg-dark-third">
      {chatsSorted.map((chat: DocumentData) => (
        <ChatItem
          key={chat.chatId}
          chatId={chat.chatId}
          uid={chat.userInfo.uid}
          displayName={chat.userInfo.displayName}
          lastMessage={chat.lastMessage}
          photoURL={chat.userInfo.photoURL}
          time={chat.date}
          onSelect={handleSelect}
        />
      ))}
    </ul>
  );
};

export default React.memo(ChatsList);
