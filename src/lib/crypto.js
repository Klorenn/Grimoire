/**
 * Grimoire Crypto — Client-side encryption/decryption using Web Crypto API.
 *
 * SECURITY: All encryption happens in the browser. The secret and passphrase
 * NEVER leave the client. No plaintext is sent to any server, storage, or blockchain.
 *
 * Algorithm: AES-256-GCM with PBKDF2 key derivation (SHA-256, 250,000 iterations).
 * Salt (16 bytes) and IV (12 bytes) are randomly generated per encryption.
 *
 * WARNING: If you lose your passphrase, recovery is cryptographically impossible.
 * There is no backdoor, no recovery phrase, and no admin key.
 */

const ALGORITHM = 'AES-256-GCM';
const KDF = 'PBKDF2-SHA256';
const ITERATIONS = 250000;
const SALT_BYTES = 16;
const IV_BYTES = 12;
const VERSION = 'grimoire-v1';

/**
 * @typedef {Object} EncryptedPayload
 * @property {string} version
 * @property {string} algorithm
 * @property {string} kdf
 * @property {number} iterations
 * @property {string} salt - Base64
 * @property {string} iv - Base64
 * @property {string} ciphertext - Base64
 * @property {string} createdAt - ISO 8601
 */

function bufToBase64(buf) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

function base64ToBuf(b64) {
  const bin = atob(b64);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  return buf.buffer;
}

async function deriveKey(passphrase, salt) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypt a secret string with a passphrase.
 * @param {string} secret
 * @param {string} passphrase
 * @returns {Promise<EncryptedPayload>}
 */
export async function encryptSecret(secret, passphrase) {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
  const key = await deriveKey(passphrase, salt);
  const enc = new TextEncoder();
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(secret)
  );
  return {
    version: VERSION,
    algorithm: ALGORITHM,
    kdf: KDF,
    iterations: ITERATIONS,
    salt: bufToBase64(salt),
    iv: bufToBase64(iv),
    ciphertext: bufToBase64(ciphertext),
    createdAt: new Date().toISOString(),
  };
}

/**
 * Decrypt an EncryptedPayload with the passphrase.
 * @param {EncryptedPayload} payload
 * @param {string} passphrase
 * @returns {Promise<string>} The original secret
 */
export async function decryptSecret(payload, passphrase) {
  const salt = new Uint8Array(base64ToBuf(payload.salt));
  const iv = new Uint8Array(base64ToBuf(payload.iv));
  const ciphertext = new Uint8Array(base64ToBuf(payload.ciphertext));
  const key = await deriveKey(passphrase, salt);
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext
  );
  return new TextDecoder().decode(decrypted);
}

/**
 * Hash text with SHA-256 for onchain title storage.
 * @param {string} text
 * @returns {Promise<string>} Hex-encoded hash
 */
export async function hashText(text) {
  const enc = new TextEncoder();
  const hashBuf = await crypto.subtle.digest('SHA-256', enc.encode(text));
  const hashArr = Array.from(new Uint8Array(hashBuf));
  return '0x' + hashArr.map((b) => b.toString(16).padStart(2, '0')).join('');
}
