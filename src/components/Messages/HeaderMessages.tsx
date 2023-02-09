import React from 'react';
import HeaderPersonal from '@/components/Messages/HeaderPersonal';
import HeaderGroup from '@/components/Messages/HeaderGroup';
import { useAppSelector } from '@/lib/hooks/useRedux';

const HeaderMessages = () => {
  const { selectedChat } = useAppSelector((state) => state.chats);

  if (selectedChat.isGroup) {
    return <HeaderGroup />;
  }

  return <HeaderPersonal />;
};

export default React.memo(HeaderMessages);
