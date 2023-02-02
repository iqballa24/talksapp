import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';

import Layout from '@/components/Layout';
import AuthLayout from '@/components/Layout/AuthLayout';
import { Loader } from '@/components/UI';
import { asyncPreloaderProcess } from '@/store/auth/action';

import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
const ChatsPage = React.lazy(() => import('./pages/ChatsPage'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const SecurityPage = React.lazy(() => import('./pages/SecurityPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const MessagePage = React.lazy(() => import('./pages/MessagePage'));

function App() {
  const dispatch = useAppDispatch();
  const { ui, auth } = useAppSelector((state) => state);

  useEffect(() => {
    if (ui.isDarkMode) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }, [ui.isDarkMode]);

  useEffect(() => {
    const unsub = () => dispatch(asyncPreloaderProcess());

    return () => {
      unsub();
    };
  }, []);

  if (auth.isAuthenticate) {
    return (
      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<ChatsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/message/*" element={<MessagePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
