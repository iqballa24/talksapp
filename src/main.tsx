import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import store from '@/store';
import App from './App';

import 'react-tooltip/dist/react-tooltip.css';
import '@/styles/App.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
      <Toaster />
    </Provider>
  </React.StrictMode>
);
