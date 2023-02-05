import React from 'react';
import { DocumentData } from 'firebase/firestore';
import { useAppSelector } from '@/lib/hooks/useRedux';
import MessageItem from '@/components/Messages/MessageItem';
import useListenerMessages from '@/lib/hooks/useListenerMessages';
import { formatedDate } from '@/utils/formatedDate';
import { notificationPrivacy } from '@/constant';
import { MdLockOpen } from 'react-icons/md';

const Messages = () => {
  const { chats, messages, auth, ui } = useAppSelector((state) => state);
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
      <span className="w-fit flex flex-row ml-auto mr-auto text-xs px-4 py-2 text-dark-secondary text-center bg-[#ffeecd] rounded shadow">
        {ui.language === 'en'
          ? `Messages to ${selectedChat.user.displayName} are not end-to-end encrypted. So don't send private chats and things that are confidential (ex: ID card, password, etc)`
          : `Pesan ke ${selectedChat.user.displayName} sendiri tidak dienkripsi end-to-end. Jadi jangan mengirim percakapan pribadi dan hal-hal yang bersifat rahasia (ex: KTP, password, dll)`}
      </span>
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
