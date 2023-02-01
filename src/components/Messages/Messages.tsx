import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';
import MessageItem from '@/components/Messages/MessageItem';
import { asyncGetMessages } from '@/store/messages/action';

const Messages = () => {
  const dispatch = useAppDispatch();
  const { chats, messages, auth } = useAppSelector((state) => state);
  const { uid } = auth.user;
  const { selectedChat } = chats;
  const { data } = messages;

  useEffect(() => {
    if (selectedChat.chatId) {
      const chatId = selectedChat.chatId;
      dispatch(asyncGetMessages({ chatId, collection: 'chats' }));
    }
  }, [selectedChat]);

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
