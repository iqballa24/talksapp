import React from 'react';
import ChatItem from '@/components/Chats/ChatItem';

const ChatsList = () => {
  return (
    <ul className="flex flex-col h-[600px] overflow-y-scroll divide-y dark:divide-dark-secondary/50 bg-white dark:bg-dark-third">
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
    </ul>
  );
};

export default React.memo(ChatsList);
