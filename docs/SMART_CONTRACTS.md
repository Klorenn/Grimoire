# Grimoire Smart Contracts

Grimoire uses a single smart contract, `GrimoireRegistry.sol`, deployed on the Filecoin Calibration testnet via FEVM (Filecoin Ethereum Virtual Machine). The contract serves as an immutable, public registry of inscription metadata — it stores only opaque references, never secrets.

## GrimoireRegistry.sol

**Language**: Solidity ^0.8.20
**License**: MIT
**Network**: Filecoin Calibration (chainId: 314159)

### Data Structure

```solidity
struct Inscription {
    address owner;
    string cid;
    string kind;
    string titleHash;
    uint256 createdAt;
}
```

| Field | Type | Description |
|-------|------|-------------|
| `owner` | `address` | Wallet address that created the inscription |
| `cid` | `string` | IPFS Content Identifier pointing to the encrypted payload |
| `kind` | `string` | Inscription type (e.g. "seed-phrase", "private-key", "letter") |
| `titleHash` | `string` | SHA-256 hash of the user's title (title is never stored in plaintext) |
| `createdAt` | `uint256` | Unix timestamp (block timestamp) when the inscription was created |

### Storage

```solidity
mapping(address => Inscription[]) private inscriptions;
uint256 public totalInscriptions;
```

Inscriptions are stored in a mapping from owner address to an array of `Inscription` structs. Only the contract can read the mapping directly; external callers use the getter functions.

### Functions

#### createInscription

```solidity
function createInscription(
    string calldata cid,
    string calldata kind,
    string calldata titleHash
) external;
```

Creates a new inscription for `msg.sender`. Validates that `cid` and `kind` are non-empty. Emits `InscriptionCreated`.

| Parameter | Description |
|-----------|-------------|
| `cid` | IPFS CID — must be non-empty |
| `kind` | Inscription type — must be non-empty |
| `titleHash` | SHA-256 hash of the title (hex-encoded, `0x`-prefixed) |

Gas cost: paid in tFIL by `msg.sender`. Typical cost is minimal (the function only stores a few strings in a dynamic array).

#### getMyInscriptions

```solidity
function getMyInscriptions() external view returns (Inscription[] memory);
```

Returns all inscriptions owned by the caller. This is a `view` function — no gas cost.

#### getInscriptions

```solidity
function getInscriptions(address owner) external view returns (Inscription[] memory);
```

Returns all inscriptions for a given address. Allows looking up another user's public inscription metadata (CIDs, kinds, title hashes are visible to everyone — but ciphertext remains encrypted).

#### getMyInscriptionCount

```solidity
function getMyInscriptionCount() external view returns (uint256);
```

Returns the number of inscriptions owned by the caller.

### Events

#### InscriptionCreated

```solidity
event InscriptionCreated(
    address indexed owner,
    string cid,
    string kind,
    string titleHash,
    uint256 createdAt
);
```

Emitted when `createInscription` succeeds. The `owner` parameter is indexed, allowing efficient filtering by address in block explorers and event listeners.

## Frontend Integration

The frontend communicates with the contract via **viem** through wagmi's `writeContract` and `readContract` functions (`src/lib/contract.js`). The ABI is defined client-side to avoid a build-time dependency on Hardhat artifacts.

```javascript
// Writing (requires wallet signature + gas)
const txHash = await registerCidOnchain(cid, kind, titleHash);

// Reading (no gas, no signature)
const inscriptions = await readMyInscriptions();
```

## Network: Filecoin Calibration

| Property | Value |
|----------|-------|
| Network name | `calibration` (in Hardhat config) |
| Chain ID | `314159` |
| RPC | `https://api.calibration.node.glif.io/rpc/v1` |
| Gas token | tFIL |

