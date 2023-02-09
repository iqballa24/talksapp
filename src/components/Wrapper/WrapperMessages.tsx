import { useAppSelector } from '@/lib/hooks/useRedux';
import React from 'react';

const WrapperMessages: React.FC<{ children: React.ReactElement[] }> = ({
  children,
}) => {
  const { ui, chats } = useAppSelector((state) => state);
  const { language, accentColor } = ui;
  const { selectedChat } = chats;

  return (
    <div className="relative hidden md:flex flex-col md:w-6/12 lg:w-8/12 bg-grey-secondary dark:bg-dark">
      {!selectedChat.chatId && (
        <div className={`w-full h-full border-b-4 border-${accentColor}`}>
          <div className="absolute w-full max-w-md top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col justify-center items-center text-center text-dark-secondary dark:text-grey select-none">
            <img
              src={`/cuate-${accentColor}.png`}
              alt=""
              className="w-3/4 py-8"
            />
            <h1 className="text-3xl mb-3">TalksApp Web</h1>
            <p className="text-sm font-light">
              {language === 'en'
                ? 'Send and receive messages must keeping connect to internet.'
                : 'Mengirim dan menerima pesan harus tetap terhubung ke internet.'}
            </p>
            <p className="text-sm font-light">
              {language === 'en'
                ? 'Use TalksApp web on up to 4 linked devices or more at the same time.'
                : 'Gunakan web TalksApp di 4 perangkat tertaut atau lebih secara bersamaan.'}
            </p>
          </div>
        </div>
      )}
      {selectedChat.chatId && children}
    </div>
  );
};

export default WrapperMessages;
