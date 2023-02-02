import React from 'react';
import { useAppSelector } from '@/lib/hooks/useRedux';
import MessageItem from '@/components/Messages/MessageItem';
import useListenerMessages from '@/lib/hooks/useListenerMessages';

const Messages = () => {
  const { chats, messages, auth } = useAppSelector((state) => state);
  const { uid } = auth.user;
  const { selectedChat } = chats;
  const { data } = messages;

  if(selectedChat.chatId){
    useListenerMessages(selectedChat.chatId);
  }

  return (
    <div className="bg-chat w-full h-full overflow-y-scroll px-14 pt-3">
      {data.map((item) => (
        <MessageItem
          key={item.id}
          text={item.text}
          time={item.date}
          sender={item.senderId === uid}
        />
      ))}
    </div>
  );
};

export default React.memo(Messages);
