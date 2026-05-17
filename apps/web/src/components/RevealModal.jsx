'use client';
import React, { useState } from 'react';
import { useSignMessage, useAccount } from 'wagmi';
import { fetchEncryptedPayload } from '../lib/lighthouse.js';
import { decryptWithWalletKey, deriveKeyFromSignature, KEY_DERIVATION_MESSAGE } from '../lib/crypto.js';
import { useT } from '../app/i18n.jsx';

export function RevealModal({ cid, kind, onClose }) {
  const { t } = useT();
  const r = t.reveal;
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const [loading, setLoading] = useState(false);
  const [decrypted, setDecrypted] = useState('');
  const [error, setError] = useState('');
  const [revealed, setRevealed] = useState(false);

  async function handleReveal(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Sign to derive key
      const message = `${KEY_DERIVATION_MESSAGE} · ${address}`;
      const signature = await signMessageAsync({ message });
      const sigKey = await deriveKeyFromSignature(signature);

      const payload = await fetchEncryptedPayload(cid);
      const secret = await decryptWithWalletKey(payload, sigKey);
      setDecrypted(secret);
      setRevealed(true);
    } catch (err) {
      setError(r.decryptError);
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setDecrypted(''); setError(''); setRevealed(false);
    onClose();
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(26,46,53,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
      <div className="app-card" style={{ padding: 28, maxWidth: 480, width: '90%', maxHeight: '80vh', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <div className="kv-key" style={{ color: 'var(--gold-warm)' }}>{r.title}</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--ink)', fontWeight: 500, marginTop: 4 }}>{r.subtitle}</h2>
          </div>
          <button className="app-btn ghost" onClick={handleClose} style={{ padding: '6px 12px', fontSize: '0.78rem' }}>{r.close}</button>
        </div>
        {!revealed ? (
          <form onSubmit={handleReveal} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--ink-soft)', wordBreak: 'break-all' }}>CID: {cid}</div>
            {kind && <div className="chip">{kind}</div>}
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
              Your wallet will sign a message to derive the decryption key. The signature never leaves your browser.
            </p>
            {error && <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(164,88,74,0.1)', border: '1px solid rgba(164,88,74,0.2)', color: '#A4584A', fontSize: '0.85rem' }}>{error}</div>}
            <button type="submit" className="app-btn gold" disabled={loading} style={{ justifyContent: 'center' }}>
              {loading ? r.fetching : 'Sign & ✦ Reveal'}
            </button>
          </form>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="kv-key" style={{ color: 'var(--grass)' }}>{r.decrypted}</div>
            <div style={{ padding: 16, borderRadius: 12, background: 'rgba(255,255,255,0.6)', border: '1px solid color-mix(in srgb, var(--ink) 10%, transparent)', fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxHeight: 300, overflow: 'auto' }}>{decrypted}</div>
            <div style={{ display: 'flex', gap: 10 }}><button className="app-btn ghost" onClick={handleClose}>{r.hide}</button></div>
          </div>
        )}
      </div>
    </div>
  );
}
