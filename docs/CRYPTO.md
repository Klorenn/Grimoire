# Grimoire — Cryptography

## Encryption Model

Grimoire uses **deterministic wallet-signature key derivation** + **AES-256-GCM** for client-side encryption.

**No passphrase. No server. No recovery.**

### Key Derivation

```
wallet.signMessage("Grimoire Vault Key Derivation v1 · {address}")
        ↓
    EIP-191 personal sign
        ↓
    SHA-256(signature)
        ↓
    256-bit AES-GCM key
```

- Same wallet + same message = same key (deterministic)
- Different wallet = different key (no cross-access)
- Signature never leaves browser
- No passphrase to remember or lose
- **Risk:** lose wallet = lose all inscriptions (by design)

### Encryption (per inscription)

```
AES-256-GCM
├── Key: derived from wallet signature (256 bits)
├── IV: random 12 bytes (per encryption, stored with ciphertext)
├── Plaintext: secret content or file bytes
└── Output: { ciphertext (base64), iv (base64), version, algorithm, kdf, createdAt }
```

- AES-256-GCM provides authenticated encryption (confidentiality + integrity)
- Random IV per encryption prevents pattern analysis
- IV is safe to store publicly (it's not a secret)
- No PBKDF2 needed (key is already 256-bit from SHA-256)

### Decryption

```
EncryptedPayload → extract iv, ciphertext
wallet.signMessage(same message) → SHA-256 → key
AES-256-GCM.decrypt(key, iv, ciphertext) → plaintext
```

- Decryption happens entirely in browser
- Content is never sent to any server
- Decrypted content cleared from React state on modal close

## File Encryption

```
File (PDF, image, etc.)
    ↓
File.arrayBuffer() → raw bytes
    ↓
AES-256-GCM.encrypt(key, iv, bytes)
    ↓
Encrypted payload: { ciphertext (base64), iv (base64), fileName, mimeType, size }
    ↓
Upload to Pinata via pinFileToIPFS (as encrypted blob)
```

- File metadata (name, type, size) stored in encrypted payload
- Original file never uploaded unencrypted
- On decrypt: AES-GCM → ArrayBuffer → Blob → download/view

## Payload Format (grimoire-v2)

```json
{
  "version": "grimoire-v2",
  "algorithm": "AES-256-GCM",
  "kdf": "WALLET-SIGNATURE",
  "iterations": 0,
  "salt": "",
  "iv": "(base64, 12 bytes)",
  "ciphertext": "(base64)",
  "createdAt": "2026-05-17T12:00:00.000Z"
}
```

For file payloads:
```json
{
  "ciphertext": "(base64)",
  "iv": "(base64)",
  "fileName": "document.pdf",
  "mimeType": "application/pdf",
  "size": 123456
}
```

## Security Properties

| Property | Guarantee |
|----------|-----------|
| Confidentiality | ✅ AES-256-GCM (military-grade) |
| Integrity | ✅ GCM authentication tag |
| Forward secrecy | ❌ Same key for all inscriptions (deterministic) |
| Key recovery | ❌ By design — no backdoor |
| Cross-device | ✅ Same wallet on any device → same key |
| Offline encryption | ✅ Web Crypto API works offline |

## Threat Model

### What Grimoire Protects Against
- Server hacks (no server)
- Database leaks (no database)
- Cloud provider access (encrypted before upload)
- Subpoena to Grimoire team (we have no keys)
- IPFS gateway compromise (ciphertext is useless without key)
- Smart contract exploit (only CID stored, not content)

### What Grimoire Does NOT Protect Against
- Wallet compromise (attacker can sign = can decrypt)
- Malicious browser extension (can read DOM)
- Physical device access (keyboard logger, screen capture)
- User tricked into signing on phishing site
- Quantum computing (future threat to ECC, not AES-256)

## Backward Compatibility

- `grimoire-v1`: Passphrase-based (PBKDF2-SHA256, 250K iterations). Deprecated but supported for decryption.
- `grimoire-v2`: Wallet-signature based. Current version. All new inscriptions use this.

## Implementation Files

- `src/lib/crypto.js` — All encryption/decryption/key derivation functions
- `src/lib/lighthouse.js` — Upload/fetch encrypted payloads to/from Pinata
- `src/components/InscribeForm.jsx` — Form that triggers encryption flow
- `src/components/RevealModal.jsx` — Modal that triggers decryption flow
