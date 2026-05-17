# Grimoire — Project Documentation

## What is Grimoire?

Grimoire is a **Web3 encrypted vault on Filecoin**. Users inscribe their most precious data — seed phrases, private keys, documents, letters to loved ones — encrypted client-side with their wallet, stored permanently on Filecoin, registered onchain via FEVM.

**No backend. No database. No server. No passphrase.** Everything happens in the browser. Your wallet is your key.

## Three Pillars

1. **Encrypted client-side** — AES-256-GCM in the browser. Content never leaves unencrypted.
2. **Stored on Filecoin** — Pinata → IPFS → Filecoin. Cryptographic proofs every 24h.
3. **Anchored onchain via FEVM** — GrimoireRegistry smart contract on Filecoin Calibration.

## Features

| Category | Features |
|----------|----------|
| Encryption | Wallet-signature key derivation, AES-256-GCM, deterministic per wallet |
| Inscriptions | 5 types: seed phrase, private key, document, letter, note |
| Seed phrase | 12/24 word grid, paste detection |
| Files | PDF, images, scans — encrypted before upload |
| Templates | 5 pre-built: Letter, Inventory, Funeral, Emergency, Recovery |
| Time-lock | Optional unlock date per inscription, live countdown in vault |
| Chapters | Folder organization (assigned during creation) |
| Heirs | Configure keeper wallets, threshold, dormancy period |
| Activity | Onchain event log (InscriptionCreated, Pinged, HeirsConfigured) |
| Proof of life | Public page showing inscription count without revealing content |
| i18n | Full EN/ES translation across all 15+ screens |
| Wallet | RainbowKit + wagmi + viem, Filecoin Calibration (314159) |
| Storage | Pinata free tier, instant IPFS upload + download |

## Architecture

```
Browser (AES-256-GCM + wallet signature) → Pinata → IPFS/Filecoin
                                              ↓
                                    FEVM GrimoireRegistry v2
```

Read the full architecture: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

## Quick Start

```bash
npm install --legacy-peer-deps
cp .env.example .env   # Set VITE_PINATA_JWT
npm run dev            # http://localhost:3000
```

Read the full development guide: [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)

## Documentation

| Doc | Content |
|-----|---------|
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Full architecture, stack, data flow, onchain vs offchain |
| [APARTADOS.md](docs/APARTADOS.md) | Detailed guide for every screen and section |
| [CRYPTO.md](docs/CRYPTO.md) | Encryption model, key derivation, threat model |
| [DEVELOPMENT.md](docs/DEVELOPMENT.md) | Setup, commands, troubleshooting |
| [SMART_CONTRACTS.md](docs/SMART_CONTRACTS.md) | Contract v2: structs, functions, events, deployment |
| [FILECOIN.md](docs/FILECOIN.md) | Filecoin explanation, Calibration testnet |
| [STORAGE.md](docs/STORAGE.md) | EncryptedPayload format, upload/fetch flows |
| [SECURITY.md](docs/SECURITY.md) | Threat model, security properties |
| [ROADMAP.md](docs/ROADMAP.md) | Phase 1-4 milestones |
| [REFERENCES.md](docs/REFERENCES.md) | All external docs and repos |

## Contracts

| Network | Address |
|---------|---------|
| Filecoin Calibration (testnet) | `0xCEa33B5Edb8B5eb982aDB05e4ED30B764081B490` |
| Filecoin Mainnet | Future |

## License

MIT
