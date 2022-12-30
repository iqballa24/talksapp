import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';

import Layout from '@/components/Layout';
import { Loader } from '@/components/UI';

const ChatsPage = React.lazy(() => import('./pages/ChatsPage'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const SecurityPage = React.lazy(() => import('./pages/SecurityPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));

function App() {
  const dispatch = useAppDispatch();
  const { ui } = useAppSelector((state) => state);

  useEffect(() => {
    if (ui.isDarkMode) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }, [ui.isDarkMode]);

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<ChatsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
