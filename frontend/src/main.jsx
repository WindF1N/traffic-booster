import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Games from './pages/Games';
import Ad from './pages/Ad';
import Airdrop from './pages/Airdrop';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { Buffer } from 'buffer';

if (typeof window !== 'undefined' && typeof window.Buffer === 'undefined') {
  window.Buffer = Buffer;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl="https://traff-booster.ru/tonconnect-manifest.json">
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="games" element={<Games />} />
            <Route path="ad" element={<Ad />} />
            <Route path="airdrop" element={<Airdrop />} />
          </Route>
        </Routes>
      </Router>
    </TonConnectUIProvider>
  </React.StrictMode>
);