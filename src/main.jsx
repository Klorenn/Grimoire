import React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from './config.js';
import { App } from '../app.jsx';

import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

const rootEl = document.getElementById('root');
const root = ReactDOM.createRoot(rootEl);
root.render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <App />
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);
