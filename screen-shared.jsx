import React from 'react';
import { AppShell, PageHead } from './shell.jsx';

function ScreenShared() {
  return (
    <AppShell active="shared" crumbs={['HOME', 'TRUST', 'SHARED']}>
      <PageHead eyebrow="Trust & people" title="<em>Shared</em> access" sub="Give temporary access to trusted people." />
      <div className="app-card" style={{ padding: 60, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16, color: 'var(--gold-warm)' }}>✦</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--ink)', fontWeight: 500 }}>Coming in Phase 3</h2>
        <p style={{ margin: '12px auto 0', color: 'var(--ink-soft)', fontSize: '0.95rem', maxWidth: 480 }}>Share inscriptions with time-limited access. Every access is recorded onchain.</p>
        <button className="app-btn gold" style={{ marginTop: 24 }} onClick={() => window.location.hash = '#/vault'}>Open your vault →</button>
      </div>
    </AppShell>
  );
}
export { ScreenShared };
