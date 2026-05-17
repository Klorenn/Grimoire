import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { encryptSecret, hashText } from '../lib/crypto.js';
import { uploadEncryptedPayload } from '../lib/lighthouse.js';
import { registerCidOnchain } from '../lib/contract.js';

const KINDS = [
  { id: 'seed-phrase', label: 'Seed phrase' },
  { id: 'private-key', label: 'Private key' },
  { id: 'document', label: 'Document' },
  { id: 'letter', label: 'Letter' },
  { id: 'note', label: 'Private note' },
];

const STEPS = ['preparing', 'encrypting', 'uploading', 'registering', 'complete'];

/**
 * Inscription form — creates a new Grimoire inscription.
 * SECURITY: The secret and passphrase are only held in React state during the
 * inscription flow. They are cleared after use. Never logged to console.
 */
export function InscribeForm({ onClose, onSuccess }) {
  const { isConnected } = useAccount();

  const [title, setTitle] = useState('');
  const [kind, setKind] = useState('note');
  const [secret, setSecret] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [confirmPassphrase, setConfirmPassphrase] = useState('');
  const [step, setStep] = useState(0); // 0=form, 1-4=processing, 5=done
  const [error, setError] = useState('');
  const [txHash, setTxHash] = useState('');
  const [cid, setCid] = useState('');

  function validate() {
    if (!title.trim()) return 'Title is required';
    if (!secret.trim()) return 'Secret cannot be empty';
    if (!passphrase) return 'Passphrase is required';
    if (passphrase !== confirmPassphrase) return 'Passphrases do not match';
    if (passphrase.length < 8) return 'Passphrase must be at least 8 characters';
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!isConnected) {
      setError('Connect your wallet first');
      return;
    }

    try {
      // Step 1: Hash title
      setStep(1);
      const titleHash = await hashText(title.trim());

      // Step 2: Encrypt
      setStep(2);
      const payload = await encryptSecret(secret, passphrase);

      // Step 3: Upload to Lighthouse
      setStep(3);
      const uploadedCid = await uploadEncryptedPayload(payload, `grimoire-${kind}`);
      setCid(uploadedCid);

      // Step 4: Register onchain
      setStep(4);
      const hash = await registerCidOnchain(uploadedCid, kind, titleHash);
      setTxHash(hash);

      // Done
      setStep(5);

      // Clear sensitive fields
      setSecret('');
      setPassphrase('');
      setConfirmPassphrase('');

      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'Inscription failed');
      setStep(0);
    }
  }

  if (step > 0 && step < 5) {
    return (
      <div className="app-card" style={{ padding: 32, maxWidth: 480, margin: '40px auto', textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 16 }}>✦</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--ink)', fontWeight: 500 }}>
          {STEPS[step] === 'encrypting' && 'Encrypting your secret...'}
          {STEPS[step] === 'uploading' && 'Uploading to Filecoin...'}
          {STEPS[step] === 'registering' && 'Registering onchain...'}
        </h2>
        <p style={{ marginTop: 8, color: 'var(--ink-soft)', fontSize: '0.9rem' }}>
          {STEPS[step] === 'encrypting' && 'AES-256-GCM · your browser'}
          {STEPS[step] === 'uploading' && 'Lighthouse · IPFS · Filecoin'}
          {STEPS[step] === 'registering' && 'FEVM · GrimoireRegistry · Calibration'}
        </p>
        <div style={{ marginTop: 24, width: '100%', height: 4, background: 'color-mix(in srgb, var(--ink) 8%, transparent)', borderRadius: 2 }}>
          <div style={{ width: `${(step / 4) * 100}%`, height: '100%', background: 'var(--gold-warm)', borderRadius: 2, transition: 'width 0.5s ease' }} />
        </div>
        {step === 4 && txHash && (
          <p style={{ marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--ink-soft)' }}>
            tx: {txHash.slice(0, 10)}...
          </p>
        )}
      </div>
    );
  }

  if (step === 5) {
    return (
      <div className="app-card" style={{ padding: 32, maxWidth: 480, margin: '40px auto', textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 16, color: 'var(--gold-warm)' }}>✦</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--ink)', fontWeight: 500 }}>
          Inscription complete
        </h2>
        <p style={{ marginTop: 8, color: 'var(--ink-soft)', fontSize: '0.9rem' }}>
          Your secret is sealed on Filecoin and anchored onchain.
        </p>
        <div style={{ marginTop: 16, fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--ink-soft)', wordBreak: 'break-all' }}>
          CID: {cid}
        </div>
        {txHash && (
          <div style={{ marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)' }}>
            tx: {txHash.slice(0, 14)}...
          </div>
        )}
        <div style={{ marginTop: 24, display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button className="app-btn ghost" onClick={onClose}>Close</button>
          <button className="app-btn gold" onClick={() => { setStep(0); setTitle(''); setKind('note'); }}>+ New inscription</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-card" style={{ padding: 28, maxWidth: 520, margin: '20px auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div className="kv-key" style={{ color: 'var(--gold-warm)' }}>✦ new inscription</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--ink)', fontWeight: 500, marginTop: 4 }}>
            Inscribe a secret
          </h2>
        </div>
        <button className="app-btn ghost" onClick={onClose} style={{ padding: '6px 12px', fontSize: '0.78rem' }}>Cancel</button>
      </div>

      {error && (
        <div style={{ padding: '10px 14px', marginBottom: 16, borderRadius: 10, background: 'rgba(164,88,74,0.1)', border: '1px solid rgba(164,88,74,0.2)', color: '#A4584A', fontSize: '0.85rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label className="kv-key">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Ledger seed backup"
            style={inputStyle}
          />
        </div>

        <div>
          <label className="kv-key">Kind</label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
            {KINDS.map((k) => (
              <button
                key={k.id}
                type="button"
                className={`chip ${kind === k.id ? 'gold' : ''}`}
                onClick={() => setKind(k.id)}
              >
                {k.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="kv-key">Secret content</label>
          <textarea
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Write what only you should know..."
            rows={4}
            style={{ ...inputStyle, resize: 'vertical', minHeight: 80, fontFamily: 'var(--font-body)' }}
          />
        </div>

        <div>
          <label className="kv-key">Passphrase</label>
          <input
            type="password"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            placeholder="Choose a strong passphrase"
            style={inputStyle}
          />
        </div>

        <div>
          <label className="kv-key">Confirm passphrase</label>
          <input
            type="password"
            value={confirmPassphrase}
            onChange={(e) => setConfirmPassphrase(e.target.value)}
            placeholder="Repeat your passphrase"
            style={inputStyle}
          />
        </div>

        <div style={{
          padding: '12px 14px',
          borderRadius: 12,
          background: 'color-mix(in srgb, var(--gold) 8%, transparent)',
          border: '1px solid color-mix(in srgb, var(--gold) 20%, transparent)',
          fontSize: '0.8rem',
          color: 'var(--ink-soft)',
          lineHeight: 1.5,
        }}>
          ⚠️ <strong>GRIMOIRE cannot recover your passphrase.</strong> If you lose it, your inscription cannot be decrypted. There is no backdoor, no admin key, and no recovery phrase.
        </div>

        <button
          type="submit"
          className="app-btn gold"
          disabled={!isConnected}
          style={{ justifyContent: 'center', marginTop: 8 }}
        >
          {isConnected ? '✦ Inscribe' : 'Connect wallet to inscribe'}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: 10,
  border: '1px solid color-mix(in srgb, var(--ink) 12%, transparent)',
  background: 'rgba(255,255,255,0.7)',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.85rem',
  color: 'var(--ink)',
  outline: 'none',
  marginTop: 4,
  boxSizing: 'border-box',
};
