import React, { useEffect, useState } from 'react';
import { MdOutlineEmojiEmotions, MdSend, MdClose } from 'react-icons/md';
import { FiPaperclip } from 'react-icons/fi';
import { Tooltip } from 'react-tooltip';
import { Input } from '@/components/UI';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';
import { asyncSendMessages } from '@/store/messages/action';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { AnimatePresence, motion } from 'framer-motion';

const FooterMessages = () => {
  const dispatch = useAppDispatch();
  const [textMessage, setTextMessage] = useState<string>('');
  const [srcImage, setSrcImage] = useState<string | null>(null);
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const { chats, auth, ui, users } = useAppSelector((state) => state);
  const { chatId, isGroup } = chats.selectedChat;
  const { uid: receiverId } = users.selectedUser;
  const { uid } = auth.user;

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextMessage(e.target.value);
  };

  const sendMessageHandler = async (text: string) => {
    if (text === '' && !uploadImage) {
      return;
    }

    dispatch(
      asyncSendMessages({
        text,
        chatId,
        senderId: uid,
        receiverId,
        image: uploadImage,
        isGroup,
      })
    );
    setTextMessage('');
    setSrcImage('');
    setUploadImage(null);
  };

  const changeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      const imgUrl: string = reader.result as string;
      setSrcImage(imgUrl);
    };
    reader.readAsDataURL(file);
    setUploadImage(e.target.files[0]);
  };

  const onEmojiClick = (emoji: string) => {
    setTextMessage((prev) => prev + emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  useEffect(() => {
    setSrcImage('');
  }, [chatId]);

  return (
    <React.Fragment>
      {srcImage && (
        <span className="flex flex-row justify-between px-4 py-3 border-2">
          <img src={srcImage} alt="" className="max-w-[120px]" />
          <MdClose
            className="cursor-pointer hover:text-red"
            onClick={() => setSrcImage('')}
          />
        </span>
      )}
      <div className="relative flex flex-row px-4 py-1 justify-between min-h-[62px] items-center text-dark-secondary bg-grey-secondary gap-5 dark:text-grey/50 dark:bg-dark">
        <MdOutlineEmojiEmotions
          size={30}
          onClick={toggleEmojiPicker}
          className="cursor-pointer"
        />
        <label htmlFor="uploadImage" className="cursor-pointer">
          <FiPaperclip id="attachIcon" size={20} />
          <input
            id="uploadImage"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={changeImageHandler}
          />
        </label>
        <Tooltip
          className="z-10"
          anchorId="attachIcon"
          content={`${
            ui.language === 'en' ? 'Attach picture' : 'Lampirkan gambar'
          }`}
          place="top"
        />
        <Input
          id="message"
          value={textMessage}
          name="message"
          placeholder={
            ui.language === 'en' ? 'Type a message' : 'Ketikan pesan'
          }
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
          content={`${ui.language === 'en' ? 'Send' : 'Kirim'}`}
          place="top"
        />
        <AnimatePresence>
          {showEmojiPicker && (
            <motion.div
              key="emojiPicker"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -top-[450px] z-30"
            >
              <Picker
                data={data}
                emojiButtonSize="34"
                emojiSize="16"
                perLine="9"
                previewPosition="none"
                onEmojiSelect={(e: any) => onEmojiClick(e.native)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </React.Fragment>
  );
};

export default React.memo(FooterMessages);
