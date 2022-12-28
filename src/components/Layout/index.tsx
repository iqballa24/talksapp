import React from 'react';
import {
  HeaderMessages,
  FooterMessages,
  Messages,
} from '@/components/Messages';
import { WrapperPage, WrapperMessages } from '@/components/Wrapper';

const Layout: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  return (
    <main className="relative w-full h-[100vh] bg-grey after:fixed after:w-full after:h-32 after:bg-primary">
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
