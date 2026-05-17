# Grimoire Storage

Grimoire stores encrypted payloads on **IPFS/Filecoin** via the **Lighthouse SDK**. This document explains the data format, upload and retrieval flows, gateway architecture, and how Filecoin storage deals work.

## EncryptedPayload Format

Every encrypted secret is serialized as a JSON object with the following schema:

```jsonc
{
  "version": "grimoire-v1",        // Schema version for forward compatibility
  "algorithm": "AES-256-GCM",       // Encryption algorithm
  "kdf": "PBKDF2-SHA256",          // Key derivation function
  "iterations": 250000,            // PBKDF2 iteration count
  "salt": "base64...",             // 16-byte random salt (Base64 encoded)
  "iv": "base64...",               // 12-byte random initialization vector (Base64 encoded)
  "ciphertext": "base64...",       // Encrypted secret (Base64 encoded)
  "createdAt": "2025-01-15T..."    // ISO 8601 timestamp of encryption
}
```

| Field | Type | Description |
|-------|------|-------------|
| `version` | `string` | Schema version (`grimoire-v1`). Enables future format changes with backward-compatible decryption. |
| `algorithm` | `string` | Encryption algorithm identifier for the Web Crypto API (`AES-GCM` with 256-bit key). |
| `kdf` | `string` | Key derivation function (`PBKDF2` with SHA-256). |
| `iterations` | `number` | PBKDF2 iteration count. 250,000 is the current value. May increase in future versions. |
| `salt` | `string` | 16-byte random salt, Base64-encoded. Prevents rainbow table attacks. Unique per encryption. |
| `iv` | `string` | 12-byte random initialization vector, Base64-encoded. Ensures identical plaintext produces different ciphertext. Unique per encryption. |
| `ciphertext` | `string` | The encrypted secret, Base64-encoded. Includes the GCM authentication tag (16 bytes) appended by the Web Crypto API. |
| `createdAt` | `string` | ISO 8601 timestamp of when the encryption was performed. Purely informational — not used in cryptographic operations. |

### Why These Fields Are Stored

All parameters needed for decryption (salt, IV, iterations, algorithm) are stored alongside the ciphertext. This means:
- The user only needs to remember their passphrase — everything else is in the payload
- Future versions can change parameters (e.g., increase iterations) without breaking old payloads
- The schema version allows the decryption code to handle multiple formats

## Upload Flow

```
User Input (secret + passphrase)
        │
        ▼
  encryptSecret(secret, passphrase)     ← crypto.js
        │
        ▼
  EncryptedPayload object
        │
        ▼
  JSON.stringify(payload)               ← Serialize to JSON string
        │
        ▼
  lighthouse.uploadText(json, key)      ← lighthouse.js
        │
        ├── Lighthouse uploads to IPFS
        ├── Lighthouse pins the content
        ├── Lighthouse initiates Filecoin deal
        │
        ▼
  Response: { data: { Hash: "bafy..." } }
        │
        ▼
  CID returned to frontend
        │
        ▼
  registerCidOnchain(cid, kind, titleHash)   ← contract.js
```

### Code Path

`src/lib/crypto.js` → `src/lib/lighthouse.js` → `src/lib/contract.js`

The `encryptSecret()` function produces the `EncryptedPayload`. The `uploadEncryptedPayload()` function serializes it and uploads via Lighthouse. The `registerCidOnchain()` function writes the resulting CID to the smart contract.

## Fetch Flow

```
User clicks an inscription
        │
        ▼
  CID extracted from contract data
        │
        ▼
  fetchEncryptedPayload(cid)           ← lighthouse.js
        │
        ├── Try: gateway.lighthouse.storage/ipfs/{cid}
        ├── Try: ipfs.io/ipfs/{cid}
        ├── Try: cloudflare-ipfs.com/ipfs/{cid}
        ├── Try: dweb.link/ipfs/{cid}
        │
        ▼
  EncryptedPayload JSON
        │
        ▼
  decryptSecret(payload, passphrase)   ← crypto.js
        │
        ▼
  Plaintext secret displayed on screen
```

### Gateway Priority

