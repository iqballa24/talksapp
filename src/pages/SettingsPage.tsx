import React from 'react';
import { Header } from '@/components/UI';
import { ContentSettings } from '@/components/Settings';
import { useAppSelector } from '@/lib/hooks/useRedux';

const Settings = () => {
  const { language } = useAppSelector((state) => state.ui);
  const nameHeader = language === 'en' ? 'Settings' : 'Pengaturan';

  return (
    <>
      <Header name={nameHeader} pathBack="/" />
      <ContentSettings />
    </>
  );
};

export default Settings;
