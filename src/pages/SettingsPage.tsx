import React from 'react';
import { Header } from '@/components/UI';
import { ContentSettings } from '@/components/Settings';

const Settings = () => {
  return (
    <>
      <Header name="Settings" path="/" />
      <ContentSettings />
    </>
  );
};

export default Settings;
