import React from 'react';
import { Header } from '@/components/UI';
import { ContentSettings } from '@/components/Settings';

const Settings = () => {
  return (
    <>
      <Header name="Settings" pathBack="/" />
      <ContentSettings />
    </>
  );
};

export default Settings;
