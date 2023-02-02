import React from 'react';
import { useAppSelector } from '@/lib/hooks/useRedux';
import MessageItem from '@/components/Messages/MessageItem';
import useListenerMessages from '@/lib/hooks/useListenerMessages';

const Messages = () => {
  const { chats, messages, auth } = useAppSelector((state) => state);
  const { uid } = auth.user;
  const { selectedChat } = chats;
  const { data, filter } = messages;

  if (selectedChat.chatId) {
    useListenerMessages(selectedChat.chatId);
  }

  const filterMessages = data.filter((message) =>
    message.text.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="bg-chat w-full h-full overflow-y-scroll px-6 md:px-10 pt-3">
      {filterMessages.map((item) => (
        <div key={item.id}>
          <MessageItem
            text={item.text}
            time={item.date}
            sender={item.senderId === uid}
          />
        </div>
      ))}
    </div>
  );
};

export default React.memo(Messages);
