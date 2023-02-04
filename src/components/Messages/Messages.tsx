import React from 'react';
import { DocumentData } from 'firebase/firestore';
import { useAppSelector } from '@/lib/hooks/useRedux';
import MessageItem from '@/components/Messages/MessageItem';
import useListenerMessages from '@/lib/hooks/useListenerMessages';
import { formatedDate } from '@/utils/formatedDate';

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
    <div className="bg-chat w-full h-full overflow-y-scroll px-6 md:px-10 pt-3 flex flex-col space-y-5">
      {filterMessages.map((item: DocumentData) => {
        const date = formatedDate(item.date);
        return (
          <MessageItem
            key={item.id}
            text={item.text}
            time={date}
            sender={item.senderId === uid}
          />
        );
      })}
    </div>
  );
};

export default React.memo(Messages);
