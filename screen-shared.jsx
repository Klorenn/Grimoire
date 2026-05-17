import React from 'react';
import { AppShell, PageHead } from './shell.jsx';

function ScreenShared() {
  return (
    <AppShell active="shared" crumbs={['HOME', 'TRUST', 'SHARED']}>
      <PageHead eyebrow="Trust & people" title="<em>Shared</em> access" sub="Give time-limited access to specific inscriptions for trusted people." />
      <section className="app-card" style={{ padding: 24 }}>
        <div className="kv-key">active grants</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--ink)', marginTop: 4, fontWeight: 500 }}>You haven't shared anything yet</h3>
        <p style={{ marginTop: 6, color: 'var(--ink-soft)', fontSize: '0.9rem', lineHeight: 1.55 }}>
          Share an inscription with a wallet address for a limited time. They'll be able to decrypt it using their own wallet signature during the access window. Coming in Phase 3.
        </p>
      </section>
      <section className="app-card" style={{ marginTop: 18, padding: 24 }}>
        <div className="kv-key">shared with me</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--ink)', marginTop: 4, fontWeight: 500 }}>Nothing shared with you</h3>
        <p style={{ marginTop: 6, color: 'var(--ink-soft)', fontSize: '0.9rem', lineHeight: 1.55 }}>
          When someone shares an inscription with your wallet, it will appear here. Access is recorded onchain.
        </p>
      </section>
    </AppShell>
  );
}
export { ScreenShared };
