import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { filecoinCalibration } from 'wagmi/chains';
import { http } from 'wagmi';

const RPC_URL = import.meta.env.VITE_FILECOIN_CALIBRATION_RPC_URL || 'https://api.calibration.node.glif.io/rpc/v1';

export const config = getDefaultConfig({
  appName: 'Grimoire',
  projectId: 'grimoire-mvp', // Replace with your WalletConnect projectId: https://cloud.walletconnect.com
  chains: [filecoinCalibration],
  transports: {
    [filecoinCalibration.id]: http(RPC_URL),
  },
});

export const CONTRACT_ADDRESS = import.meta.env.VITE_GRIMOIRE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';
export const LIGHTHOUSE_API_KEY = import.meta.env.VITE_LIGHTHOUSE_API_KEY || '';
export const GATEWAY = 'https://gateway.lighthouse.storage/ipfs';
