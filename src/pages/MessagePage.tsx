import {
  HeaderMessages,
  FooterMessages,
  Messages,
} from '@/components/Messages';
import { useAppSelector } from '@/lib/hooks/useRedux';
import useWindowSize from '@/lib/hooks/useWindowSize';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MessagePage = () => {
  const size = useWindowSize();
  const navigate = useNavigate();
  const { selectedChat } = useAppSelector((state) => state.chats);

  useEffect(() => {
    if (!selectedChat.chatId || size.width > 560) {
      navigate('/');
    }
  }, [selectedChat.chatId, size.width]);

  return (
    <>
      <HeaderMessages />
      <Messages />
      <FooterMessages />
    </>
  );
};

export default MessagePage;
