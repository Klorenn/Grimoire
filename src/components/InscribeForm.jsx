import React, { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { encryptSecret, hashText } from '../lib/crypto.js';
import { uploadEncryptedPayload } from '../lib/lighthouse.js';
import { CONTRACT_ADDRESS } from '../config.js';

const ABI = [
  {
    inputs: [
      { name: 'cid', type: 'string' },
      { name: 'kind', type: 'string' },
      { name: 'titleHash', type: 'string' },
    ],
    name: 'createInscription',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const KINDS = [
  { id: 'seed-phrase', label: 'Seed phrase' },
  { id: 'private-key', label: 'Private key' },
  { id: 'document', label: 'Document' },
  { id: 'letter', label: 'Letter' },
  { id: 'note', label: 'Private note' },
];

export function InscribeForm({ onClose, onSuccess }) {
  const { isConnected } = useAccount();
  const { writeContractAsync, data: txHash } = useWriteContract();
  const { isSuccess: txConfirmed, isError: txFailed, error: txError } = useWaitForTransactionReceipt({ hash: txHash });

  const [title, setTitle] = useState('');
  const [kind, setKind] = useState('note');
  const [secret, setSecret] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [confirmPassphrase, setConfirmPassphrase] = useState('');
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
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
    if (validationError) { setError(validationError); return; }
    if (!isConnected) { setError('Connect your wallet first'); return; }

    try {
      setStep(1);
      const titleHash = await hashText(title.trim());

      setStep(2);
      const payload = await encryptSecret(secret, passphrase);

      setStep(3);
      const uploadedCid = await uploadEncryptedPayload(payload, `grimoire-${kind}`);
      setCid(uploadedCid);

      setStep(4);
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: 'createInscription',
        args: [uploadedCid, kind, titleHash],
      });
      // txHash is set by useWriteContract, confirmation handled below
    } catch (err) {
      setError(err.shortMessage || err.message || 'Inscription failed');
      setStep(0);
    }
  }

  // Handle tx confirmation
  React.useEffect(() => {
    if (txConfirmed && step === 4) {
      setStep(5);
      setSecret('');
      setPassphrase('');
      setConfirmPassphrase('');
      if (onSuccess) onSuccess();
    }
  }, [txConfirmed, step]);

  React.useEffect(() => {
    if (txFailed && step === 4) {
      setError(txError?.shortMessage || 'Transaction failed');
      setStep(0);
    }
  }, [txFailed, step]);

  // Processing screen
  if (step > 0 && step < 5) {
    return (
      <div className="app-card" style={{ padding: 32, maxWidth: 480, margin: '40px auto', textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 16 }}>✦</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--ink)', fontWeight: 500 }}>
          {step === 1 && 'Hashing title...'}
          {step === 2 && 'Encrypting your secret...'}
          {step === 3 && 'Uploading to Filecoin...'}
          {step === 4 && (txHash ? 'Waiting for confirmation...' : 'Confirm in your wallet...')}
        </h2>
        <p style={{ marginTop: 8, color: 'var(--ink-soft)', fontSize: '0.9rem' }}>
          {step === 1 && 'SHA-256 · your browser'}
          {step === 2 && 'AES-256-GCM · your browser'}
          {step === 3 && 'Lighthouse · IPFS · Filecoin'}
          {step === 4 && 'FEVM · GrimoireRegistry · Calibration'}
        </p>
        <div style={{ marginTop: 24, width: '100%', height: 4, background: 'color-mix(in srgb, var(--ink) 8%, transparent)', borderRadius: 2 }}>
          <div style={{ width: `${(Math.min(step + (txHash ? 0.5 : 0), 4) / 4) * 100}%`, height: '100%', background: 'var(--gold-warm)', borderRadius: 2, transition: 'width 0.5s ease' }} />
        </div>
        {txHash && (
          <p style={{ marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--ink-soft)' }}>
            tx: {txHash.slice(0, 14)}...
          </p>
        )}
      </div>
    );
  }

  // Complete screen
  if (step === 5) {
    return (
      <div className="app-card" style={{ padding: 32, maxWidth: 480, margin: '40px auto', textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 16, color: 'var(--gold-warm)' }}>✦</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--ink)', fontWeight: 500 }}>
          Inscription sealed
        </h2>
        <p style={{ marginTop: 8, color: 'var(--ink-soft)', fontSize: '0.9rem' }}>
          Encrypted, stored on Filecoin, and anchored onchain.
        </p>
        <div style={{ marginTop: 16, display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button className="app-btn ghost" onClick={onClose}>Close</button>
          <button className="app-btn gold" onClick={() => { setStep(0); setTitle(''); setKind('note'); }}>+ New inscription</button>
        </div>
      </div>
    );
  }

  // Form
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
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Ledger seed backup" style={inputStyle} />
        </div>
        <div>
          <label className="kv-key">Kind</label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
            {KINDS.map((k) => (
              <button key={k.id} type="button" className={`chip ${kind === k.id ? 'gold' : ''}`} onClick={() => setKind(k.id)}>{k.label}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="kv-key">Secret content</label>
          <textarea value={secret} onChange={(e) => setSecret(e.target.value)} placeholder="Write what only you should know..." rows={4} style={{ ...inputStyle, resize: 'vertical', minHeight: 80, fontFamily: 'var(--font-body)' }} />
        </div>
        <div>
          <label className="kv-key">Passphrase</label>
          <input type="password" value={passphrase} onChange={(e) => setPassphrase(e.target.value)} placeholder="Choose a strong passphrase" style={inputStyle} />
        </div>
        <div>
          <label className="kv-key">Confirm passphrase</label>
          <input type="password" value={confirmPassphrase} onChange={(e) => setConfirmPassphrase(e.target.value)} placeholder="Repeat your passphrase" style={inputStyle} />
        </div>
        <div style={{ padding: '12px 14px', borderRadius: 12, background: 'color-mix(in srgb, var(--gold) 8%, transparent)', border: '1px solid color-mix(in srgb, var(--gold) 20%, transparent)', fontSize: '0.8rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
          ⚠️ <strong>GRIMOIRE cannot recover your passphrase.</strong> If you lose it, your inscription cannot be decrypted.
        </div>
        <button type="submit" className="app-btn gold" disabled={!isConnected} style={{ justifyContent: 'center', marginTop: 8 }}>
          {isConnected ? '✦ Inscribe' : 'Connect wallet to inscribe'}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '10px 14px', borderRadius: 10,
  border: '1px solid color-mix(in srgb, var(--ink) 12%, transparent)',
  background: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-mono)',
  fontSize: '0.85rem', color: 'var(--ink)', outline: 'none', marginTop: 4, boxSizing: 'border-box',
};
