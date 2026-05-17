import React from 'react';
import { AppShell, PageHead } from './shell.jsx';

/* ── Screen 3 · Inheritance (dead-man's switch) ──────────────── */
function ScreenInheritance() {
  return (
    <AppShell active="inheritance" crumbs={['HOME', 'LEGACY', 'INHERITANCE']}>
      <PageHead
        eyebrow="Legacy · programmable inheritance"
        title={`If you go <em>quiet</em>, your grimoire knows what to do.`}
        sub="Set a window of silence. When it elapses, the grimoire transitions to the heirs you have chosen."
      />
      <div className="app-card" style={{ padding: 60, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16, color: 'var(--gold-warm)' }}>❋</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--ink)', fontWeight: 500 }}>
          Coming in Phase 3
        </h2>
        <p style={{ marginTop: 12, color: 'var(--ink-soft)', fontSize: '0.95rem', maxWidth: 480, margin: '12px auto 0' }}>
          Dead-man's switch, silence windows, and heir bundles will be programmable via FEVM smart contracts.
        </p>
        <button className="app-btn gold" style={{ marginTop: 24 }} onClick={() => window.location.hash = '#/vault'}>
          Open your vault →
        </button>
      </div>
    </AppShell>
  );
}

export { ScreenInheritance };
