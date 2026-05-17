# Grimoire Architecture

Grimoire is a **Web3 encrypted vault** that stores secrets on the decentralized web. Users encrypt sensitive data entirely in the browser. The encrypted ciphertext is persisted on **IPFS/Filecoin** via Lighthouse, while a minimal onchain registry on **FEVM** (Filecoin Calibration) records the CID, kind, and hashed title. No plaintext, passphrase, or private key ever leaves the user's device.

## Stack Overview

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 18 + Vite | Single-page application |
| **Styling** | Tailwind CSS v4 | Utility-first design system |
| **Wallet** | RainbowKit + wagmi + viem | Wallet connection, tx signing |
| **Encryption** | Web Crypto API (AES-256-GCM, PBKDF2) | Client-side encrypt/decrypt |
| **Storage** | Lighthouse SDK → IPFS/Filecoin | Decentralized encrypted payload storage |
| **Smart Contract** | Solidity 0.8.20 → FEVM | Onchain registry of CIDs |
| **Network** | Filecoin Calibration (chainId 314159) | Testnet for MVP |

## Network Configuration

```
Chain ID:    314159
RPC:         https://api.calibration.node.glif.io/rpc/v1
Explorers:   https://beryx.zondax.ch
             https://calibration.filfox.info
             https://calibration.filscan.io
```

## What Lives Onchain vs Offchain

### Onchain (GrimoireRegistry.sol on FEVM)

- `owner` — wallet address that created the inscription
- `cid` — IPFS Content Identifier pointing to the encrypted payload
- `kind` — type of inscription (e.g. "seed-phrase", "private-key", "letter")
- `titleHash` — SHA-256 hash of the user-chosen title (title itself is never stored anywhere)
- `createdAt` — block timestamp
- `InscriptionCreated` event — emitted on each new inscription

### Offchain (IPFS/Filecoin via Lighthouse)

- The encrypted payload (`EncryptedPayload` JSON object) — version, algorithm, KDF parameters, salt, IV, ciphertext, creation timestamp
- The ciphertext itself, which decrypts to the original secret using the user's passphrase

### Never Stored Anywhere

- Plaintext secrets (seed phrases, private keys, messages)
- User passphrases
- Unhashed titles
- Decryption keys or key material

## Complete Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  CONNECT     │     │   WRITE      │     │   ENCRYPT    │     │   UPLOAD     │
│  WALLET      │ ──> │   SECRET     │ ──> │ IN BROWSER   │ ──> │ TO LIGHTHOUSE│
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
                                                                      │
                                                                      ▼
                                                               ┌──────────────┐
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     │ IPFS/FILECOIN│
│  DECRYPT     │     │   FETCH      │     │   REGISTER   │     │   (CID)      │
│  LOCALLY     │ <── │  CIPHERTEXT  │ <── │  CID ONCHAIN │ <── │              │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

### Step by Step

1. **Connect Wallet** — User connects via RainbowKit (MetaMask, WalletConnect, etc.) to Filecoin Calibration testnet.

2. **Write Secret** — User enters a secret (seed phrase, private key, message, etc.), a title, and a passphrase.

3. **Encrypt in Browser** — `crypto.js` uses the Web Crypto API to:
   - Derive an AES-256 key via PBKDF2-SHA256 (250,000 iterations) from the user's passphrase
   - Generate a random 16-byte salt and 12-byte IV
   - Encrypt the secret with AES-256-GCM
   - Produce an `EncryptedPayload` with all parameters needed for future decryption

4. **Upload to Lighthouse** — `lighthouse.js` serializes the `EncryptedPayload` to JSON and calls `lighthouse.uploadText()`, which uploads to IPFS and pins via Filecoin. Returns a CID.

5. **Register CID Onchain** — `contract.js` calls `GrimoireRegistry.createInscription(cid, kind, titleHash)` on FEVM. The transaction records the CID and metadata onchain. A tiny amount of tFIL is consumed as gas.

6. **Retrieve CID** — The frontend calls `getMyInscriptions()` to list all CIDs associated with the connected wallet.

7. **Decrypt Locally** — The frontend fetches the encrypted payload from the Lighthouse gateway (or fallback IPFS gateways), and the user provides their passphrase to decrypt locally via the Web Crypto API. The plaintext is never persisted — it is shown in-memory and discarded on navigation.

## Why Secrets Are Never Stored Plaintext or Onchain

The blockchain is a public, append-only ledger. Every byte stored in a smart contract is visible to every node and every block explorer forever. Storing a plaintext seed phrase or private key onchain is equivalent to publishing it on the front page of a newspaper.

Grimoire stores only the **CID** — an opaque hash pointing to an encrypted blob. The ciphertext on IPFS is useless without the passphrase. Even Lighthouse, as the storage provider, cannot decrypt the payload because it never receives the passphrase.

This architecture ensures:
- **No trusted third party** has access to secrets
- **Blockchain immutability** provides a tamper-proof index of your inscriptions
- **Filecoin's decentralized storage** provides durability and censorship resistance
- **The user alone holds the keys** — literally

## Security Boundaries

| Boundary | Protected By |
|----------|-------------|
| Secret at rest | AES-256-GCM encryption |
| Key derivation | PBKDF2-SHA256, 250,000 iterations |
| Secret in transit | HTTPS (Lighthouse API) + already encrypted |
| Onchain privacy | CID-only storage, no plaintext metadata |
| Title privacy | SHA-256 hash stored, title never transmitted |
| Wallet security | User's wallet (MetaMask, etc.) — Grimoire never requests private keys |

## Project Structure

```
grimoire/
├── contracts/               # Hardhat + Solidity
│   ├── contracts/
│   │   └── GrimoireRegistry.sol   # Onchain registry
│   ├── scripts/
│   │   └── deploy.cjs             # Deployment script
│   ├── test/
│   │   └── GrimoireRegistry.test.cjs  # Contract tests
│   └── hardhat.config.cjs
├── src/
│   ├── lib/
│   │   ├── crypto.js          # Client-side encryption
│   │   ├── lighthouse.js      # Lighthouse upload/fetch
│   │   └── contract.js        # FEVM contract interaction
│   ├── config.js              # RainbowKit, constants
│   └── main.jsx               # App entry point
├── index.html                 # SPA shell
├── vite.config.js
└── package.json
```
