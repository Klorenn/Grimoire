/**
 * Grimoire Lighthouse — Upload encrypted payloads to Filecoin/IPFS via Lighthouse SDK.
 *
 * SECURITY: Only the encrypted JSON payload is uploaded. The original secret,
 * passphrase, and plaintext NEVER leave the browser. Lighthouse stores ciphertext only.
 *
 * Gateway: Uses Lighthouse gateway (primary) with IPFS.io and Cloudflare as fallbacks.
 */

import lighthouse from '@lighthouse-web3/sdk';
import { LIGHTHOUSE_API_KEY, GATEWAY } from '../config.js';

const FALLBACK_GATEWAYS = [
  'https://ipfs.io/ipfs',
  'https://cloudflare-ipfs.com/ipfs',
  'https://dweb.link/ipfs',
];

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
  const urls = FALLBACK_GATEWAYS.map((gw) => `${gw}/${cid}`);

  // Try all gateways with retries
  for (let attempt = 0; attempt < 3; attempt++) {
    for (const url of urls) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);
        const res = await fetch(url, { signal: controller.signal, mode: 'cors' });
        clearTimeout(timeout);
        if (!res.ok) continue;
        const data = await res.json();
        if (data?.ciphertext) return data;
      } catch {
        continue;
      }
    }
    // Wait before retry (IPFS propagation)
    if (attempt < 2) await new Promise(r => setTimeout(r, 3000));
  }

  throw new Error(`Failed to fetch CID ${cid.slice(0, 12)}... from all gateways. The file may still be propagating through IPFS. Try again in 30 seconds.`);
}

/**
 * Get the view URL for a CID.
 * @param {string} cid
 * @returns {string}
 */
export function getGatewayUrl(cid) {
  return `${GATEWAY}/${cid}`;
}
