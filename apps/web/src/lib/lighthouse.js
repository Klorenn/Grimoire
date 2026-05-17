const PINATA_JWT = typeof window !== 'undefined' ? (process.env?.NEXT_PUBLIC_PINATA_JWT || '') : '';
const PINATA_JSON_API = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
const PINATA_FILE_API = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
const PINATA_GATEWAY = 'https://gateway.pinata.cloud/ipfs';
const FALLBACK_GATEWAYS = ['https://ipfs.io/ipfs','https://dweb.link/ipfs'];

export async function uploadEncryptedPayload(payload, name) {
  if (!PINATA_JWT) throw new Error('NEXT_PUBLIC_PINATA_JWT not configured');
  const body = { pinataContent: payload, pinataMetadata: { name } };
  const res = await fetch(PINATA_JSON_API, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${PINATA_JWT}` }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`Pinata upload failed: ${res.status}`);
  const data = await res.json();
  return data.IpfsHash;
}

export async function fetchEncryptedPayload(cid) {
  const urls = [`${PINATA_GATEWAY}/${cid}`, ...FALLBACK_GATEWAYS.map(gw => `${gw}/${cid}`)];
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

export function getGatewayUrl(cid) { return `${PINATA_GATEWAY}/${cid}`; }
