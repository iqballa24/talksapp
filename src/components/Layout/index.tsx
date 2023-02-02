import React from 'react';
import LoadingBar from 'react-redux-loading-bar';
import {
  HeaderMessages,
  FooterMessages,
  Messages,
} from '@/components/Messages';
import { WrapperPage, WrapperMessages } from '@/components/Wrapper';

import { useAppSelector } from '@/lib/hooks/useRedux';
import { configColors } from '@/constant/configColors';

const Layout: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { accentColor } = useAppSelector((state) => state.ui);
  const afterBgColor =
    configColors[accentColor as keyof typeof configColors].bgLayout;
  const loaderColor =
    configColors[accentColor as keyof typeof configColors].bgChatBubble;

  return (
    <main
      className={`relative w-full h-[100vh] bg-grey after:fixed after:w-full after:h-32 ${afterBgColor} dark:bg-dark-third dark:after:bg-dark-third`}
    >
      <LoadingBar className={`absolute ${loaderColor} h-[4px] z-30`} />
      <section className="absolute flex flex-row w-full h-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-20 xl:py-5 xl:px-20">
        <WrapperPage>{children}</WrapperPage>
        <WrapperMessages>
          <HeaderMessages />
          <Messages />
          <FooterMessages />
        </WrapperMessages>
      </section>
    </main>
  );
};

export default Layout;
