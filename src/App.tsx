import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router';

import Layout from '@/components/Layout';
import { Loader } from '@/components/UI';

const ChatsPage = React.lazy(() => import('./pages/ChatsPage'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const SecurityPage = React.lazy(() => import('./pages/SecurityPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));

function App() {
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
