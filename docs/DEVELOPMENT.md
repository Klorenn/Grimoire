# Grimoire — Development Guide

## Prerequisites

- Node.js 18+
- npm
- MetaMask or Rabby browser extension
- Pinata account (free tier: 1GB) — [pinata.cloud](https://pinata.cloud)

## Quick Start

```bash
# 1. Clone and install
git clone https://github.com/Klorenn/Grimoire.git
cd Grimoire
npm install --legacy-peer-deps

# 2. Configure environment
cp .env.example .env
# Edit .env with your Pinata JWT (from pinata.cloud → API Keys)
# The contract address and RPC are pre-configured for Calibration testnet

# 3. Run dev server
npm run dev
# → http://localhost:3000
```

## Environment Variables (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_PINATA_JWT` | Pinata JWT token for IPFS uploads | Required |
| `VITE_GRIMOIRE_CONTRACT_ADDRESS` | Deployed GrimoireRegistry address | `0xCEa33B5Edb8B5eb982aDB05e4ED30B764081B490` |
| `VITE_FILECOIN_CALIBRATION_RPC_URL` | Filecoin Calibration RPC | `https://api.calibration.node.glif.io/rpc/v1` |

## Commands

```bash
# Frontend
npm run dev          # Dev server on port 3000
npm run build        # Production build → dist/
npm run preview      # Preview production build

# Contracts
cd contracts
npm install --legacy-peer-deps
npx hardhat compile      # Compile Solidity
npx hardhat test         # Run tests (5/5)
npx hardhat run scripts/deploy.cjs --network calibration  # Deploy
```

## Contract Deployment

```bash
cd contracts
export PRIVATE_KEY=0x...
npx hardhat run scripts/deploy.cjs --network calibration
# → Copy the deployed address to .env as VITE_GRIMOIRE_CONTRACT_ADDRESS
```

The deployer wallet needs tFIL (testnet FIL). Get it from:
- https://faucet.calibnet.chainsafe-fil.io/

## Manual Testing Flow

1. Open `http://localhost:3000`
2. Click "Connect" / "Comenzar" → connect wallet (MetaMask/Rabby)
3. Click wallet address → enters Vault (`#/vault`)
4. Click "+ New inscription"
5. Fill form:
   - Title: "Test seed"
   - Kind: Seed phrase
   - Select "12 words" → fill 12 words
   - Optional: set chapter, time-lock date
6. Click "Sign & ✦ Inscribe"
7. Wallet prompts to sign → confirm
8. Wait for 5-step progress (30-60s for tx confirmation)
9. Success screen appears → click "Close"
10. Inscription appears in vault table
11. Click "Reveal" → wallet signs → content decrypted and displayed

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Pinata upload failed" | Check VITE_PINATA_JWT in .env |
| "Contract not deployed" | Check VITE_GRIMOIRE_CONTRACT_ADDRESS |
| "Failed to load inscriptions" | Check wallet is connected to Filecoin Calibration |
| "Transaction stuck" | Wait up to 3 min; check explorer |
| "Reveal fails" | Wait 30s after creation for IPFS propagation |
| "403 / 402 from gateway" | Pinata gateway is free; Lighthouse requires payment |
| Build errors | `rm -rf node_modules && npm install --legacy-peer-deps` |

## File Structure (key files)

```
src/
├── main.jsx                 Entry point with providers
├── config.js                Wagmi + RainbowKit + constants
├── lib/
│   ├── crypto.js            Encryption, decryption, key derivation
│   ├── lighthouse.js        Pinata upload/fetch
│   ├── contract.js          Contract read integration
│   └── templates.js         Inscription templates
└── components/
    ├── WalletConnect.jsx    Connect/disconnect buttons
    ├── InscribeForm.jsx     Full inscription form
    └── RevealModal.jsx      Decrypt modal

contracts/
├── contracts/GrimoireRegistry.sol   Smart contract
├── scripts/deploy.cjs               Deploy script
├── test/GrimoireRegistry.test.cjs   Tests
└── hardhat.config.cjs               Hardhat config

docs/                       Full documentation
```

## i18n

Dual-language (EN/ES) via custom React context. All strings in `i18n.jsx`. Language persisted to `localStorage` under `grimoire-lang`. All screens use `useT()` hook.

## Production Build

```bash
npm run build
# → dist/ folder ready for deployment
# Serve with any static server: npx serve dist
```
