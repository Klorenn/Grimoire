import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { AppShell } from './shell.jsx';
import { CONTRACT_ADDRESS } from './src/config.js';
import { readContract } from '@wagmi/core';
import { config } from './src/config.js';

function ScreenProof() {
  const { address, isConnected } = useAccount();
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
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--ink)', fontWeight: 400, lineHeight: 1.1 }}>
          Proof of <em style={{ color: 'var(--gold-warm)', fontStyle: 'italic' }}>life</em>
        </h1>
        <p style={{ marginTop: 12, color: 'var(--ink-soft)', fontSize: '1rem', lineHeight: 1.6 }}>
          This page shows that a grimoire exists for a wallet — without revealing anything inside.
        </p>

        <div className="app-card" style={{ padding: 28, marginTop: 24 }}>
          {displayAddr ? (
            <>
              <div className="kv-key" style={{ color: 'var(--gold-warm)' }}>your proof page</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--ink-soft)', marginTop: 8, wordBreak: 'break-all' }}>{displayAddr}</div>
              <button className="app-btn gold" style={{ marginTop: 16 }} onClick={() => checkAddress(displayAddr)} disabled={checking}>
                {checking ? 'Checking...' : count !== null ? `${count} inscriptions onchain` : 'Verify onchain'}
              </button>
              {count !== null && (
                <div style={{ marginTop: 16, padding: 16, borderRadius: 12, background: 'color-mix(in srgb, var(--grass) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--grass) 25%, transparent)' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--ink)', fontWeight: 500 }}>{count} inscription{count !== 1 ? 's' : ''}</p>
                  <p style={{ marginTop: 4, fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
                    Stored on Filecoin · Anchored on FEVM · Contract {CONTRACT_ADDRESS.slice(0, 6)}...{CONTRACT_ADDRESS.slice(-4)}
                  </p>
                  <p style={{ marginTop: 8, fontSize: '0.8rem', color: 'var(--grass-deep)', fontStyle: 'italic' }}>
                    No content is revealed. This is a proof of existence only.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div style={{ padding: 20, color: 'var(--ink-soft)' }}>
              Connect your wallet to see your proof page.
            </div>
          )}
        </div>

        <p style={{ marginTop: 24, fontSize: '0.8rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
          Share <code style={{ fontFamily: 'var(--font-mono)', background: 'rgba(26,46,53,0.05)', padding: '2px 6px', borderRadius: 4 }}>grimoire.app/#/proof</code> with your heirs so they know the grimoire exists — without giving them access.
        </p>
      </div>
    </AppShell>
  );
}
export { ScreenProof };
