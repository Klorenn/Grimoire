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
const VERSION = 'grimoire-v2';

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

/**
 * Derive an AES-256 key from a wallet EIP-191 signature.
 * Same wallet + same message = same key. No passphrase needed.
 * @param {`0x${string}`} signature - The wallet signature hex
 * @returns {Promise<CryptoKey>}
 */
export async function deriveKeyFromSignature(signature) {
  const enc = new TextEncoder();
  const sigHash = await crypto.subtle.digest('SHA-256', enc.encode(signature));
  return crypto.subtle.importKey('raw', sigHash, 'AES-GCM', false, ['encrypt', 'decrypt']);
}

/**
 * Encrypt using wallet-derived key (no passphrase, no PBKDF2).
 */
export async function encryptWithWalletKey(secret, sigKey) {
  const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
  const enc = new TextEncoder();
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, sigKey, enc.encode(secret));
  return {
    version: VERSION,
    algorithm: ALGORITHM,
    kdf: 'WALLET-SIGNATURE',
    iterations: 0,
    salt: '',
    iv: bufToBase64(iv),
    ciphertext: bufToBase64(ciphertext),
    createdAt: new Date().toISOString(),
  };
}

/**
 * Decrypt using wallet-derived key.
 */
export async function decryptWithWalletKey(payload, sigKey) {
  const iv = new Uint8Array(base64ToBuf(payload.iv));
  const ciphertext = new Uint8Array(base64ToBuf(payload.ciphertext));
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, sigKey, ciphertext);
  return new TextDecoder().decode(decrypted);
}

/** Signing message for key derivation — deterministic per wallet */
export const KEY_DERIVATION_MESSAGE = 'Grimoire Vault Key Derivation v1';

/**
 * ECIES: Encrypt data with recipient's hex public key (uncompressed 0x04...).
 * Uses ECDH (P-256) + AES-256-GCM.
 * Returns { ephemeralPubKey (hex), iv (base64), ciphertext (base64) }
 */
export async function eciesEncrypt(plaintext, recipientPubKeyHex) {
  // Import recipient's public key
  const pubKeyRaw = hexToBytes(recipientPubKeyHex.startsWith('0x') ? recipientPubKeyHex.slice(2) : recipientPubKeyHex);
  const recipientPubKey = await crypto.subtle.importKey('raw', pubKeyRaw,
    { name: 'ECDH', namedCurve: 'P-256' }, false, []);

  // Generate ephemeral key pair
  const ephemeral = await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveKey']);

  // Derive shared secret
  const sharedSecret = await crypto.subtle.deriveKey(
    { name: 'ECDH', public: recipientPubKey },
    ephemeral.privateKey,
    { name: 'AES-GCM', length: 256 }, false, ['encrypt']
  );

  // Encrypt plaintext
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const enc = new TextEncoder();
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, sharedSecret, enc.encode(plaintext));

  // Export ephemeral public key
  const ephemeralPubKeyRaw = await crypto.subtle.exportKey('raw', ephemeral.publicKey);
  return {
    ephemeralPubKey: '0x' + bytesToHex(new Uint8Array(ephemeralPubKeyRaw)),
    iv: bufToBase64(iv),
    ciphertext: bufToBase64(ciphertext),
  };
}

/**
 * ECIES: Decrypt data using owner's private key.
 */
export async function eciesDecrypt(encryptedData, privateKeyHex) {
  // Import owner's private key
  const privKeyRaw = hexToBytes(privateKeyHex.startsWith('0x') ? privateKeyHex.slice(2) : privateKeyHex);
  const ownerPrivKey = await crypto.subtle.importKey('pkcs8', privKeyRaw,
    { name: 'ECDH', namedCurve: 'P-256' }, false, ['deriveKey']);

  // Import ephemeral public key
  const ephPubRaw = hexToBytes(encryptedData.ephemeralPubKey.startsWith('0x') ? encryptedData.ephemeralPubKey.slice(2) : encryptedData.ephemeralPubKey);
  const ephPubKey = await crypto.subtle.importKey('raw', ephPubRaw,
    { name: 'ECDH', namedCurve: 'P-256' }, false, []);

  // Derive same shared secret
  const sharedSecret = await crypto.subtle.deriveKey(
    { name: 'ECDH', public: ephPubKey },
    ownerPrivKey,
    { name: 'AES-GCM', length: 256 }, false, ['decrypt']
  );

  // Decrypt
  const iv = new Uint8Array(base64ToBuf(encryptedData.iv));
  const ciphertext = new Uint8Array(base64ToBuf(encryptedData.ciphertext));
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, sharedSecret, ciphertext);
  return new TextDecoder().decode(decrypted);
}

function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  return bytes.buffer;
}

function bytesToHex(bytes) {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Encrypt a file (ArrayBuffer) with wallet-derived key.
 * Returns { ciphertext (base64), iv (base64), fileName, mimeType }
 */
export async function encryptFile(file, sigKey) {
  const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
  const buffer = await file.arrayBuffer();
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, sigKey, buffer);
  return {
    ciphertext: bufToBase64(ciphertext),
    iv: bufToBase64(iv),
    fileName: file.name,
    mimeType: file.type || 'application/octet-stream',
    size: file.size,
  };
}

/**
 * Decrypt file data and return as Blob.
 */
export async function decryptFile(encryptedFile, sigKey) {
  const iv = new Uint8Array(base64ToBuf(encryptedFile.iv));
  const ciphertext = new Uint8Array(base64ToBuf(encryptedFile.ciphertext));
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, sigKey, ciphertext);
  return new Blob([decrypted], { type: encryptedFile.mimeType });
}
