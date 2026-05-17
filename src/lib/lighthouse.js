/**
 * Grimoire Storage — Upload encrypted payloads to IPFS via Pinata.
 *
 * SECURITY: Only the encrypted JSON payload is uploaded. The original secret,
 * passphrase, and plaintext NEVER leave the browser. Pinata stores ciphertext only.
 */

const PINATA_JWT = import.meta.env.VITE_PINATA_JWT || '';
const PINATA_API = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
const PINATA_GATEWAY = 'https://gateway.pinata.cloud/ipfs';

const FALLBACK_GATEWAYS = [
  'https://ipfs.io/ipfs',
  'https://dweb.link/ipfs',
];

/**
 * Upload an encrypted payload (JSON object) to Pinata/IPFS.
 * @param {Object} payload - The EncryptedPayload object
 * @param {string} name - Optional name for the file
 * @returns {Promise<string>} The CID (Content Identifier)
 */
export async function uploadEncryptedPayload(payload, name = 'grimoire-inscription') {
  if (!PINATA_JWT) {
    throw new Error('VITE_PINATA_JWT is not configured. Set it in .env');
  }
  const body = {
    pinataContent: payload,
    pinataMetadata: { name },
  };
  const res = await fetch(PINATA_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${PINATA_JWT}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Pinata upload failed: ${res.status} ${err}`);
  }
  const data = await res.json();
  if (!data?.IpfsHash) {
    throw new Error('Pinata upload failed: no CID returned');
  }
  return data.IpfsHash;
}

/**
 * Fetch an encrypted payload from IPFS by CID.
 * @param {string} cid - The IPFS CID
 * @returns {Promise<Object>} The EncryptedPayload object
 */
export async function fetchEncryptedPayload(cid) {
  const urls = [
    `${PINATA_GATEWAY}/${cid}`,
    ...FALLBACK_GATEWAYS.map(gw => `${gw}/${cid}`),
  ];

  for (let attempt = 0; attempt < 3; attempt++) {
    for (const url of urls) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeout);
        if (!res.ok) continue;
        const data = await res.json();
        if (data?.ciphertext) return data;
      } catch { continue; }
    }
    if (attempt < 2) await new Promise(r => setTimeout(r, 3000));
  }

  throw new Error('Failed to fetch from all gateways.');
}

/**
 * Get the view URL for a CID.
 */
export function getGatewayUrl(cid) {
  return `${PINATA_GATEWAY}/${cid}`;
}
