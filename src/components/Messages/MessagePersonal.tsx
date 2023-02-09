import React from 'react';
import { DocumentData } from 'firebase/firestore';
import { useAppSelector } from '@/lib/hooks/useRedux';
import MessageItem from '@/components/Messages/MessageItem';
import useListenerMessages from '@/lib/hooks/useListenerMessages';
import { formatedDate } from '@/utils/formatedDate';

const MessagePersonal = () => {
  const { chats, messages, auth, ui, users } = useAppSelector((state) => state);
  const { uid } = auth.user;
  const { selectedChat } = chats;
  const { selectedUser } = users;
  const { data, filter } = messages;

  if (selectedChat.chatId) {
    useListenerMessages(selectedChat.chatId);
  }

  const filterMessages = data.filter((message: DocumentData) =>
    message.text.toLowerCase().includes(filter.toLowerCase())
  );

  const groupDates = [
    ...new Set(
      filterMessages.map((message: DocumentData) =>
        formatedDate({
          time: message.date,
          showTime: false,
          showTodayTime: false,
        })
      )
    ),
  ];
  return (
    <div className="bg-chat w-full h-full overflow-y-scroll px-6 md:px-10 pt-3 flex flex-col gap-3">
      <span className="w-fit flex flex-row ml-auto mr-auto text-xs px-4 py-2 text-dark-secondary text-center bg-[#ffeecd] rounded shadow mb-5">
        {ui.language === 'en'
          ? `Messages to ${selectedUser.displayName} are not end-to-end encrypted. So don't send private chats and things that are confidential (ex: ID card, password, etc)`
          : `Pesan ke ${selectedUser.displayName} tidak dienkripsi end-to-end. Jadi jangan mengirim percakapan pribadi dan hal-hal yang bersifat rahasia (ex: KTP, password, dll)`}
      </span>
      {groupDates.map((date, index) => (
        <div key={index}>
          <span className="flex justify-center mb-7">
            <p className="w-fit text-sm py-1 px-3 rounded-md dark:text-white bg-white dark:bg-dark text-dark-secondary">
              {date}
            </p>
          </span>
          {filterMessages.map((item: DocumentData) => {
            const dateChat = formatedDate({
              time: item.date,
            });
            if (
              formatedDate({
                time: item.date,
                showTime: false,
                showTodayTime: false,
              }) === date
            ) {
              return (
                <MessageItem
                  key={item.id}
                  text={item.text}
                  time={dateChat}
                  sender={item.senderId === uid}
                  img={item.image}
                />
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default React.memo(MessagePersonal);
