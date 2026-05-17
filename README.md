# Grimoire

**Your personal encrypted vault on Filecoin.**

A Web3 application for storing your most precious data — seed phrases, private keys, documents, letters, and notes — encrypted client-side, stored permanently on Filecoin, and registered onchain via FEVM.

> ⚠️ **MVP Warning**: This is a minimum viable product. Do NOT use with real seed phrases or funds without a security audit. Filecoin storage requires deal renewal; "forever" cannot be guaranteed without a renewal strategy.

---

## Architecture

```
You → Wallet (RainbowKit) → Browser (AES-256-GCM) → Lighthouse → Filecoin/IPFS → FEVM
```

1. **Connect wallet** (RainbowKit + wagmi on Filecoin Calibration)
2. **Write a secret** — encrypted in your browser before it leaves your device
3. **Upload ciphertext** to Filecoin/IPFS via Lighthouse SDK
4. **Register CID onchain** in GrimoireRegistry smart contract (FEVM)
5. **Retrieve & decrypt** locally using your passphrase

**Nothing is ever stored plaintext.** No backend. No database. No server.

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm
- A Lighthouse API key ([get one](https://files.lighthouse.storage/))

### Setup

```bash
# Clone and install frontend
npm install --legacy-peer-deps

# Install contract dependencies
cd contracts
npm install --legacy-peer-deps
cd ..

# Configure environment
cp .env.example .env
# Edit .env with your Lighthouse API key
```

### Run

```bash
# Frontend dev server
npm run dev
# → http://localhost:5173

# Compile & test contracts
cd contracts
npx hardhat compile
npx hardhat test

# Deploy to Filecoin Calibration
npx hardhat run scripts/deploy.cjs --network calibration
# → Copy the deployed address to .env as VITE_GRIMOIRE_CONTRACT_ADDRESS
```

### Flow

1. Open `http://localhost:5173`
2. Click "Connect" → connect your wallet
3. Navigate to the Vault (`#/vault`)
4. Click "New Inscription"
5. Fill in title, kind, secret, and passphrase
6. Click "Inscribe" — the secret is encrypted, uploaded to Filecoin, and registered onchain
7. View your inscriptions in the vault
8. Click "Reveal" → enter passphrase → the secret is decrypted locally

---

## Project Structure

```
├── index.html              # Entry point
├── vite.config.js          # Vite configuration
├── package.json            # Frontend dependencies
├── .env.example            # Environment template
│
├── src/
│   ├── main.jsx            # React entry (providers)
│   ├── config.js           # Wagmi/RainbowKit + constants
│   ├── lib/
│   │   ├── crypto.js       # AES-256-GCM encryption
│   │   ├── lighthouse.js   # Filecoin/IPFS upload/fetch
│   │   └── contract.js     # GrimoireRegistry onchain
│   └── components/
│       └── WalletConnect.jsx
│
├── icons.jsx               # Icon components
├── i18n.jsx                # EN/ES translations
├── sections.jsx            # Landing page sections
├── shell.jsx               # App shell layout
├── screen-*.jsx            # Apartados (vault, keep, etc.)
├── app.jsx                 # Hash router
├── styles.css              # Landing page styles
├── apartados.css           # App shell styles
│
├── contracts/
│   ├── contracts/GrimoireRegistry.sol
│   ├── scripts/deploy.cjs
│   ├── test/GrimoireRegistry.test.cjs
│   └── hardhat.config.cjs
│
├── docs/                   # Documentation
│   ├── ARCHITECTURE.md
│   ├── FILECOIN.md
│   ├── SECURITY.md
│   ├── SMART_CONTRACTS.md
│   ├── STORAGE.md
│   ├── DEVELOPMENT.md
│   ├── ROADMAP.md
│   └── REFERENCES.md
│
└── assets/                 # Videos, images
```

---

## Security

- **Client-side encryption**: AES-256-GCM with PBKDF2 (250K iterations)
- **No plaintext anywhere**: secrets and passphrases never leave your browser
- **Onchain**: only CID + kind + titleHash — no content, no titles
- **No backend**: no server to hack, no database to leak
- **Lost passphrase = lost data**: there is no recovery mechanism

See [docs/SECURITY.md](docs/SECURITY.md) for the full threat model.

---

## Networks

| Network | Chain ID | Symbol | Status |
|---------|----------|--------|--------|
| Filecoin Calibration | 314159 | tFIL | Active (default) |
| Filecoin Mainnet | 314 | FIL | Future |

---

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Filecoin](docs/FILECOIN.md)
- [Security](docs/SECURITY.md)
- [Smart Contracts](docs/SMART_CONTRACTS.md)
- [Storage](docs/STORAGE.md)
- [Development](docs/DEVELOPMENT.md)
- [Roadmap](docs/ROADMAP.md)
- [References](docs/REFERENCES.md)

---

## License

MIT
