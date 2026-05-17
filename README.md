# Grimoire

**Your personal encrypted vault on Filecoin.**

Inscribe your most precious data — seed phrases, private keys, documents, letters — encrypted client-side with your wallet, stored on Filecoin, anchored onchain via FEVM.

> ⚠️ **MVP Warning**: Do NOT use with real seed phrases or funds without a security audit. Pinata free tier has limits.

---

## How it works

```
Connect wallet → Sign → AES-256-GCM encrypt in browser → Upload to IPFS (Pinata) → Register CID onchain (FEVM)
```

**No passphrase.** Your wallet signature generates a deterministic AES key. Same wallet = same key, always.

**No backend.** No database. No server. Nothing plaintext ever leaves your browser.

---

## Quick Start

```bash
git clone https://github.com/Klorenn/Grimoire.git
cd Grimoire
npm install --legacy-peer-deps
cp .env.example .env
# Get a free Pinata JWT at https://pinata.cloud → API Keys
# Set VITE_PINATA_JWT in .env
npm run dev
```

Open `http://localhost:3000` → Connect wallet → Begin.

---

## Features

- Wallet-signature key derivation (no passphrase)
- AES-256-GCM client-side encryption
- 5 inscription types + 12/24 word seed grid
- File upload (PDF, images) encrypted before upload
- 5 pre-built templates
- Time-lock inscriptions with live countdown
- Heir configuration (keepers) with threshold + dormancy
- Onchain activity log
- Public proof-of-life page
- Full EN/ES translation (15+ screens)
- RainbowKit + wagmi + viem on Filecoin Calibration

---

## Contract

**GrimoireRegistry v2** — `0xCEa33B5Edb8B5eb982aDB05e4ED30B764081B490` on Filecoin Calibration (chain 314159)

```bash
cd contracts
npx hardhat test        # 5/5 tests
npx hardhat run scripts/deploy.cjs --network calibration
```

---

## Documentation

| Doc | |
|-----|---|
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Full architecture, stack, data flow |
| [APARTADOS.md](docs/APARTADOS.md) | Every screen explained |
| [CRYPTO.md](docs/CRYPTO.md) | Encryption model, key derivation |
| [DEVELOPMENT.md](docs/DEVELOPMENT.md) | Setup, commands, troubleshooting |
| [SMART_CONTRACTS.md](docs/SMART_CONTRACTS.md) | Contract v2 functions + events |
| [FILECOIN.md](docs/FILECOIN.md) | Filecoin + Calibration guide |
| [STORAGE.md](docs/STORAGE.md) | Payload format, upload/fetch |
| [SECURITY.md](docs/SECURITY.md) | Threat model |
| [ROADMAP.md](docs/ROADMAP.md) | Phase 1-4 milestones |
| [REFERENCES.md](docs/REFERENCES.md) | All external links |

---

## License

MIT
