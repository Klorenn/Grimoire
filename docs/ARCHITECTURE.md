# Grimoire — Architecture

## Overview

Grimoire is a **client-side encrypted vault** on Filecoin. Users inscribe their most precious data (seed phrases, private keys, documents, letters) encrypted in the browser, stored on IPFS/Filecoin via Pinata, and registered onchain via FEVM smart contracts.

**Core principle: no plaintext ever leaves the browser.**

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (Client)                      │
│  ┌──────────┐  ┌───────────┐  ┌──────────────────────┐ │
│  │ RainbowKit│  │ Web Crypto│  │     Pinata SDK       │ │
│  │  + wagmi │  │   AES-GCM │  │  pinJSONToIPFS       │ │
│  │  + viem  │  │  PBKDF2   │  │  pinFileToIPFS       │ │
│  └────┬─────┘  └─────┬─────┘  └──────────┬───────────┘ │
│       │              │                    │             │
└───────┼──────────────┼────────────────────┼─────────────┘
        │              │                    │
        ▼              ▼                    ▼
┌───────────┐  ┌──────────────┐  ┌──────────────────┐
│  Wallet   │  │  Ciphertext  │  │  IPFS / Filecoin  │
│ Signature │  │  (AES-256)   │  │  (Pinata gateway) │
│  → Key    │  │  in browser  │  │  public + cached  │
└─────┬─────┘  └──────────────┘  └──────────────────┘
      │
      ▼
┌──────────────────────────────────────┐
│  FEVM Smart Contract                 │
│  GrimoireRegistry v2                 │
│  · createInscription(cid, kind,      │
│    titleHash, unlockAt)              │
│  · getMyInscriptions()               │
│  · ping() · configureHeirs()         │
│  Filecoin Calibration (chain 314159) │
└──────────────────────────────────────┘
```

## Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Vite 5 + React 18 | SPA build system |
| Styling | Tailwind CSS v4 CDN + custom CSS | Ghibli-inspired design |
| Wallet | RainbowKit 2.2 + wagmi 2 + viem 2 | Multi-wallet connection |
| Encryption | Web Crypto API (AES-256-GCM) | Client-side encryption |
| Key Derivation | EIP-191 personal sign + SHA-256 | Deterministic per wallet |
| Storage | Pinata (pinJSONToIPFS / pinFileToIPFS) | IPFS upload + gateway |
| Blockchain | Filecoin Calibration (testnet, 314159) | Smart contract execution |
| Smart Contract | Solidity 0.8.20 + Hardhat 2.22 | GrimoireRegistry v2 |
| i18n | Custom React context (EN / ES) | Bilingual support |
| State | React useState + wagmi hooks | Client-only state |

## Data Flow

### Inscription Creation
1. User fills form (title, kind, content/file, optional chapter, optional time-lock)
2. User signs deterministic message: `"Grimoire Vault Key Derivation v1 · {walletAddress}"`
3. SHA-256 of signature → AES-256 key (same wallet = same key)
4. Content encrypted with AES-256-GCM (random 12-byte IV per encryption)
5. Encrypted payload uploaded to Pinata → IPFS → returns CID
6. `createInscription(cid, kind, titleHash, unlockAt)` called on FEVM
7. Tx confirmed, inscription appears in vault

### Inscription Retrieval (Reveal)
1. User clicks "Reveal" on an inscription
2. User signs same deterministic message → same AES key
3. Encrypted payload fetched from IPFS via Pinata gateway (or fallbacks)
4. Content decrypted locally in browser
5. Displayed — cleared from state on close

### Time-Lock Flow
1. User sets optional `unlockAt` date during inscription
2. Contract stores `unlockAt` timestamp
3. Vault shows ⏳ countdown for locked inscriptions
4. UI prevents Reveal until `now >= unlockAt` (client-enforced)
5. After unlock date, inscription behaves normally

### Heir / Dead Man's Switch Flow
1. Owner configures heirs (wallet addresses), threshold, dormancy period
2. Owner pings periodically (automatic on every inscription/edit)
3. If owner stops pinging for dormancy period:
   - Heirs can check `isDormant(owner)`
   - Heirs collect M-of-N signatures
   - Heirs call `claimAsHeir()` to gain access
4. Phase 4+: Heir key escrow via ECIES encryption of AES key

## Onchain vs Offchain

| Data | Location | Encrypted? |
|------|----------|-----------|
| Secret content | IPFS (Pinata) | ✅ AES-256-GCM |
| File content | IPFS (Pinata) | ✅ AES-256-GCM |
| Title hash | FEVM contract | ✅ SHA-256 |
| Kind | FEVM contract | ❌ (public metadata) |
| CID | FEVM contract | ❌ (address only) |
| unlockAt | FEVM contract | ❌ |
| Chapter | Encrypted payload | ✅ |
| Wallet address | FEVM contract (msg.sender) | ❌ |
| Heir config | FEVM contract | ❌ |
| Passphrase | Nowhere | N/A (wallet signature used) |

## Security Model

- **No backend**: No server to hack, no database to leak
- **No passphrase**: Key derived from wallet signature (deterministic)
- **No plaintext storage**: Nothing unencrypted leaves the browser
- **Onchain minimalism**: Only CID, kind, titleHash, unlockAt stored onchain
- **Lost wallet = lost access**: By design. No recovery backdoor.

## File Structure

```
├── index.html              Entry point
├── vite.config.js          Vite configuration
├── package.json            Dependencies & scripts
├── .env.example            Environment template
│
├── src/
│   ├── main.jsx            React entry (providers)
│   ├── config.js           Wagmi/RainbowKit + constants
│   ├── lib/
│   │   ├── crypto.js       AES-256-GCM + wallet-signature key derivation
│   │   ├── lighthouse.js   Pinata upload/fetch (JSON + files)
│   │   ├── contract.js     Onchain read integration
│   │   └── templates.js    5 pre-built inscription templates
│   └── components/
│       ├── WalletConnect.jsx
│       ├── InscribeForm.jsx   Form with templates, file upload, time-lock, seed grid
│       └── RevealModal.jsx    Decrypt via wallet signature
│
├── icons.jsx               SVG icon components
├── i18n.jsx                EN/ES dictionaries + LangProvider
├── sections.jsx            Landing page (9 sections)
├── shell.jsx               App shell (TopBar + Sidebar)
├── screen-vault.jsx        Vault dashboard (real contract data)
├── screen-inscribe.jsx     Inscribe landing
├── screen-chapters.jsx     Chapter organization
├── screen-keepers.jsx      Heir configuration
├── screen-shared.jsx       Shared access
├── screen-activity.jsx     Onchain event log
├── screen-settings.jsx     Language + network settings
├── screen-disconnect.jsx   Wallet disconnect
├── screen-proof.jsx        Public proof-of-life page
├── screen-recovery.jsx     Recovery guide (EN/ES)
├── screen-manifesto.jsx    Manifesto (EN/ES)
├── screen-keep.jsx         What to Keep (Phase 2)
├── screen-inheritance.jsx  Inheritance (Phase 3)
├── screen-heirs.jsx        Heir Settings (Phase 3)
├── app.jsx                 Hash-based router
├── styles.css              Landing page styles
├── apartados.css           App shell styles
│
├── contracts/
│   ├── contracts/GrimoireRegistry.sol
│   ├── scripts/deploy.cjs
│   ├── test/GrimoireRegistry.test.cjs
│   └── hardhat.config.cjs
│
├── docs/                   Documentation
└── assets/                 Videos, images, icon
```
