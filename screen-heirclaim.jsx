import React from 'react';
import { AppShell, PageHead } from './shell.jsx';
function ScreenHeirClaim() {
  return (
    <AppShell active="heirclaim" crumbs={['HOME', 'TRUST', 'HEIR CLAIM']}>
      <PageHead eyebrow="Trust & people" title="<em>Heir Claim</em>" sub="If you are listed as a keeper for a dormant wallet, you can claim access here." />
      <div className="app-card" style={{ padding: 24 }}>
        <div className="kv-key">dormant wallets</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--ink)', marginTop: 4, fontWeight: 500 }}>No dormant wallets detected</h3>
        <p style={{ marginTop: 6, color: 'var(--ink-soft)', fontSize: '0.9rem', lineHeight: 1.55 }}>
          When a wallet you are listed as keeper for goes dormant, it will appear here. You will need M-of-N signatures from other keepers to claim. KeyEscrow contract: 0x3827...bE53
        </p>
      </div>
    </AppShell>
  );
}
export { ScreenHeirClaim };
