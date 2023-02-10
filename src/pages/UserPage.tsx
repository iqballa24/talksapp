import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/lib/hooks/useRedux';
import useWindowSize from '@/lib/hooks/useWindowSize';
import { Header, RoundedImage, BoxText } from '@/components/UI';

const UserPage = () => {
  const navigate = useNavigate();
  const { ui, chats, users } = useAppSelector((state) => state);
  const { selectedChat } = chats;
  const { selectedUser } = users;
  const { language } = ui;

  const size = useWindowSize();
  const pathBack = size.width > 560 ? '/' : `/message/${selectedUser.uid}`;

  useEffect(() => {
    if (!selectedChat.chatId) {
      navigate('/');
    }
  }, [selectedChat.chatId]);

  return (
    <>
      <Header name={selectedUser.displayName} pathBack={pathBack} />
      <motion.section
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          default: { ease: 'linear' },
        }}
        className="flex flex-col bg-white dark:bg-dark-third h-full"
      >
        <div className="flex ml-auto mr-auto py-7">
          <RoundedImage
            src={
              selectedUser.photoURL === ''
                ? `https://ui-avatars.com/api/?name=${selectedUser.displayName}`
                : selectedUser.photoURL
            }
          />
        </div>
        <BoxText title="Username" text={selectedUser.displayName} />
        <BoxText
          title={language === 'en' ? 'About' : 'Tentang'}
          text={selectedUser.about}
        />
        <BoxText title="Email" text={selectedUser.email} />
      </motion.section>
    </>
  );
};

export default UserPage;
