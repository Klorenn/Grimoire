# Grimoire Development Guide

This document covers everything needed to set up, run, test, and deploy Grimoire locally.

## Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| Node.js | 18+ | LTS recommended |
| npm | 9+ | Ships with Node.js |
| Git | Any | For cloning the repository |
| A wallet | MetaMask or WalletConnect-compatible | For connecting to the app |
| tFIL | Testnet FIL on Calibration | For deploying contracts and registering inscriptions |

## Quick Start

### 1. Clone and Install

```bash
git clone <repo-url> grimoire
cd grimoire

# Install frontend dependencies
npm install

# Install contract dependencies
cd contracts
npm install
cd ..
```

### 2. Environment Configuration

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
# Required for uploading encrypted payloads to Filecoin
VITE_LIGHTHOUSE_API_KEY=your-lighthouse-api-key

# Required for onchain inscription registry
VITE_GRIMOIRE_CONTRACT_ADDRESS=0x...

# Optional — defaults to the public Glif calibration endpoint
VITE_FILECOIN_CALIBRATION_RPC_URL=https://api.calibration.node.glif.io/rpc/v1
```

For contract deployment, the `PRIVATE_KEY` must be set in the same `.env` file (the Hardhat config reads it from `process.env`):

```env
# Private key for the deployer wallet (WITHOUT 0x prefix)
PRIVATE_KEY=your-private-key-for-deployment
```

### 3. Run the Frontend

```bash
npm run dev
```

Opens the Vite dev server at `http://localhost:5173`.

## Commands Reference

### Frontend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server on port 5173 |
| `npm run build` | Production build → `dist/` directory |
| `npm run preview` | Preview the production build locally |

### Contracts

Run all contract commands from the `contracts/` directory:

| Command | Description |
|---------|-------------|
| `npx hardhat compile` | Compile Solidity contracts |
| `npx hardhat test` | Run contract test suite |
| `npx hardhat run scripts/deploy.cjs --network calibration` | Deploy to Filecoin Calibration |
| `npx hardhat run scripts/deploy.cjs --network hardhat` | Deploy to local Hardhat network |
| `npx hardhat node` | Start a local Hardhat node for development |

### After Deployment

When you deploy the contract, the script prints the deployed address:

```
GrimoireRegistry deployed to: 0xAbC123...
```

Copy this address to `.env`:

```env
VITE_GRIMOIRE_CONTRACT_ADDRESS=0xAbC123...
```

Restart the Vite dev server after changing `.env`.

## Manual Testing Flow

### Step 1: Connect Wallet

1. Open `http://localhost:5173`
2. Click "Connect Wallet"
3. Select MetaMask (or your wallet)
4. Ensure your wallet is on Filecoin Calibration network (chainId: 314159)

If your wallet doesn't have Calibration configured, add it manually:
- **Network Name**: Filecoin Calibration
- **RPC URL**: `https://api.calibration.node.glif.io/rpc/v1`
- **Chain ID**: `314159`
- **Currency Symbol**: `tFIL`

### Step 2: Get tFIL

