import React, { useEffect } from 'react';
import { useAppSelector } from '@/lib/hooks/useRedux';
import useWindowSize from '@/lib/hooks/useWindowSize';
import { Header, RoundedImage, BoxText } from '@/components/UI';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const navigate = useNavigate();
  const { ui, chats } = useAppSelector((state) => state);
  const { selectedChat } = chats;
  const { language } = ui;

  const size = useWindowSize();
  const pathBack = size.width > 560 ? '/' : `/message/${selectedChat.user.uid}`;

  useEffect(() => {
    if (!selectedChat.chatId) {
      navigate('/');
    }
  }, [selectedChat.chatId]);

  return (
    <>
      <Header name={selectedChat.user.displayName} pathBack={pathBack} />
      <section className="flex flex-col bg-white dark:bg-dark-third h-full">
        <div className="flex ml-auto mr-auto py-7">
          <RoundedImage src={selectedChat.user.photoURL} />
        </div>
        <BoxText title="Username" text={selectedChat.user.displayName} />
        <BoxText
          title={language === 'en' ? 'About' : 'Tentang'}
          text={selectedChat.user.about}
        />
        <BoxText title="Email" text={selectedChat.user.email} />
      </section>
    </>
  );
};

export default UserPage;
