import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router';

import Layout from '@/components/Layout';

const ChatsPage = React.lazy(() => import('./pages/ChatsPage'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));

function App() {
  return (
    <Layout>
      <Suspense fallback={<p>Loading</p>}>
        <Routes>
          <Route path="/" element={<ChatsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
