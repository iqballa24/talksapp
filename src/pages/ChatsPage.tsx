import React from 'react';
import { ChatsList, ChatsHeader, FilterBar } from '@/components/Chats';

const Chats = () => {
  return (
    <>
      <ChatsHeader />
      <FilterBar />
      <ChatsList />
    </>
  );
};

export default Chats;
