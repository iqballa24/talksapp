import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';

import Layout from '@/components/Layout';
import AuthLayout from '@/components/Layout/AuthLayout';
import { Loader } from '@/components/UI';
import { asyncPreloaderProcess } from '@/store/auth/action';

import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import useListenerFriends from '@/lib/hooks/useListenerFriends';
const ChatsPage = React.lazy(() => import('./pages/ChatsPage'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const SecurityPage = React.lazy(() => import('./pages/SecurityPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const MessagePage = React.lazy(() => import('./pages/MessagePage'));
const UserPage = React.lazy(() => import('./pages/UserPage'));
const FriendsPage = React.lazy(() => import('./pages/FriendsPage'));
const ArchivePage = React.lazy(() => import('./pages/ArchivePage'));
const CreateGroupPage = React.lazy(() => import('./pages/CreateGroupPage'));
const GroupsPage = React.lazy(() => import('./pages/GroupsPage'));
const DetaiGroupPage = React.lazy(() => import('./pages/DetailGroupPage'));

function App() {
  const dispatch = useAppDispatch();
  const { ui, auth } = useAppSelector((state) => state);

  useListenerFriends(auth.user.uid);

  useEffect(() => {
    if (ui.isDarkMode) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }, [ui.isDarkMode]);

  useEffect(() => {
    dispatch(asyncPreloaderProcess());
  }, [dispatch]);

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
            <Route path="/detail-user/*" element={<UserPage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/groups" element={<GroupsPage />} />
            <Route path="/create-group" element={<CreateGroupPage />} />
            <Route path="/detail-group/*" element={<DetaiGroupPage />} />
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
