/**
 * Grimoire Lighthouse — Upload encrypted payloads to Filecoin/IPFS via Lighthouse SDK.
 *
 * SECURITY: Only the encrypted JSON payload is uploaded. The original secret,
 * passphrase, and plaintext NEVER leave the browser. Lighthouse stores ciphertext only.
 *
 * Gateway: Uses Lighthouse gateway (primary) with IPFS.io and Cloudflare as fallbacks.
 */

import lighthouse from '@lighthouse-web3/sdk';
import { LIGHTHOUSE_API_KEY } from '../config.js';

/**
 * Upload an encrypted payload (JSON string) to Lighthouse.
 * @param {Object} payload - The EncryptedPayload object
 * @param {string} name - Optional name for the file
 * @returns {Promise<string>} The CID (Content Identifier)
 */
export async function uploadEncryptedPayload(payload, name = 'grimoire-inscription') {
  if (!LIGHTHOUSE_API_KEY) {
    throw new Error('LIGHTHOUSE_API_KEY is not configured. Set VITE_LIGHTHOUSE_API_KEY in .env');
  }
  const json = JSON.stringify(payload);
  // Use proper File upload for better IPFS pinning
  const blob = new Blob([json], { type: 'application/json' });
  const file = new File([blob], `${name}.json`, { type: 'application/json' });
  const response = await lighthouse.upload(file, LIGHTHOUSE_API_KEY);
  if (!response?.data?.Hash) {
    throw new Error('Lighthouse upload failed: no CID returned');
  }
  return response.data.Hash;
}

/**
 * Fetch an encrypted payload from IPFS by CID via Lighthouse gateway or fallbacks.
 * @param {string} cid - The IPFS CID
 * @returns {Promise<Object>} The EncryptedPayload object
 */
const DEDICATED_GATEWAY = 'https://horrible-unicorn-2vtu8.lighthouse.storage';

export async function fetchEncryptedPayload(cid) {
  // Dedicated gateway first (free tier workaround)
  const urls = [
    `${DEDICATED_GATEWAY}/ipfs/${cid}`,
    `https://ipfs.io/ipfs/${cid}`,
    `https://dweb.link/ipfs/${cid}`,
  ];

  let lastData = null;
  for (let attempt = 0; attempt < 5; attempt++) {
    for (const url of urls) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 12000);
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeout);
        if (!res.ok) continue;
        const text = await res.text();
        // Try parsing as JSON
        try {
          const data = JSON.parse(text);
          // Could be direct payload or wrapped
          if (data?.ciphertext) return data;
          if (data?.data?.ciphertext) return data.data;
          if (data?.payload?.ciphertext) return data.payload;
          // Lighthouse uploadText wraps in a "text" field
          if (data?.text) {
            try { const inner = JSON.parse(data.text); if (inner?.ciphertext) return inner; } catch {}
          }
          lastData = data;
        } catch {
          // Not JSON, might be raw text — try parsing differently
          if (text.includes('ciphertext')) {
            try {
              const cleaned = text.trim();
              return JSON.parse(cleaned);
            } catch { /* keep trying */ }
          }
        }
      } catch { continue; }
    }
    if (attempt < 4) await new Promise(r => setTimeout(r, 5000));
  }

  if (lastData) return lastData;
  throw new Error(`Failed to fetch from all gateways. Try again later.`);
}

/**
 * Get the view URL for a CID.
 * @param {string} cid
 * @returns {string}
 */
export function getGatewayUrl(cid) {
  return `https://ipfs.io/ipfs/${cid}`;
}
