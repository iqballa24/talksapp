import React from 'react';
import MessagePersonal from '@/components/Messages/MessagePersonal';
import { useAppSelector } from '@/lib/hooks/useRedux';

const Messages = () => {
  const { selectedChat } = useAppSelector((state) => state.chats);

  return <MessagePersonal />;
};

export default React.memo(Messages);
