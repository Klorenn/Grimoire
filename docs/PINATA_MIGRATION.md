# Pinata Migration Guide

## Background

If you have existing files pinned to Pinata, you can migrate them to Grimoire inscriptions. This converts pay-monthly pins into encrypted, Filecoin-backed, onchain-registered inscriptions.

## How it works

1. You paste your Pinata JWT (stays in your browser, never sent to any server)
2. Grimoire lists your existing pins with file size, date, and name
3. You select which ones to migrate and set metadata (title, type, chapter)
4. For each pin:
   - Fetch content from Pinata gateway (works while subscription active)
   - Encrypt client-side with your wallet key
   - Upload to Pinata as a new encrypted inscription
   - Register CID onchain via GrimoireRegistry
5. Original Pinata pins remain untouched — you can delete them after migration

## Status

**Coming in Phase 2.** The migration wizard will be available at `#/settings/migrate`.

For now, you can manually:
1. Download your files from Pinata
2. Re-upload them through Grimoire as new inscriptions
3. Delete the original Pinata pins

## Pinata → Grimoire comparison

| | Pinata | Grimoire |
|---|---|---|
| Storage | IPFS only | IPFS + metadata onchain |
| Encryption | DIY | AES-256-GCM with wallet key |
| Access control | None | Time-lock, heirs, sharing |
| Permanence | Pay-monthly | Onchain anchor |
| Recovery | Gateway only | Multiple gateways + contract |
