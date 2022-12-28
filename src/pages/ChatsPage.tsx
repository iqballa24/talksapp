import React from 'react';
import { ChatsList, HeaderProfile, FilterBar } from '@/components/Chats';

const Chats = () => {
  return (
    <>
      <HeaderProfile />
      <FilterBar />
      <ChatsList />
    </>
  );
};

export default Chats;
