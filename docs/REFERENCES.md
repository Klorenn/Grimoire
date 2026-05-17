# Grimoire References

Essential links for every technology used in Grimoire. Organized by category.

## Filecoin

### Documentation

- [Filecoin Docs](https://docs.filecoin.io) — Official Filecoin documentation
- [Filecoin Networks — Calibration](https://docs.filecoin.io/networks/calibration) — Calibration testnet details, RPC endpoints, faucets
- [FVM Fundamentals](https://docs.filecoin.io/smart-contracts/fundamentals/the-fvm) — How the Filecoin Virtual Machine works
- [FVM FAQs](https://docs.filecoin.io/smart-contracts/fundamentals/faqs) — Frequently asked questions about FEVM
- [Calibration Block Explorers](https://docs.filecoin.io/networks/calibration/explorers) — List of block explorers for Calibration

### Repositories

- [filecoin-project/filecoin-docs](https://github.com/filecoin-project/filecoin-docs) — Source for docs.filecoin.io
- [filecoin-project/testnet-calibration](https://github.com/filecoin-project/testnet-calibration) — Calibration testnet resources
- [filecoin-project/ref-fvm](https://github.com/filecoin-project/ref-fvm) — Reference implementation of the Filecoin VM
- [filecoin-project/lotus](https://github.com/filecoin-project/lotus) — Reference Filecoin node implementation (Go)
- [filecoin-project/builtin-actors](https://github.com/filecoin-project/builtin-actors) — On-chain actor implementations (Rust)
- [filecoin-project/fevm-hardhat-kit](https://github.com/filecoin-project/fevm-hardhat-kit) — Hardhat starter kit for FEVM development

### FEVM

- [fvm.filecoin.io](https://fvm.filecoin.io) — FVM developer portal

## Lighthouse

### Documentation

- [Lighthouse Docs](https://docs.lighthouse.storage) — Official Lighthouse documentation
- [Lighthouse Quick Start](https://docs.lighthouse.storage/quick-start) — How to get started with Lighthouse SDK

### Repositories

- [lighthouse-web3/lighthouse-package](https://github.com/lighthouse-web3/lighthouse-package) — Lighthouse JavaScript/TypeScript SDK (npm: `@lighthouse-web3/sdk`)
- [lighthouse-web3/encryption-sdk](https://github.com/lighthouse-web3/encryption-sdk) — Lighthouse client-side encryption SDK
- [lighthouse-web3/gitbook](https://github.com/lighthouse-web3/gitbook) — Source for docs.lighthouse.storage

## Synapse / Filecoin Onchain Cloud

### Documentation

- [Filecoin Cloud Docs](https://docs.filecoin.cloud) — Synapse / Filecoin Onchain Cloud documentation
- [Filecoin Cloud — Getting Started](https://docs.filecoin.cloud/getting-started) — Quick start for Synapse SDK

### Repository

- [FilOzone/synapse-sdk](https://github.com/FilOzone/synapse-sdk) — Synapse SDK for programmable storage on Filecoin

## Frontend

### wagmi

- [wagmi.sh](https://wagmi.sh) — React Hooks for Ethereum (used for wallet connection, contract reads/writes)
- [wagmi React Documentation](https://wagmi.sh/react/getting-started)

### viem

- [viem.sh](https://viem.sh) — TypeScript interface for Ethereum (underlying library for contract ABI encoding/decoding)

### RainbowKit

- [RainbowKit Documentation](https://rainbowkit.com/docs/introduction) — Wallet connection UI and hooks
- [RainbowKit — Customization](https://rainbowkit.com/docs/customization)

### Hardhat

- [Hardhat Documentation](https://hardhat.org/docs) — Ethereum development environment for compiling, testing, and deploying contracts

## Web Crypto API

- [MDN — Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [MDN — SubtleCrypto.encrypt()](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt)
- [MDN — SubtleCrypto.deriveKey()](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey)
- [W3C Web Cryptography API Specification](https://www.w3.org/TR/WebCryptoAPI/)

## IPFS

- [IPFS Documentation](https://docs.ipfs.tech)
- [IPFS Public Gateway Checker](https://ipfs.github.io/public-gateway-checker/)
- [IPFS — Content Addressing](https://docs.ipfs.tech/concepts/content-addressing/)

## Frontend Dependencies

- [React 18](https://react.dev) — UI library
- [Vite](https://vitejs.dev) — Build tool and dev server
- [Tailwind CSS v4](https://tailwindcss.com) — Utility-first CSS framework
- [TanStack React Query](https://tanstack.com/query/latest) — Server state management

## Filecoin Calibration Tools

- [beryx.zondax.ch](https://beryx.zondax.ch) — Block explorer (with faucet)
- [calibration.filfox.info](https://calibration.filfox.info) — Block explorer
- [calibration.filscan.io](https://calibration.filscan.io) — Block explorer
- [Glif RPC — Calibration](https://api.calibration.node.glif.io/rpc/v1) — Public RPC endpoint
- [faucet.calibration.fildev.network](https://faucet.calibration.fildev.network) — tFIL faucet

## Contract Dependencies

- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts) — (Planned for future contract versions)
- [Ethers.js](https://docs.ethers.org/v6/) — Ethereum library used by Hardhat
- [Chai](https://www.chaijs.com) — Test assertion library for contract tests
- [Hardhat Ethers Plugin](https://hardhat.org/hardhat-runner/plugins/@nomicfoundation-hardhat-ethers) — Ethers integration for Hardhat
