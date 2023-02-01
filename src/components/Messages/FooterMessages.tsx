import React, { useState } from 'react';
import { MdOutlineEmojiEmotions, MdSend } from 'react-icons/md';
import { FiPaperclip } from 'react-icons/fi';
import { Tooltip } from 'react-tooltip';
import { Input } from '@/components/UI';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';
import { asyncSendMessages } from '@/store/messages/action';

const FooterMessages = () => {
  const [textMessage, setTextMessage] = useState('');
  const dispatch = useAppDispatch();
  const { chats, auth } = useAppSelector((state) => state);
  const { chatId, user } = chats.selectedChat;
  const { uid } = auth.user;

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextMessage(e.target.value);
  };

  const sendMessageHandler = async (text: string) => {
    if (text === '') {
      return;
    }

    dispatch(
      asyncSendMessages({
        collection: 'chats',
        text,
        chatId,
        senderId: uid,
        receiverId: user.uid,
      })
    );
    setTextMessage('');
  };

  return (
    <div className="flex flex-row px-4 py-1 justify-between min-h-[62px] items-center text-dark-secondary bg-grey-secondary gap-5 dark:text-grey/50 dark:bg-dark">
      <MdOutlineEmojiEmotions size={30} />
      <FiPaperclip size={24} />
      <Input
        id="message"
        value={textMessage}
        name="message"
        placeholder="Type a message"
        changeHandler={changeHandler}
        enterHandler={() => sendMessageHandler(textMessage)}
      />
      <MdSend
        id="sendIcon"
        className="cursor-pointer"
        size={30}
        onClick={() => sendMessageHandler(textMessage)}
      />
      <Tooltip
        className="z-10"
        anchorId="sendIcon"
        content="Send"
        place="top"
      />
    </div>
  );
};

export default React.memo(FooterMessages);
