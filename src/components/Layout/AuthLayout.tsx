import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '@/lib/hooks/useRedux';

const AuthLayout = () => {
  const { accentColor } = useAppSelector(state => state.ui);

  return (
    <main className={`relative w-full h-[100vh] bg-grey after:fixed after:w-full after:h-56 after:bg-${accentColor} dark:bg-dark-third dark:after:bg-dark-third`}>
      <section className="absolute flex flex-col w-full max-w-4xl h-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-20">
        <div className="flex flex-row items-center justify-center lg:justify-start gap-2 py-7">
          <img src="/logo-flat.svg" alt="" className="w-full max-w-[39px]" />
          <h1 className="text-white font-medium">TALKSAPPS WEB</h1>
        </div>
        <Outlet />
      </section>
    </main>
  );
};

export default AuthLayout;