tFIL has no real-world value. Faucets are available to obtain test FIL:
- [beryx.zondax.ch/faucet](https://beryx.zondax.ch/faucet)
- [faucet.calibration.fildev.network](https://faucet.calibration.fildev.network)

## Deployment

### Prerequisites

```bash
cd contracts
npm install
cp ../.env.example ../.env    # Set PRIVATE_KEY in .env
```

### Compile

```bash
npx hardhat compile
```

Compiled artifacts are output to `contracts/artifacts/`.

### Test

```bash
npx hardhat test
```

Tests cover: inscription creation, multiple users, empty CID rejection, empty kind rejection. See `contracts/test/GrimoireRegistry.test.cjs`.

### Deploy to Calibration

```bash
npx hardhat run scripts/deploy.cjs --network calibration
```

The script deploys the contract and prints the deployed address. Copy this address to the frontend `.env`:

```
VITE_GRIMOIRE_CONTRACT_ADDRESS=0x...
```

The deployer wallet (configured via `PRIVATE_KEY` in `.env`) must have tFIL for gas. Use a tFIL faucet if needed.

### Deploy to Mainnet (Future)

```bash
# Add to hardhat.config.cjs:
# mainnet: { url: "https://api.node.glif.io/rpc/v1", accounts: [PRIVATE_KEY], chainId: 314 }

npx hardhat run scripts/deploy.cjs --network mainnet
```

## Verifying Transactions on Block Explorers

After creating an inscription, the transaction hash can be viewed on any Calibration block explorer:

- **Beryx**: `https://beryx.zondax.ch/tx/{txHash}` — Shows full trace, events, and internal calls
- **Filfox**: `https://calibration.filfox.info/en/message/{txHash}` — Fast, clean UI
- **Filscan**: `https://calibration.filscan.io/message/{txHash}` — Alternative explorer

The `InscriptionCreated` event will be visible in the transaction logs, showing the registered CID, kind, and titleHash.

## Title Hashing

Titles are **SHA-256 hashed** before being stored onchain. The plaintext title never leaves the browser and is never stored anywhere.

```javascript
// src/lib/crypto.js
export async function hashText(text) {
  const enc = new TextEncoder();
  const hashBuf = await crypto.subtle.digest('SHA-256', enc.encode(text));
  const hashArr = Array.from(new Uint8Array(hashBuf));
  return '0x' + hashArr.map((b) => b.toString(16).padStart(2, '0')).join('');
}
```

The hash is stored as a `0x`-prefixed hex string onchain. This allows the user to verify that a title matches an inscription (by re-hashing and comparing) without exposing the plaintext title to the blockchain.

The contract does not enforce any particular hashing algorithm — it accepts any string as `titleHash`. The convention is SHA-256, enforced by the frontend.

## Design Decisions

### Why a Single Contract?

A single `GrimoireRegistry` contract is sufficient for the MVP. Inscriptions are naturally partitioned by `owner` address. A monolithic registry avoids the overhead of factory patterns and simplifies deployment, verification, and frontend integration.

### Why Strings for CID and Kind?

CIDs are strings (e.g., `bafybeig7xvk3m9p2nqf4z8...`), not `bytes`. Solidity does not have a native CID type. Using `string` is the standard approach in Filecoin smart contracts. Gas cost for storing a ~60-character CID is acceptable on Calibration and Mainnet.

### Why No Deletion or Update?

Inscriptions are immutable by design. Once created, an inscription cannot be modified or deleted. This mirrors the blockchain's append-only nature and ensures a verifiable, tamper-proof history. If you want to "delete" something, create a new inscription that obsoletes the old one — but the old CID and its encrypted payload remain on Filecoin as long as storage deals are active.

## Future Enhancements (Phase 3+)

### Inheritance / Dead-Man's Switch

The contract will be extended to support a "last active" timestamp and a beneficiary address. If the owner does not send a heartbeat transaction within a configured period (e.g., 1 year), the beneficiary can claim ownership of the inscriptions. This enables passing secrets to heirs or trusted contacts.

### Multisig Heirs

For shared inheritance, a multisig scheme can be implemented where N of M designated heirs must agree to trigger the inheritance claim. This could be implemented as either a native Solidity multisig on the contract or integrated with an existing multisig wallet (e.g., SAFE on FEVM).

### Pagination

`getMyInscriptions` currently returns the full array. For users with many inscriptions, pagination will be added via `getInscriptionsPaginated(address owner, uint256 offset, uint256 limit)`.
