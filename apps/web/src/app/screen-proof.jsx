'use client';
import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { AppShell } from './shell.jsx';
import { CONTRACT_ADDRESS } from '../config.js';
import { readContract } from '@wagmi/core';
import { config } from '../config.js';

function ScreenProof() {
  const { address, isConnected } = useAccount();
  const { t } = useT();
  const s = t.screens.proof;
  const [count, setCount] = useState(null);
  const [checking, setChecking] = useState(false);

  async function checkAddress(addr) {
    setChecking(true);
    try {
      const data = await readContract(config, {
        address: CONTRACT_ADDRESS,
        abi: [{ inputs: [{ name: 'owner', type: 'address' }], name: 'getInscriptions', outputs: [{ components: [{ name: 'owner', type: 'address' }, { name: 'cid', type: 'string' }, { name: 'kind', type: 'string' }, { name: 'titleHash', type: 'string' }, { name: 'createdAt', type: 'uint256' }, { name: 'unlockAt', type: 'uint256' }, { name: 'revoked', type: 'bool' }], name: '', type: 'tuple[]' }], stateMutability: 'view', type: 'function' }],
        functionName: 'getInscriptions',
        args: [addr],
      });
      setCount(data?.length || 0);
    } catch { setCount(0); }
    setChecking(false);
  }

  const displayAddr = isConnected ? address : null;

  return (
    <AppShell active="proof" crumbs={['HOME', 'PROOF']} mainPadding="40px">
      <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 20, color: 'var(--gold-warm)' }}>✦</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--ink)', fontWeight: 400, lineHeight: 1.1 }} dangerouslySetInnerHTML={{ __html: s.title }} />
        <p style={{ marginTop: 12, color: 'var(--ink-soft)', fontSize: '1rem', lineHeight: 1.6 }}>{s.sub}</p>

        <div className="app-card" style={{ padding: 28, marginTop: 24 }}>
          {displayAddr ? (
            <>
              <div className="kv-key" style={{ color: 'var(--gold-warm)' }}>{s.yourProof}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--ink-soft)', marginTop: 8, wordBreak: 'break-all' }}>{displayAddr}</div>
              <button className="app-btn gold" style={{ marginTop: 16 }} onClick={() => checkAddress(displayAddr)} disabled={checking}>
                {checking ? s.checking : count !== null ? `${count} ${count === 1 ? s.inscription : s.inscriptions} onchain` : s.verify}
              </button>
              {count !== null && (
                <div style={{ marginTop: 16, padding: 16, borderRadius: 12, background: 'color-mix(in srgb, var(--grass) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--grass) 25%, transparent)' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--ink)', fontWeight: 500 }}>{count} {count === 1 ? s.inscription : s.inscriptions}</p>
                  <p style={{ marginTop: 4, fontSize: '0.85rem', color: 'var(--ink-soft)' }}>{s.stored} · Contract {CONTRACT_ADDRESS.slice(0, 6)}...{CONTRACT_ADDRESS.slice(-4)}</p>
                  <p style={{ marginTop: 8, fontSize: '0.8rem', color: 'var(--grass-deep)', fontStyle: 'italic' }}>{s.noReveal}</p>
                </div>
              )}
            </>
          ) : (
            <div style={{ padding: 20, color: 'var(--ink-soft)' }}>
              {s.connect}
            </div>
          )}
        </div>

        <p style={{ marginTop: 24, fontSize: '0.8rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>{s.shareHint}</p>
      </div>
    </AppShell>
  );
}
export { ScreenProof };
