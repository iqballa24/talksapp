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

  useEffect(() => {
    if (currUserId !== '-') {
      dispatch(
        asyncGetListChats({ uid: currUserId, collection: 'usersChats' })
      );
    }
  }, [currUserId]);

  if (Object.keys(chats.list).length === 0) {
    return (
      <p className="font-light text-sm text-center text-dark-secondary dark:text-grey mt-5">
        {ui.language === 'en'
          ? '-- No conversation yet --'
          : '-- Belum ada percakapan --'}
      </p>
    );
  }

  const handleSelect = ({ uid, displayName, photoURL }: DocumentData) => {
    const chatId = currUserId > uid ? currUserId + uid : uid + currUserId;
    console.log(chatId);
    dispatch(chatsSliceAction.selectChat({ uid, displayName, photoURL }));
  };

  return (
    <ul className="flex flex-col h-[600px] overflowy-scroll divide-y dark:divide-dark-secondary/50 bg-white dark:bg-dark-third">
      {Object.entries(chats.list).map((chat: DocumentData) => (
        <ChatItem
          key={chat[0]}
          uid={chat[0]}
          displayName={chat[1].userInfo.displayName}
          lastMessage={chat[1].lastMessage?.text}
          photoURL={chat[1].userInfo.photoURL}
          time={''}
          onSelect={handleSelect}
        />
      ))}
    </ul>
  );
};

export default React.memo(ChatsList);
