import React, { useState } from 'react';
import { useAccount, useWriteContract, usePublicClient, useSignMessage } from 'wagmi';
import { encryptWithWalletKey, deriveKeyFromSignature, hashText, KEY_DERIVATION_MESSAGE } from '../lib/crypto.js';
import { uploadEncryptedPayload } from '../lib/lighthouse.js';
import { CONTRACT_ADDRESS } from '../config.js';
import { TEMPLATES } from '../lib/templates.js';
import { useT } from '../../i18n.jsx';

const ABI = [
  { inputs: [{ name: 'cid', type: 'string' }, { name: 'kind', type: 'string' }, { name: 'titleHash', type: 'string' }, { name: 'unlockAt', type: 'uint256' }], name: 'createInscription', outputs: [], stateMutability: 'nonpayable', type: 'function' },
];

const KIND_IDS = ['seed-phrase', 'private-key', 'document', 'letter', 'note'];
const SEED_WORDS_12 = Array(12).fill('');
const SEED_WORDS_24 = Array(24).fill('');

export function InscribeForm({ onClose, onSuccess }) {
  const { isConnected, address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const publicClient = usePublicClient();
  const { t } = useT();
  const i = t.inscribe;

  const [title, setTitle] = useState('');
  const [kind, setKind] = useState('note');
  const [chapter, setChapter] = useState('');
  const [unlockDate, setUnlockDate] = useState(''); // YYYY-MM-DD, empty = no lock
  const [seedCount, setSeedCount] = useState(12);
  const [seedWords, setSeedWords] = useState(SEED_WORDS_12);
  const [secret, setSecret] = useState('');
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const [cid, setCid] = useState('');
  const [txHash, setTxHash] = useState('');
  const [pollCount, setPollCount] = useState(0);
  const [uploadFile, setUploadFile] = useState(null);

  function getSecretContent() {
    if (kind === 'seed-phrase') {
      return seedWords.filter(w => w.trim()).join(' ');
    }
    return secret;
  }

  function handleSeedCountChange(count) {
    setSeedCount(count);
    setSeedWords(Array(count).fill(''));
  }

  function updateSeedWord(idx, val) {
    const w = [...seedWords];
    w[idx] = val;
    setSeedWords(w);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const content = getSecretContent();
    if (!title.trim()) { setError('Title is required'); return; }
    if (!content.trim()) { setError('Secret cannot be empty'); return; }
    if (kind === 'seed-phrase') {
      const valid = seedWords.filter(w => w.trim());
      if (valid.length < seedCount) { setError(`Fill all ${seedCount} words`); return; }
    }
    if (!isConnected) { setError('Connect your wallet first'); return; }

    try {
      setStep(0);
      const message = `${KEY_DERIVATION_MESSAGE} · ${address}`;
      const signature = await signMessageAsync({ message });
      const key = await deriveKeyFromSignature(signature);

      setStep(1);
      const titleHash = await hashText(title.trim());

      // Build metadata with chapter
      const metadata = { title: title.trim(), kind, chapter: chapter.trim() || null };
      const jsonContent = JSON.stringify({ content, metadata });
      
      setStep(2);
      const payload = await encryptWithWalletKey(jsonContent, key);

      setStep(3);
      const uploadedCid = await uploadEncryptedPayload(payload, `grimoire-${kind}`);
      setCid(uploadedCid);

      // Calculate unlockAt
      let unlockAt = 0;
      if (unlockDate) {
        unlockAt = Math.floor(new Date(unlockDate + 'T00:00:00Z').getTime() / 1000);
      }

      setStep(4);
      const hash = await writeContractAsync({ address: CONTRACT_ADDRESS, abi: ABI, functionName: 'createInscription', args: [uploadedCid, kind, titleHash, unlockAt] });
      setTxHash(hash);

      if (publicClient) {
        for (let attempt = 0; attempt < 60; attempt++) {
          await new Promise(r => setTimeout(r, 3000));
          setPollCount(attempt + 1);
          try {
            const receipt = await publicClient.getTransactionReceipt({ hash });
            if (receipt) {
              if (receipt.status === 'success') { setStep(5); return; }
              if (receipt.status === 'reverted') { setError('Transaction reverted'); setStep(0); return; }
            }
          } catch { /* not ready */ }
        }
        setError('Not confirmed after 3 min.');
        setStep(0);
      } else {
        setStep(5);
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      setError(err.shortMessage || err.message || 'Inscription failed');
      setStep(0);
    }
  }

  if (step > 0 && step < 5) {
    const steps = ['Signing...', 'Hashing...', 'Encrypting...', 'Uploading to Filecoin...', 'Registering onchain...'];
    const subs = ['Wallet signature', 'SHA-256', 'AES-256-GCM · wallet key', 'Pinata · IPFS', 'FEVM · GrimoireRegistry'];
    return (
      <div className="app-card" style={{ padding: 32, maxWidth: 480, margin: '40px auto', textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 16 }}>✦</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--ink)', fontWeight: 500 }}>{steps[step - 1]}</h2>
        <p style={{ marginTop: 8, color: 'var(--ink-soft)', fontSize: '0.9rem' }}>{subs[step - 1]}</p>
        <div style={{ marginTop: 24, width: '100%', height: 4, background: 'color-mix(in srgb, var(--ink) 8%, transparent)', borderRadius: 2 }}>
          <div style={{ width: `${(step / 4) * 100}%`, height: '100%', background: 'var(--gold-warm)', borderRadius: 2 }} />
        </div>
        {txHash && <p style={{ marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--ink-soft)' }}>tx: {txHash.slice(0, 14)}...</p>}
        {pollCount > 0 && <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)', marginTop: 4 }}>Checking ({pollCount}/60)</p>}
      </div>
    );
  }

  if (step === 5) {
    return (
      <div className="app-card" style={{ padding: 32, maxWidth: 480, margin: '40px auto', textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 16, color: 'var(--gold-warm)' }}>✦</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--ink)', fontWeight: 500 }}>{i.done.title}</h2>
        <p style={{ marginTop: 8, color: 'var(--ink-soft)', fontSize: '0.9rem' }}>{i.done.body}</p>
        {unlockDate && <p style={{ marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--gold-warm)' }}>⏳ Opens {unlockDate}</p>}
        <div style={{ marginTop: 16, display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button className="app-btn ghost" onClick={() => { onClose(); setTimeout(() => { if (onSuccess) onSuccess(); }, 500); }}>{i.done.close}</button>
          <button className="app-btn gold" onClick={() => { setStep(0); setTitle(''); setKind('note'); if (onSuccess) onSuccess(); }}>{i.done.next}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-card" style={{ padding: 28, maxWidth: 560, margin: '20px auto', maxHeight: '80vh', overflow: 'auto' }}>
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

        <div>
          <label className="kv-key">{i.templateLabel}</label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
            {TEMPLATES.map(tmpl => (
              <button key={tmpl.id} type="button" className="chip"
                onClick={() => { setTitle(tmpl.title); setKind(tmpl.kind); setChapter(tmpl.chapter || ''); if (tmpl.content) setSecret(tmpl.content); }}>
                {tmpl.label}
              </button>
            ))}
          </div>
        </div>

        <div><label className="kv-key">{i.chapter}</label><input type="text" value={chapter} onChange={e => setChapter(e.target.value)} placeholder={i.chapterPlaceholder} autoComplete="off" style={inputStyle} /></div>

        {kind === 'seed-phrase' ? (
          <div>
            <label className="kv-key">Seed phrase</label>
            <div style={{ display: 'flex', gap: 8, marginTop: 4, marginBottom: 10 }}>
              <button type="button" className={`chip ${seedCount === 12 ? 'gold' : ''}`} onClick={() => handleSeedCountChange(12)}>{i.words12}</button>
              <button type="button" className={`chip ${seedCount === 24 ? 'gold' : ''}`} onClick={() => handleSeedCountChange(24)}>{i.words24}</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
              {seedWords.map((w, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--ink-soft)', minWidth: 16 }}>{idx + 1}</span>
                  <input type="text" value={w} onChange={e => updateSeedWord(idx, e.target.value)} placeholder="..." autoComplete="off"
                    style={{ ...inputStyle, padding: '6px 8px', fontSize: '0.78rem', marginTop: 0 }} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div><label className="kv-key">{i.secret}</label><textarea value={secret} onChange={e => setSecret(e.target.value)} placeholder={i.placeholder.secret} rows={4} style={{ ...inputStyle, resize: 'vertical', minHeight: 80, fontFamily: 'var(--font-body)' }} /></div>
        )}

        <div>
          <label className="kv-key">{i.timeLock}</label>
          <input type="date" value={unlockDate} onChange={e => setUnlockDate(e.target.value)} min={new Date().toISOString().split('T')[0]}
            style={{ ...inputStyle, width: 'auto', minWidth: 200 }} />
          <div style={{ fontSize: '0.7rem', color: 'var(--ink-soft)', marginTop: 4 }}>
            {unlockDate ? `${i.timeLockActive} ${unlockDate}` : i.timeLockHint}
          </div>
        </div>

        {kind === 'document' && (
          <div>
            <label className="kv-key">{i.fileLabel}</label>
            <input type="file" onChange={e => setUploadFile(e.target.files?.[0] || null)}
              style={{ ...inputStyle, fontFamily: 'var(--font-body)', fontSize: '0.82rem' }} />
            {uploadFile && <div style={{ fontSize: '0.72rem', color: 'var(--ink-soft)', marginTop: 4 }}>{uploadFile.name} · {(uploadFile.size / 1024).toFixed(1)} KB</div>}
          </div>
        )}

        <div style={{ padding: '12px 14px', borderRadius: 12, background: 'color-mix(in srgb, var(--gold) 8%, transparent)', border: '1px solid color-mix(in srgb, var(--gold) 20%, transparent)', fontSize: '0.8rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
          ⚠️ Your wallet signature generates a deterministic key. Same wallet = same key. <strong>Lose your wallet, lose access.</strong>
        </div>
        <button type="submit" className="app-btn gold" disabled={!isConnected} style={{ justifyContent: 'center', marginTop: 8 }}>
          {isConnected ? i.cta2 : i.ctaDisconnected}
        </button>
      </form>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid color-mix(in srgb, var(--ink) 12%, transparent)', background: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--ink)', outline: 'none', marginTop: 4, boxSizing: 'border-box' };
