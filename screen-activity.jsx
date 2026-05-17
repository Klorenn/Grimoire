import React from 'react';
import { AppShell, PageHead } from './shell.jsx';

function ScreenActivity() {
  return (
    <AppShell active="activity" crumbs={['HOME', 'TRUST', 'ACTIVITY']}>
      <PageHead eyebrow="Trust & people" title="<em>Activity</em> log" sub="A timeline of everything that happens in your grimoire." />
      <div className="app-card" style={{ padding: 60, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16, color: 'var(--gold-warm)' }}>✦</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--ink)', fontWeight: 500 }}>Coming in Phase 2</h2>
        <p style={{ margin: '12px auto 0', color: 'var(--ink-soft)', fontSize: '0.95rem', maxWidth: 480 }}>Every inscription, share, and reveal will appear here. Verifiable onchain.</p>
        <button className="app-btn gold" style={{ marginTop: 24 }} onClick={() => window.location.hash = '#/vault'}>Open your vault →</button>
      </div>
    </AppShell>
  );
}
export { ScreenActivity };
