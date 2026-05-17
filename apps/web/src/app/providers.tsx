'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, rainbowWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { filecoinCalibration } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const connectors = connectorsForWallets([
  { groupName: 'Recommended', wallets: [metaMaskWallet, rainbowWallet, walletConnectWallet] },
], { appName: 'Grimoire', projectId: 'e6061e969c6b0287886b8a14ba927e57' });

export const config = createConfig({
  chains: [filecoinCalibration],
  connectors,
  transports: {
    [filecoinCalibration.id]: http(process.env.NEXT_PUBLIC_FILECOIN_CALIBRATION_RPC || 'https://api.calibration.node.glif.io/rpc/v1'),
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
