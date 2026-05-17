import React, { useState } from 'react';
import { useAccount, useWriteContract, usePublicClient } from 'wagmi';
import { encryptSecret, hashText } from '../lib/crypto.js';
import { uploadEncryptedPayload } from '../lib/lighthouse.js';
import { CONTRACT_ADDRESS } from '../config.js';
import { useT } from '../../i18n.jsx';

const ABI = [
  { inputs: [{ name: 'cid', type: 'string' }, { name: 'kind', type: 'string' }, { name: 'titleHash', type: 'string' }], name: 'createInscription', outputs: [], stateMutability: 'nonpayable', type: 'function' },
];

const KIND_IDS = ['seed-phrase', 'private-key', 'document', 'letter', 'note'];

export function InscribeForm({ onClose, onSuccess }) {
  const { isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();
  const { t } = useT();
  const i = t.inscribe;

  const [title, setTitle] = useState('');
  const [kind, setKind] = useState('note');
  const [secret, setSecret] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [confirmPassphrase, setConfirmPassphrase] = useState('');
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const [cid, setCid] = useState('');
  const [txHash, setTxHash] = useState('');

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
      const hash = await writeContractAsync({ address: CONTRACT_ADDRESS, abi: ABI, functionName: 'createInscription', args: [uploadedCid, kind, titleHash] });
      setTxHash(hash);

      // Manual polling for receipt
      if (publicClient) {
        for (let i = 0; i < 60; i++) {
          await new Promise(r => setTimeout(r, 3000));
          try {
            const receipt = await publicClient.getTransactionReceipt({ hash });
            if (receipt && receipt.status === 'success') {
              setStep(5); setSecret(''); setPassphrase(''); setConfirmPassphrase('');
              if (onSuccess) onSuccess();
              return;
            }
          } catch { /* receipt not ready yet */ }
        }
        setError('Transaction not confirmed after 3 minutes. Check the explorer.');
      } else {
        // Fallback: just mark as done
        setStep(5); setSecret(''); setPassphrase(''); setConfirmPassphrase('');
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      setError(err.shortMessage || err.message || 'Inscription failed');
      setStep(0);
    }
  }

  if (step > 0 && step < 5) {
    const stepIdx = step - 1;
    return (
      <div className="app-card" style={{ padding: 32, maxWidth: 480, margin: '40px auto', textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 16 }}>✦</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--ink)', fontWeight: 500 }}>{i.steps[stepIdx]}</h2>
        <p style={{ marginTop: 8, color: 'var(--ink-soft)', fontSize: '0.9rem' }}>{i.stepsSub[stepIdx]}</p>
        <div style={{ marginTop: 24, width: '100%', height: 4, background: 'color-mix(in srgb, var(--ink) 8%, transparent)', borderRadius: 2 }}>
          <div style={{ width: `${(step / 4) * 100}%`, height: '100%', background: 'var(--gold-warm)', borderRadius: 2, transition: 'width 0.5s ease' }} />
        </div>
        {txHash && <p style={{ marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--ink-soft)' }}>tx: {txHash.slice(0, 14)}...</p>}
      </div>
    );
  }

  if (step === 5) {
    return (
      <div className="app-card" style={{ padding: 32, maxWidth: 480, margin: '40px auto', textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 16, color: 'var(--gold-warm)' }}>✦</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--ink)', fontWeight: 500 }}>{i.done.title}</h2>
        <p style={{ marginTop: 8, color: 'var(--ink-soft)', fontSize: '0.9rem' }}>{i.done.body}</p>
        <div style={{ marginTop: 16, display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button className="app-btn ghost" onClick={onClose}>{i.done.close}</button>
          <button className="app-btn gold" onClick={() => { setStep(0); setTitle(''); setKind('note'); }}>{i.done.next}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-card" style={{ padding: 28, maxWidth: 520, margin: '20px auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div className="kv-key" style={{ color: 'var(--gold-warm)' }}>{i.newTitle}</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--ink)', fontWeight: 500, marginTop: 4 }}>{i.newSub}</h2>
        </div>
        <button className="app-btn ghost" onClick={onClose} style={{ padding: '6px 12px', fontSize: '0.78rem' }}>{i.cancel}</button>
      </div>

      {error && <div style={{ padding: '10px 14px', marginBottom: 16, borderRadius: 10, background: 'rgba(164,88,74,0.1)', border: '1px solid rgba(164,88,74,0.2)', color: '#A4584A', fontSize: '0.85rem' }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div><label className="kv-key">{i.title}</label><input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder={i.placeholder.title} autoComplete="off" style={inputStyle} /></div>
        <div><label className="kv-key">{i.kind}</label><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
          {KIND_IDS.map((k, idx) => <button key={k} type="button" className={`chip ${kind === k ? 'gold' : ''}`} onClick={() => setKind(k)}>{i.kinds[idx]}</button>)}
        </div></div>
        <div><label className="kv-key">{i.secret}</label><textarea value={secret} onChange={e => setSecret(e.target.value)} placeholder={i.placeholder.secret} rows={4} style={{ ...inputStyle, resize: 'vertical', minHeight: 80, fontFamily: 'var(--font-body)' }} /></div>
        <div><label className="kv-key">{i.passphrase}</label><input type="password" value={passphrase} onChange={e => setPassphrase(e.target.value)} placeholder={i.placeholder.passphrase} autoComplete="new-password" style={inputStyle} /></div>
        <div><label className="kv-key">{i.confirm}</label><input type="password" value={confirmPassphrase} onChange={e => setConfirmPassphrase(e.target.value)} placeholder={i.placeholder.confirm} autoComplete="new-password" style={inputStyle} /></div>
        <div style={{ padding: '12px 14px', borderRadius: 12, background: 'color-mix(in srgb, var(--gold) 8%, transparent)', border: '1px solid color-mix(in srgb, var(--gold) 20%, transparent)', fontSize: '0.8rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
          ⚠️ <strong>{i.warning.split('.')[0]}.</strong> {i.warning.split('.').slice(1).join('.')}
        </div>
        <button type="submit" className="app-btn gold" disabled={!isConnected} style={{ justifyContent: 'center', marginTop: 8 }}>
          {isConnected ? i.cta : i.ctaDisconnected}
        </button>
      </form>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid color-mix(in srgb, var(--ink) 12%, transparent)', background: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--ink)', outline: 'none', marginTop: 4, boxSizing: 'border-box' };
