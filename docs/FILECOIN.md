# Filecoin in Grimoire

Filecoin serves as Grimoire's **decentralized storage layer** and **smart contract host**. It provides two distinct but complementary capabilities: persistent, verifiable storage of encrypted payloads (via IPFS and Lighthouse), and an onchain registry for inscription metadata (via FEVM smart contracts).

## What Filecoin Is in This Project

Filecoin is a peer-to-peer network that stores data with cryptographic proofs of replication and spacetime. Miners (storage providers) earn FIL for storing data and proving they continue to hold it over time. For Grimoire, this means encrypted secrets are not stored on a centralized server — they are distributed across a decentralized network with economic incentives to maintain the data.

Grimoire uses Filecoin in two ways:

1. **Storage layer** — Encrypted payloads are uploaded to IPFS and pinned on Filecoin via Lighthouse. The encrypted data lives on the Filecoin network, not on a single server.

2. **Smart contract layer (FEVM)** — The `GrimoireRegistry` contract runs on the Filecoin Ethereum Virtual Machine (FEVM), which is deployed on the Filecoin Calibration testnet. This provides an immutable, public registry of which CIDs belong to which wallet addresses.

## Filecoin Calibration Testnet

Calibration is the Filecoin testnet used for development. It mirrors Mainnet behavior with test FIL (tFIL) that has no real-world value.

| Property | Value |
|----------|-------|
| Chain ID | `314159` |
| RPC URL | `https://api.calibration.node.glif.io/rpc/v1` |
| Currency | tFIL (testnet FIL) |
| Consensus | Expected Consensus (EC) |
| Block time | ~30 seconds |

### Block Explorers

- [beryx.zondax.ch](https://beryx.zondax.ch) — Full-featured FEVM explorer (transaction traces, contract verification, event logs)
- [calibration.filfox.info](https://calibration.filfox.info) — Fast explorer with address and message views
- [calibration.filscan.io](https://calibration.filscan.io) — Alternative explorer with storage provider data

## Filecoin Storage vs. FEVM (Smart Contracts)

These are two distinct subsystems of the Filecoin network. Understanding the difference is essential:

### Filecoin Storage (Data Layer)

- **What it does**: Stores user data (files, blobs, encrypted payloads)
- **How data is addressed**: Content Identifiers (CIDs) — cryptographic hashes of the content itself
- **How data is stored**: Storage providers make deals to store data for a negotiated duration and price, proving they hold it via Proof-of-Replication (PoRep) and Proof-of-Spacetime (PoSt)
- **In Grimoire**: Encrypted payloads are uploaded to IPFS and pinned on Filecoin via Lighthouse. The CID is the permanent address of that encrypted data.

### FEVM (Computation Layer)

- **What it does**: Runs Ethereum-compatible smart contracts on the Filecoin network
- **How it works**: The Filecoin Virtual Machine (FVM) has an EVM runtime (FEVM) that executes Solidity contracts. Contracts can interact with Filecoin-native actors (storage deals, miners, etc.)
- **In Grimoire**: `GrimoireRegistry.sol` stores CID + kind + titleHash for each user inscription. Storage costs are gas fees paid in tFIL.

Key difference: FEVM contracts store **metadata** (pointers, indices). The Filecoin storage layer stores the **actual encrypted data**. A CID on the contract is like a library call number — it tells you where to find the book, but does not contain the book itself.

## Lighthouse's Role

[Lighthouse](https://lighthouse.storage) acts as an **IPFS/Filecoin gateway and storage abstraction**. Instead of directly negotiating storage deals with Filecoin miners, Grimoire uses the Lighthouse SDK:

- **Upload**: `lighthouse.uploadText()` accepts a JSON string, uploads it to IPFS, pins it, and initiates a Filecoin storage deal. Returns a CID.
- **Retrieval**: `gateway.lighthouse.storage/ipfs/{cid}` serves the content over HTTPS. Fallback IPFS gateways (ipfs.io, cloudflare-ipfs.com, dweb.link) are used if Lighthouse is unavailable.
- **Deal verification**: `lighthouse.dealStatus(cid)` returns the status of the Filecoin storage deal for a given CID.

Lighthouse handles the complexity of deal-making, pinning, and replication. Grimoire does not need to run an IPFS node or negotiate deals directly.

## Filecoin Mainnet

| Property | Value |
|----------|-------|
| Chain ID | `314` |
| Currency | FIL (real value) |

After the MVP is validated on Calibration, Grimoire will be deployable to Filecoin Mainnet. The contract is the same Solidity code. The only changes required are:

1. Switch the RPC URL in `hardhat.config.cjs` and `src/config.js` to a Mainnet RPC endpoint
2. Fund the deployer wallet with real FIL
3. Run the deployment script with `--network filecoin-mainnet`

There are no code changes. The architecture is identical.

## Storage Renewal and "Forever" Limitations

Filecoin storage deals are **time-bounded**. A deal typically lasts from 6 months to 1.5 years. When a deal expires, the storage provider stops being economically incentivized to hold the data.

Grimoire's tagline "Some things deserve to last forever" reflects the aspiration, but the practical reality of the MVP is:

- **Lighthouse manages deal renewals** — Recurring deals can be set up to keep data pinned
- **No automatic renewal in MVP** — The MVP uploads once and relies on Lighthouse's default deal duration
- **Future (Phase 3)** — A storage renewal strategy, possibly using Filecoin's programmable storage via Synapse SDK / Filecoin Onchain Cloud, will be implemented to automate renewal payments and ensure continuity

The CID itself is permanent — it is a content-addressed hash. As long as at least one node on the IPFS/Filecoin network holds the data, it remains retrievable. The challenge is ensuring someone keeps holding it.
