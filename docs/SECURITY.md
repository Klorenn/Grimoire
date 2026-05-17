# Grimoire Security

Grimoire is designed with a strict **client-side-only** security model. This document explains the threat model, what Grimoire protects against, what it does NOT protect against, and the cryptographic foundations of the system.

## Threat Model

### What Grimoire Protects Against

| Threat | Protection Mechanism |
|--------|---------------------|
| Server-side data breaches | There is no server. No backend, no database, no API. |
| Storage provider reading secrets | Data is encrypted client-side before upload. Lighthouse never sees plaintext. |
| Blockchain data exposure | Only CID, kind, and titleHash are stored onchain. No plaintext, no passphrase. |
| Network eavesdropping of secrets | Secrets are encrypted before any network call. The passphrase never leaves the browser. |
| Censorship of stored data | Filecoin is decentralized. No single entity can delete your encrypted payloads. |
| Data tampering | AES-256-GCM provides authenticated encryption. Any tampering is detected on decryption. |
| Title privacy | Only SHA-256 hashes of titles are stored onchain. Titles themselves never leave the browser. |

### What Grimoire Does NOT Protect Against

| Threat | Explanation |
|--------|-------------|
| **Lost passphrase** | Grimoire has no backdoor, no recovery phrase, and no admin key. If you lose your passphrase, your data is cryptographically irrecoverable. |
| **Weak passphrase** | A short or common passphrase can be brute-forced if the encrypted payload is obtained. Use a strong, unique passphrase. |
| **Compromised device** | If malware (keyloggers, screen capture, clipboard sniffers) is present on your device, it can capture secrets as you type or view them. Grimoire cannot protect against a compromised operating system. |
| **Compromised wallet** | If an attacker gains access to your wallet (private key or seed phrase), they can see your onchain inscriptions (CIDs) but cannot decrypt them without your passphrase. |
| **Phishing** | A fake Grimoire website could trick you into entering secrets. Always verify you are on the correct URL. Grimoire is a client-side app — it has no official hosted version that can be impersonated. |
| **Supply chain attacks** | If the Lighthouse SDK, wagmi, or any npm dependency is compromised, it could exfiltrate data before encryption. Dependency integrity is critical. |
| **Side-channel attacks** | Browser-based crypto is susceptible to timing and side-channel attacks. Web Crypto API mitigates many of these but not all. |
| **Physical access** | If someone has physical access to your unlocked device, they can view decrypted secrets on screen. |

## Passphrase Security

The passphrase is the single most critical component of Grimoire's security:

- **Never stored** — The passphrase is never saved to disk, localStorage, sessionStorage, cookies, or any persistence mechanism.
- **Never transmitted** — The passphrase is never sent over the network. It exists only in the browser's memory during encryption/decryption and is discarded immediately after.
- **No recovery** — There is no "forgot passphrase" flow. There is no admin key. There is no seed phrase for recovery. The encryption is designed so that without the passphrase, the ciphertext yields no information about the plaintext.
- **Strength matters** — PBKDF2 with 250,000 iterations slows brute-force attacks, but a weak passphrase (e.g., "password123") can still be cracked. Use passphrases with at least 40 bits of entropy (roughly 4+ random words).

**The iron law of Grimoire: Lose your passphrase, lose your data. Forever.**

## Wallet Compromise Risks

The wallet is used for two purposes in Grimoire:

1. **Authentication** — Identifying which inscriptions belong to you
2. **Transaction signing** — Paying gas to register CIDs onchain

An attacker who compromises your wallet can:

- View your onchain inscription metadata (CIDs, kinds, title hashes) — but **not** decrypt your secrets because they lack the passphrase
- Create new inscriptions under your address — effectively polluting your registry
- Spend any tFIL in your wallet

An attacker who compromises your wallet **cannot** decrypt your existing secrets unless they also obtain your passphrase. This two-factor separation (wallet + passphrase) is intentional.

## Phishing Warnings

Grimoire is a self-hosted, client-side application. It does not have an official hosted instance. This is both a strength and a risk:

- **Strength**: No central server to hack, no admin keys to steal, no hosted version to impersonate
- **Risk**: Any website could clone Grimoire's UI and add malicious code. Always verify:
  - You built the app from source or downloaded it from a trusted source
  - The URL is your local environment (`localhost:5173`) or a domain you control
  - Your browser console shows no unexpected network requests after entering your passphrase

Never enter your passphrase or secrets on a Grimoire instance you did not set up yourself.

## No Plaintext Anywhere Rule

Grimoire follows a strict "no plaintext anywhere" discipline:

- Secrets are encrypted **before** any `fetch()` or SDK call
- The passphrase is supplied by the user on demand and held in memory only during active encryption or decryption
- Decrypted plaintext is displayed on screen but never persisted to disk, localStorage, or any external service
- Titles are SHA-256 hashed before being sent to the contract — the plaintext title never leaves the browser
- The contract stores only `cid`, `kind`, `titleHash`, `owner`, and `createdAt` — all of which are either opaque hashes or harmless metadata

## Web Crypto API Usage

Grimoire uses the browser's built-in `crypto.subtle` API, which provides hardware-backed, native-performance cryptographic operations:

| Operation | API Call | Parameters |
|-----------|----------|------------|
| Key derivation | `deriveKey` (PBKDF2) | SHA-256, 250,000 iterations |
| Encryption | `encrypt` (AES-GCM) | 256-bit key, 128-bit IV |
| Decryption | `decrypt` (AES-GCM) | 256-bit key, 128-bit IV |
| Random salt/IV | `getRandomValues` | 16 bytes (salt), 12 bytes (IV) |
| Title hashing | `digest` (SHA-256) | |

The Web Crypto API was chosen over JavaScript crypto libraries because:
- It runs in native code, not JavaScript — faster and less susceptible to timing attacks
- It prevents key material from leaking into JavaScript-accessible memory
- It is maintained by browser vendors with security teams and audits

## MVP Audit Warning

**The MVP has not undergone a formal security audit.** Until an audit is completed:

- Do NOT use Grimoire with real seed phrases, private keys, or funds you cannot afford to lose
- Do NOT rely on Grimoire as your sole backup for critical secrets
- Treat the MVP as experimental software — it may contain bugs that could result in permanent data loss
- Test with tFIL on Calibration testnet only for contract interactions
- If testing with real encryption, use throwaway secrets that have no value

Phase 4 of the roadmap includes a formal security audit before production readiness.

## Client-Side Only: No Backend, No Database, No Server

Grimoire has zero server infrastructure:

- **No backend** — The app is 100% static files served by any HTTP server (Vite dev server, nginx, IPFS itself)
- **No database** — All state is either in the user's wallet (onchain contract events) or on Filecoin (encrypted payloads)
- **No API** — The app calls Lighthouse and IPFS gateways for storage/retrieval and an RPC endpoint for blockchain reads/writes. None of these endpoints receive plaintext.
- **No user accounts** — Authentication is via wallet connection (public-key cryptography, not username/password)
- **No session management** — The wallet connection state is managed by wagmi/RainbowKit

This architecture means there is nothing to hack server-side. The attack surface is limited to:
1. The user's browser and device
2. The npm dependencies
3. The Lighthouse and RPC endpoints (which only see encrypted data)
4. The smart contract (which only stores opaque hashes)
