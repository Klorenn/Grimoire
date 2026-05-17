# Grimoire Roadmap

## Phase 1 — MVP (Current)

**Goal**: Prove the core loop — encrypt, store on Filecoin, register onchain, retrieve, decrypt.

### Features

- **Wallet Connection**: RainbowKit integration with Filecoin Calibration testnet (chainId 314159). Support for MetaMask, WalletConnect, and other wagmi-compatible wallets.
- **AES-256-GCM Encryption**: Client-side encryption via Web Crypto API with PBKDF2 key derivation (SHA-256, 250,000 iterations). Random salt and IV per encryption.
- **Lighthouse Upload**: Encrypted payloads uploaded to IPFS/Filecoin via Lighthouse SDK. Filecoin storage deals initiated automatically.
- **FEVM Registry**: Smart contract (`GrimoireRegistry.sol`) deployed on Filecoin Calibration. Stores CID, kind, titleHash, owner, and creation timestamp. Events emitted for all inscriptions.
- **Reveal / Decrypt**: Fetch encrypted payload from Lighthouse gateway (with IPFS fallbacks), decrypt in browser with user passphrase.
- **Title Hashing**: SHA-256 hash of title stored onchain. Plaintext titles never leave the browser.
- **Multi-Gateway Fetch**: Primary Lighthouse gateway with fallback chain (ipfs.io, cloudflare-ipfs.com, dweb.link).

### Limitations

- Text-only secrets (no file uploads)
- Basic inscription list UI
- Single user, no sharing or inheritance
- No storage renewal strategy
- No audit

---

## Phase 2 — Usability & Resilience

**Goal**: Make Grimoire practical for everyday use with file support and better data management.

### Features

- **File Uploads**: Support for encrypting and storing arbitrary files (images, documents, archives) alongside text secrets. Chunked encryption for large files.
- **Better Collection UI**: Search, filter by kind, sort by date. Thumbnail previews for file inscriptions. Bulk operations (export multiple inscriptions).
- **Encrypted Backup Export**: Export all inscriptions as a single encrypted archive. Import on another device. Password-protected JSON or zip format.
- **Multiple Gateways with Verification**: Hash verification on fetch to ensure gateway integrity. Configurable gateway list. Automatic gateway health checks.
- **Offline Mode**: Cache encrypted payloads locally for offline access. Service worker for PWA support.
- **Passphrase Strength Meter**: Real-time entropy estimation during passphrase creation. zxcvbn integration.
- **Improved Mobile UX**: Responsive design for mobile wallets. Touch-optimized interactions.

### Technical

- IPFS pinning redundancy (pin to multiple services: Lighthouse + Pinata + web3.storage)
- Deal status monitoring dashboard
- Automated deal renewal notification system
- PWA manifest and service worker

---

## Phase 3 — Inheritance & Sustainability

**Goal**: Solve the "what happens to my secrets when I'm gone" problem and ensure long-term data durability.

### Features

- **Inheritance (Dead-Man's Switch)**: Designate a beneficiary address. If the owner does not send a "heartbeat" transaction within a configurable period (e.g., 6 months or 1 year), the beneficiary can claim the inscriptions. Implemented as a Solidity contract extension.
- **Multisig Heirs**: N-of-M heir approval for inheritance. Multiple beneficiaries must agree before claiming. Prevents a single compromised heir from accessing everything.
- **Synapse SDK / Filecoin Onchain Cloud**: Integration with [Synapse](https://docs.filecoin.cloud) for programmable storage automation. Onchain storage contracts that programmatically manage deal renewal, replication factor, and storage provider selection.
- **Storage Renewal Strategy**: Automated renewal payments via smart contract. Users deposit FIL into an escrow contract that pays storage providers on a recurring basis. Configurable renewal parameters (duration, replication, budget).
- **Time-Locked Inscriptions**: Option to make inscriptions only decryptable after a specific date or block height. Enables "time capsule" use case.
- **Social Recovery**: Optional recovery mechanism where trusted contacts can collectively help recover access if the passphrase is lost (via Shamir Secret Sharing or similar threshold scheme).

### Technical

- Upgradeable contract pattern for inheritance features
- Synapse SDK integration for storage automation
- Recurring payment escrow contract
- Threshold cryptography for social recovery

---

## Phase 4 — Audit, Ecosystem & Protocol

**Goal**: Establish Grimoire as a production-ready, audited, and extensible protocol.

### Features

- **Security Audit**: Full external security audit of the smart contract, encryption implementation, and overall architecture by a reputable firm (e.g., Trail of Bits, OpenZeppelin, Consensys Diligence).
- **Open Source SDK**: Publish `@grimoire/sdk` as an npm package. Provide JavaScript/TypeScript SDK for third-party developers to build Grimoire-compatible apps. Include encryption, upload, retrieval, and contract interaction utilities.
- **CLI Tool**: Command-line interface for power users: `grimoire encrypt`, `grimoire decrypt`, `grimoire list`, `grimoire export`, `grimoire verify`. Support for scripting and automation.
- **Protocol Specification**: Formal protocol spec defining the Grimoire data format, encryption parameters, contract interface, and gateway behavior. Enables independent implementations in other languages (Rust, Go, Python).
- **Filecoin Mainnet Deployment**: Full deployment on Filecoin Mainnet (chainId 314). Migration guide from Calibration.
- **Hardware Wallet Guides**: Step-by-step documentation for using Grimoire with Ledger, Trezor, and other hardware wallets.
- **Browser Extension**: Companion browser extension for quick access to encrypted secrets without opening the full app.

### Technical

- Formal verification of contract logic
- Penetration testing of the full stack
- NIST-compliant encryption parameters
- SDK with full TypeScript types and documentation
- Protocol spec in IETF RFC-style format

---

## Beyond Phase 4 (Ideas)

- **Mobile App**: React Native or Flutter app with biometric unlock
- **Grimoire DAO**: Community governance over protocol upgrades and standardization
- **Encrypted Sharing**: Time-limited, revocable sharing of specific inscriptions with other wallet addresses
- **Cross-Chain**: Register CIDs on multiple chains (Ethereum, Polygon, Solana) for redundancy
- **Hardware Enclave Support**: Integration with secure enclaves (Apple Secure Enclave, Android Keystore) for key storage
- **Post-Quantum Readiness**: Migration path to post-quantum encryption algorithms when they become standardized
