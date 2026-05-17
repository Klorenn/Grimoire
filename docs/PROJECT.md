# Grimoire — Project Documentation

## Overview

Grimoire is a Web3 encrypted vault on Filecoin. Users store their most precious data (seed phrases, private keys, documents, letters, notes) encrypted client-side, stored on Filecoin/IPFS via Lighthouse, and registered onchain via FEVM smart contracts.

**No backend. No database. No server.** Everything happens in the browser.

---

## Architecture

```
Browser (AES-256-GCM) → Lighthouse → Filecoin/IPFS
                         ↓
                    FEVM Smart Contract (CID registry)
```

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite 5 |
| Styling | Tailwind CSS v4 CDN + custom CSS |
| Wallet | RainbowKit 2.2 + wagmi 2 + viem 2 |
| Encryption | Web Crypto API (AES-256-GCM, PBKDF2, SHA-256) |
| Storage | @lighthouse-web3/sdk → IPFS/Filecoin |
| Smart Contract | Solidity 0.8.20 + Hardhat 2.22 |
| Blockchain | Filecoin Calibration (testnet, chain 314159) |
| i18n | Custom React context (EN / ES) |

---

## All Sections

### Landing Page (`/`)

| Section | Description |
|---------|-------------|
| Navbar | Fixed top, transparent → glass on scroll. Wallet connect, lang toggle, nav links |
| Hero | Full-bleed video background, headline reveal, CTA button |
| Problem | "Paper burns. Drives fail. Companies fade." — 3 cards + visual |
| Solution | "A grimoire that cannot be burned" — flow diagram |
| Features | 3×2 grid: seed phrases, private keys, documents, ledger, letters, notes |
| Compare | Table: iCloud vs Notion vs Hardware wallet vs Grimoire |
| Science | "How the magic works" — encryption/storage/onchain explainer |
| Testimonials | 3 quotes from pseudonymous keepers |
| Pricing | Free (Apprentice) + $12/mo (Keeper) tiers |
| Footer | Links, social (X, GitHub, Telegram), brand |

### Apartados (Inner Pages)

| Route | Page | Status |
|-------|------|--------|
| `#/vault` | Open Grimoire | ✅ Live — real contract data, inscription form, reveal modal |
| `#/keep` | What to Keep | 🔲 Coming in Phase 2 |
| `#/inheritance` | Inheritance | 🔲 Coming in Phase 3 |
| `#/heirs` | Heir Settings | 🔲 Coming in Phase 3 |
| `#/recovery` | Recovery Guide | ✅ Live — 4-step guide (EN/ES) |
| `#/manifesto` | Manifesto | ✅ Live — full text (EN/ES) |

---

## User Flow

1. **Landing** → browse the landing page
2. **Connect Wallet** → RainbowKit modal (MetaMask, Rabby, WalletConnect)
3. **Enter Vault** → click wallet address or "Comenzar" button
4. **New Inscription** → fill title, kind, secret, passphrase
5. **Encrypt** → AES-256-GCM in browser, never leaves device
6. **Upload** → Lighthouse SDK → Filecoin/IPFS → CID
7. **Register** → `createInscription(cid, kind, titleHash)` on FEVM
8. **List** → `getMyInscriptions()` reads from contract
9. **Reveal** → enter passphrase → download CID → decrypt locally

---

## Security Model

| Data | Where | Plaintext? |
|------|-------|-----------|
| Secret content | Browser memory only | Yes (temporary) |
| Encrypted payload | Filecoin/IPFS (Lighthouse) | No |
| CID | FEVM smart contract | Yes |
| Kind | FEVM smart contract | Yes |
| Title hash | FEVM smart contract | Yes (SHA-256) |
| Title | Nowhere | No |
| Passphrase | Browser memory only | Yes (temporary) |
| Wallet key | Wallet extension | Yes (wallet) |

**Nothing is ever stored plaintext in localStorage, sessionStorage, cookies, or any server.**

---

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
│   │   ├── crypto.js       AES-256-GCM encryption/decryption
│   │   ├── lighthouse.js   Filecoin/IPFS upload/fetch
│   │   └── contract.js     Onchain read integration
│   └── components/
│       ├── WalletConnect.jsx  Connect/disconnect buttons
│       ├── InscribeForm.jsx   Inscription creation form
│       └── RevealModal.jsx    Decrypt/reveal modal
│
├── icons.jsx               SVG icon components (Ghibli-style + lucide)
├── i18n.jsx                EN/ES dictionaries + LangProvider
├── sections.jsx            Landing page sections (Navbar→Footer)
├── shell.jsx               App shell layout (TopBar + Sidebar)
├── screen-vault.jsx        Vault dashboard (real data)
├── screen-keep.jsx         What to Keep (Phase 2)
├── screen-inheritance.jsx  Inheritance (Phase 3)
├── screen-heirs.jsx        Heir Settings (Phase 3)
├── screen-recovery.jsx     Recovery Guide
├── screen-manifesto.jsx    Manifesto
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
└── assets/                 Videos, images
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_LIGHTHOUSE_API_KEY` | Lighthouse API key for Filecoin uploads |
| `VITE_GRIMOIRE_CONTRACT_ADDRESS` | Deployed GrimoireRegistry address |
| `VITE_FILECOIN_CALIBRATION_RPC_URL` | Filecoin Calibration RPC endpoint |
| `PRIVATE_KEY` | Deployer wallet private key (contracts only) |
| `FILECOIN_CALIBRATION_RPC_URL` | RPC for Hardhat deploy |

---

## Commands

```bash
# Frontend
npm install --legacy-peer-deps
npm run dev          # http://localhost:3000
npm run build        # Production build → dist/

# Contracts
cd contracts
npm install --legacy-peer-deps
npx hardhat compile
npx hardhat test     # 5/5 tests
npx hardhat run scripts/deploy.cjs --network calibration
```

---

## Contract

**GrimoireRegistry** — `0x3f0bF9B29F276CD3219995d434621b2C70a91267` on Filecoin Calibration

Stores per inscription:
- `owner` (address)
- `cid` (IPFS content identifier)
- `kind` (seed-phrase | private-key | document | letter | note)
- `titleHash` (SHA-256, title never stored plaintext)
- `createdAt` (block timestamp)

Functions: `createInscription`, `getMyInscriptions`, `getInscriptions`

---

## i18n

Dual-language support via `LangProvider` context. All landing page text, vault UI, recovery guide, and manifesto are translated. Language persists in localStorage under `grimoire-lang`.