| # | Gateway | Description |
|---|---------|-------------|
| 1 | `gateway.lighthouse.storage/ipfs/{cid}` | **Primary** — Lighthouse's own gateway, fastest for Lighthouse-pinned content |
| 2 | `ipfs.io/ipfs/{cid}` | Public IPFS gateway run by Protocol Labs |
| 3 | `cloudflare-ipfs.com/ipfs/{cid}` | Cloudflare's IPFS gateway, high availability |
| 4 | `dweb.link/ipfs/{cid}` | Protocol Labs' alternative gateway |

The fallback chain ensures retrieval even if Lighthouse's gateway is temporarily unavailable. All gateways serve the same content-addressed data — a CID always resolves to the same bytes regardless of which gateway serves it.

## CID as Permanent Address

A **Content Identifier (CID)** is a cryptographic hash of the content. This has profound implications:

- **Content-addressed**: `CID = hash(content)`. If the content changes, the CID changes. This provides tamper evidence — any modification to the encrypted payload would produce a different CID, and the contract would point to the old (correct) one.
- **Location-independent**: The CID does not specify where data is stored. It is a universal address — ask any IPFS node "do you have this CID?" and they can answer.
- **Permanent**: As long as someone on the IPFS/Filecoin network stores the content, it remains retrievable via its CID. The CID never expires or changes.
- **Verifiable**: You can independently verify that the data you retrieved matches the CID by re-hashing it.

In Grimoire, the CID stored onchain is the **only permanent identifier** for an inscription's encrypted content. The contract cannot be changed (blockchain immutability), and the CID cannot change (content addressing). This double immutability provides a strong guarantee: your encrypted data, once registered, is permanently indexed.

## Encrypted Content vs. Public Metadata

| Property | Encrypted Content (IPFS) | Public Metadata (Smart Contract) |
|----------|--------------------------|----------------------------------|
| **Content** | Ciphertext of the secret | `cid`, `kind`, `titleHash`, `owner`, `createdAt` |
| **Visibility** | Publicly accessible via CID | Publicly visible on blockchain |
| **Readability** | Encrypted — requires passphrase | Plaintext metadata, no secrets |
| **Modifiability** | Content-addressed — cannot be modified | Immutable — cannot be modified |
| **Deletability** | Can be unpinned (deal expiry) | Cannot be deleted from blockchain |
| **Storage target** | Filecoin storage providers | FEVM state (replicated across all nodes) |

The CID itself is public. Anyone who knows a CID can fetch the encrypted blob. This is not a security concern — the blob is encrypted with AES-256-GCM, and without the passphrase, it yields no information. This is the same principle that makes public-key cryptography safe: the key can be public as long as the decryption key is private.

## Lighthouse API Key Setup

1. Go to [files.lighthouse.storage](https://files.lighthouse.storage) and sign in with your wallet
2. Navigate to **API Key** in the dashboard
3. Generate a new API key
4. Copy the key and add it to Grimoire's `.env` file:

```
VITE_LIGHTHOUSE_API_KEY=your-api-key-here
```

The API key is used by the Lighthouse SDK to authenticate uploads. Without it, uploads will fail with an error.

In production, the API key is compiled into the frontend bundle. The API key is visible to anyone who inspects the browser bundle. Lighthouse's pricing model accounts for this — the key authorizes uploads but does not grant access to stored data without the CID.

## Filecoin Deals and Verification

After uploading via Lighthouse, the content is not just on IPFS — it is also backed by a **Filecoin storage deal**. The deal ensures that at least one storage provider is economically incentivized to store the data for the deal duration.

### Checking Deal Status

```javascript
import lighthouse from '@lighthouse-web3/sdk';

const dealStatus = await lighthouse.dealStatus(cid);
console.log(dealStatus);
```

Lighthouse's `dealStatus()` returns deal information including:
- Whether a deal has been proposed
- Which storage provider accepted the deal
- Deal duration and expiration
- Deal status (active, expired, slashed)

### Deal Lifecycle

```
Upload → IPFS pin → Deal proposed → Deal accepted → Deal active → Deal expires
```

During the active phase, the storage provider continuously proves they are storing the data (Proof-of-Spacetime). If they fail to prove storage, they are penalized (slashed). This economic security is what differentiates Filecoin from simple IPFS pinning.

In the MVP, deal management is handled entirely by Lighthouse. Future phases will add explicit deal renewal strategies.
