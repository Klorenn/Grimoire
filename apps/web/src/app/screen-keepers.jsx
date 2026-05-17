'use client';
import React, { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { AppShell, PageHead } from './shell.jsx';
import { useT } from './i18n.jsx';
import { CONTRACT_ADDRESS } from '../config.js';

const ABI = [
  { inputs: [{ name: 'heirs', type: 'address[]' }, { name: 'threshold', type: 'uint8' }, { name: 'dormancyPeriod', type: 'uint256' }], name: 'configureHeirs', outputs: [], stateMutability: 'nonpayable', type: 'function' },
];
const DORMANCY_OPTIONS = [
  { label: '3 months', seconds: 90 * 86400 },
  { label: '6 months', seconds: 180 * 86400 },
  { label: '1 year', seconds: 365 * 86400 },
  { label: '2 years', seconds: 730 * 86400 },
];

function ScreenKeepers() {
  const { isConnected } = useAccount();
  const { writeContractAsync, data: txHash } = useWriteContract();
  const { isSuccess: confirmed } = useWaitForTransactionReceipt({ hash: txHash });
  const { t } = useT();
  const s = t.screens.keepers;

  const [heirs, setHeirs] = useState(['', '', '']);
  const [threshold, setThreshold] = useState(1);
  const [dormancy, setDormancy] = useState(90 * 86400);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function updateHeir(idx, val) { const h = [...heirs]; h[idx] = val; setHeirs(h); }
  const validHeirs = heirs.filter(h => h.trim() && h.startsWith('0x'));

  async function handleSave() {
    if (validHeirs.length === 0) return;
    setSaving(true);
    try { await writeContractAsync({ address: CONTRACT_ADDRESS, abi: ABI, functionName: 'configureHeirs', args: [validHeirs, threshold, dormancy] }); setSaved(true); }
    catch (err) { alert(err.shortMessage || err.message); }
    finally { setSaving(false); }
  }
  React.useEffect(() => { if (confirmed && saved) setSaving(false); }, [confirmed]);

  const period = DORMANCY_OPTIONS.find(o => o.seconds === dormancy)?.label || '';

  return (
    <AppShell active="keepers" crumbs={['HOME', 'TRUST', 'KEEPERS']}>
      <PageHead eyebrow={s.eyebrow} title={s.title} sub={s.sub} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <section className="app-card" style={{ padding: 24 }}>
          <div className="kv-key">{s.heirsLabel}</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--ink)', marginTop: 4, fontWeight: 500 }}>{s.whoInherits}</h3>
          <p style={{ marginTop: 6, color: 'var(--ink-soft)', fontSize: '0.85rem' }}>{s.whoHint}</p>
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {heirs.map((h, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--ink-soft)', minWidth: 24 }}>0{i + 1}</span>
                <input type="text" value={h} onChange={e => updateHeir(i, e.target.value)} placeholder="0x..." autoComplete="off"
                  style={{ flex: 1, padding: '9px 12px', borderRadius: 10, border: '1px solid color-mix(in srgb, var(--ink) 12%, transparent)', background: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--ink)', outline: 'none' }} />
              </div>
            ))}
          </div>
        </section>
        <section className="app-card" style={{ padding: 24 }}>
          <div className="kv-key">{s.config}</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--ink)', marginTop: 4, fontWeight: 500 }}>{s.rules}</h3>
          <div style={{ marginTop: 16 }}>
            <label className="kv-key">{s.threshold} · {threshold} / {Math.max(validHeirs.length, 1)}</label>
            <input type="range" min={1} max={Math.max(validHeirs.length, 1)} value={threshold} onChange={e => setThreshold(Number(e.target.value))} style={{ width: '100%', marginTop: 6, accentColor: 'var(--gold-warm)' }} />
          </div>
          <div style={{ marginTop: 20 }}>
            <label className="kv-key">{s.silence}</label>
            <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
              {DORMANCY_OPTIONS.map(o => <button key={o.seconds} type="button" className={`chip ${dormancy === o.seconds ? 'gold' : ''}`} onClick={() => setDormancy(o.seconds)}>{o.label}</button>)}
            </div>
          </div>
          <div style={{ marginTop: 24, padding: 14, borderRadius: 12, background: 'color-mix(in srgb, var(--gold) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--gold) 22%, transparent)' }}>
            <div className="kv-key" style={{ color: 'var(--gold-warm)' }}>{s.howItWorks}</div>
            <p style={{ marginTop: 6, fontSize: '0.85rem', color: 'var(--ink)', lineHeight: 1.5 }}>{s.howBody.replace('{period}', period).replace('{t}', threshold).replace('{n}', Math.max(validHeirs.length, 1))}</p>
          </div>
          <button className="app-btn gold" onClick={handleSave} disabled={!isConnected || validHeirs.length === 0 || saving} style={{ marginTop: 18, justifyContent: 'center', width: '100%' }}>
            {saving ? s.saving : saved ? s.saved : s.save.replace('{n}', validHeirs.length)}
          </button>
        </section>
      </div>
      <section className="app-card" style={{ marginTop: 18, padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="kv-key">{s.proofOfLife}</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--ink)', fontWeight: 500, marginTop: 2 }}>{s.pingTitle}</h3>
            <p style={{ marginTop: 4, color: 'var(--ink-soft)', fontSize: '0.85rem' }}>{s.pingSub}</p>
          </div>
          <button className="app-btn gold" onClick={() => window.location.hash = '#/vault'} style={{ padding: '10px 20px' }}>{s.openVault}</button>
        </div>
      </section>
    </AppShell>
  );
}
export { ScreenKeepers };
