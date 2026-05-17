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
  const response = await lighthouse.uploadText(json, LIGHTHOUSE_API_KEY, name);
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
export async function fetchEncryptedPayload(cid) {
  // Try gateways in order: w3s first (fastest for Lighthouse CIDs), then public
  const allUrls = [
    `https://${cid}.ipfs.w3s.link`,
    `https://${cid}.ipfs.cf-ipfs.com`,
    `https://ipfs.io/ipfs/${cid}`,
    `https://cloudflare-ipfs.com/ipfs/${cid}`,
    `https://dweb.link/ipfs/${cid}`,
  ];

  for (let attempt = 0; attempt < 3; attempt++) {
    for (const url of allUrls) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeout);
        if (!res.ok) continue;
        const data = await res.json();
        if (data?.ciphertext) return data;
      } catch { continue; }
    }
    if (attempt < 2) await new Promise(r => setTimeout(r, 2000));
  }

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