Use a faucet to get test FIL for gas:
- [beryx.zondax.ch/faucet](https://beryx.zondax.ch/faucet)
- [faucet.calibration.fildev.network](https://faucet.calibration.fildev.network)

### Step 3: Create an Inscription

1. Navigate to the inscription creation screen
2. Enter a title (this will be hashed, never stored in plaintext)
3. Enter the secret you want to encrypt
4. Choose a passphrase — make it strong, you will need it to decrypt
5. Confirm the passphrase
6. Click "Create Inscription"
7. Two things happen:
   - The encrypted payload is uploaded to Lighthouse → IPFS/Filecoin
   - The CID is registered onchain via a transaction
8. Wait for the transaction to confirm (~30 seconds on Calibration)

### Step 4: View Inscriptions

1. Navigate to the inscriptions list
2. You should see the inscription you just created (by kind and a timestamp)
3. The title is NOT shown — only the hash is onchain

### Step 5: Reveal with Passphrase

1. Click on an inscription to view it
2. The encrypted payload is fetched from Lighthouse/IPFS
3. Enter your passphrase
4. The secret is decrypted in the browser and displayed
5. The plaintext is never saved — it is discarded when you navigate away

## Troubleshooting

### Lighthouse API Key Missing

**Symptom**: Error "LIGHTHOUSE_API_KEY is not configured" when trying to create an inscription.

**Solution**:
1. Ensure `VITE_LIGHTHOUSE_API_KEY` is set in `.env`
2. Restart the Vite dev server (Vite only reads `.env` at startup)
3. Verify you can access the key at [files.lighthouse.storage](https://files.lighthouse.storage)

### Contract Address Not Set

**Symptom**: Error when trying to create an inscription, or "0x0000..." address is used.

**Solution**:
1. Deploy the contract: `cd contracts && npx hardhat run scripts/deploy.cjs --network calibration`
2. Copy the printed address to `VITE_GRIMOIRE_CONTRACT_ADDRESS` in `.env`
3. Restart the dev server

### RPC Issues

**Symptom**: Wallet can't connect, transactions time out, or "network error".

**Solutions**:
- Verify the RPC URL: `https://api.calibration.node.glif.io/rpc/v1`
- Check if the Glif endpoint is operational at [status.glif.io](https://status.glif.io)
- Try an alternative RPC: `https://filecoin-calibration.chainup.net/rpc/v1`
- Run a local Hardhat node for contract testing: `cd contracts && npx hardhat node`

### Transaction Fails with "out of gas"

**Symptom**: MetaMask shows "transaction will fail" or the tx reverts.

**Solutions**:
- Ensure you have tFIL in your wallet — use a faucet
- Check that the `cid` and `kind` parameters are non-empty strings
- Verify the contract address is correct and the contract is deployed on Calibration

### Wallet on Wrong Network

**Symptom**: RainbowKit shows "Wrong network" or contract calls fail.

**Solution**: Switch your wallet to Filecoin Calibration (chainId: 314159). The app is configured to only work with this network.

### "Failed to fetch CID from all gateways"

**Symptom**: Error when trying to view an inscription.

**Solutions**:
- The data may still be propagating through IPFS — wait a few minutes and retry
- The Filecoin deal may not be active yet — check status with `lighthouse.dealStatus(cid)`
- Verify the CID is correct and was properly stored onchain
- Check if the primary gateway is accessible: `curl https://gateway.lighthouse.storage/ipfs/{cid}`

### String Decoding Error on Decrypt

**Symptom**: Decryption fails with a DOMException or garbled text.

**Solutions**:
- Verify you entered the correct passphrase — even one wrong character will fail
- Check for leading/trailing whitespace in the passphrase
- The encrypted payload may have been corrupted — check the raw JSON from the gateway
- Verify the salt, IV, and ciphertext are valid Base64 strings

## Project Structure

```
grimoire/
├── contracts/                        # Hardhat project
│   ├── contracts/
│   │   └── GrimoireRegistry.sol      # Onchain inscription registry
│   ├── scripts/
│   │   └── deploy.cjs                # Deployment script
│   ├── test/
│   │   └── GrimoireRegistry.test.cjs # Contract tests (Chai)
│   ├── hardhat.config.cjs            # Network + compiler config
│   ├── package.json                  # Hardhat + Ethers + Chai
│   └── tsconfig.json
├── src/
│   ├── lib/
│   │   ├── crypto.js                 # Web Crypto API encrypt/decrypt/hash
│   │   ├── lighthouse.js             # Lighthouse upload/fetch/gateway
│   │   └── contract.js               # viem contract interactions
│   ├── config.js                     # RainbowKit + wagmi config
│   └── main.jsx                      # React entry point
├── docs/                             # Documentation
├── assets/                           # Static assets (icons, images)
├── index.html                        # SPA shell + Tailwind v4 browser build
├── styles.css                        # Global styles + CSS variables
├── vite.config.js                    # Vite configuration
├── package.json                      # Frontend dependencies
├── .env.example                      # Environment variable template
└── .gitignore
```
