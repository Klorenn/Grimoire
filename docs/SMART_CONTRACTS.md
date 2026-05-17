# GrimoireRegistry — Smart Contract v2

- **Network:** Filecoin Calibration (testnet, chain ID 314159)
- **Address:** `0xCEa33B5Edb8B5eb982aDB05e4ED30B764081B490`
- **Solidity:** ^0.8.20
- **Framework:** Hardhat 2.22
- **Tests:** 5/5 passing

## Data Structures

### Inscription
```solidity
struct Inscription {
    address owner;       // Creator wallet
    string cid;          // IPFS content identifier (encrypted payload)
    string kind;         // seed-phrase | private-key | document | letter | note
    string titleHash;    // SHA-256 of title (title never stored plaintext)
    uint256 createdAt;   // Block timestamp of creation
    uint256 unlockAt;    // 0 = no time-lock, otherwise Unix timestamp
    bool revoked;        // Soft delete flag
}
```

### HeirConfig
```solidity
struct HeirConfig {
    address[] heirs;        // Designated heir wallets
    uint8 threshold;        // M-of-N signatures required
    uint256 dormancyPeriod; // Seconds of inactivity before claim possible
    uint256 lastPing;       // Owner's last activity timestamp
}
```

## Functions

### createInscription
```solidity
function createInscription(
    string calldata cid,
    string calldata kind,
    string calldata titleHash,
    uint256 unlockAt
) external
```
Creates a new inscription. Validates: CID not empty, kind not empty. Emits `InscriptionCreated`.

### getMyInscriptions
```solidity
function getMyInscriptions() external view returns (Inscription[] memory)
```
Returns all inscriptions for the caller.

### getInscriptions
```solidity
function getInscriptions(address owner) external view returns (Inscription[] memory)
```
Returns all inscriptions for any address. Used by Proof page.

### revokeInscription
```solidity
function revokeInscription(uint256 index) external
```
Soft-deletes an inscription. Sets `revoked = true`. Content remains on IPFS.

### ping
```solidity
function ping() external
```
Proof of life. Resets `lastPing` in HeirConfig. Emits `Pinged`. Called automatically on every inscription creation/edit.

### configureHeirs
```solidity
function configureHeirs(
    address[] calldata heirs,
    uint8 threshold,
    uint256 dormancyPeriod
) external
```
Sets heir configuration. Validates: at least 1 heir, threshold between 1 and count.

### isDormant
```solidity
function isDormant(address owner) external view returns (bool)
```
Returns true if owner's `lastPing + dormancyPeriod < now`.

## Events

- `InscriptionCreated(address indexed owner, string cid, string kind, string titleHash, uint256 createdAt, uint256 unlockAt)`
- `InscriptionRevoked(uint256 indexed id)`
- `Pinged(address indexed owner, uint256 timestamp)`
- `HeirsConfigured(address indexed owner, uint8 threshold, uint256 dormancyPeriod)`

## Security

- No secrets stored onchain (only CID, kind, titleHash)
- Title is SHA-256 hashed before storage
- All `external` functions have proper access control
- No re-entrancy concerns (no ETH transfers)
- Events enable off-chain indexing without scanning state

## Deployment

```bash
cd contracts
npx hardhat compile
npx hardhat test                    # 5/5 tests
npx hardhat run scripts/deploy.cjs --network calibration
```

### Test Coverage
- ✅ Creates inscription correctly
- ✅ Returns inscriptions for caller
- ✅ Multiple users can create inscriptions
- ✅ Fails with empty CID
- ✅ Fails with empty kind

## Explorers

- https://calibration.filfox.info/address/0xCEa33B5Edb8B5eb982aDB05e4ED30B764081B490
- https://beryx.zondax.ch
- https://calibration.filscan.io

## Contract ABI (Frontend)

The frontend uses a minimal ABI for `createInscription` and `getMyInscriptions`:

```javascript
const ABI = [
  {
    inputs: [
      { name: 'cid', type: 'string' },
      { name: 'kind', type: 'string' },
      { name: 'titleHash', type: 'string' },
      { name: 'unlockAt', type: 'uint256' }
    ],
    name: 'createInscription',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMyInscriptions',
    outputs: [{
      components: [
        { name: 'owner', type: 'address' },
        { name: 'cid', type: 'string' },
        { name: 'kind', type: 'string' },
        { name: 'titleHash', type: 'string' },
        { name: 'createdAt', type: 'uint256' },
        { name: 'unlockAt', type: 'uint256' },
        { name: 'revoked', type: 'bool' }
      ],
      name: '', type: 'tuple[]'
    }],
    stateMutability: 'view',
    type: 'function',
  },
];
```
