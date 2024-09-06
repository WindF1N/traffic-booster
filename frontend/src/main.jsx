import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './pages/Home';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

// Динамический импорт страниц
const Tasks = lazy(() => import('./pages/Tasks'));
const Games = lazy(() => import('./pages/Games'));
const Ad = lazy(() => import('./pages/Ad'));
const Airdrop = lazy(() => import('./pages/Airdrop'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl="https://traff-booster.ru/tonconnect-manifest.json">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="games" element={<Games />} />
              <Route path="ad" element={<Ad />} />
              <Route path="airdrop" element={<Airdrop />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </TonConnectUIProvider>
  </React.StrictMode>
);