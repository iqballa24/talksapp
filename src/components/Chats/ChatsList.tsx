import React from 'react';
import ChatItem from '@/components/Chats/ChatItem';

const ChatsList = () => {
  return (
    <ul className="flex flex-col h-[600px] overflow-y-scroll divide-y">
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
