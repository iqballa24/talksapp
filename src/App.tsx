import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';

import Layout from '@/components/Layout';
import AuthLayout from '@/components/Layout/AuthLayout';
import { Loader } from '@/components/UI';

const ChatsPage = React.lazy(() => import('./pages/ChatsPage'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const SecurityPage = React.lazy(() => import('./pages/SecurityPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterpPage = React.lazy(() => import('./pages/RegisterPage'));

function App() {
  const isLogin = true;
  const dispatch = useAppDispatch();
  const { ui } = useAppSelector((state) => state);

  useEffect(() => {
    if (ui.isDarkMode) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }, [ui.isDarkMode]);

  if (isLogin) {
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

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterpPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
