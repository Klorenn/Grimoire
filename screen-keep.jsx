import React from 'react';
import { AppShell, PageHead } from './shell.jsx';

/* ── Screen 2 · What to Keep ─────────────────────────────────── */
function ScreenKeep() {
  return (
    <AppShell active="keep" crumbs={['HOME', 'WHAT TO KEEP']}>
      <PageHead
        eyebrow="The collection · six categories"
        title={`What you may <em>keep</em> here.`}
        sub="Learn which inscriptions suit each kind of secret — and how Grimoire protects them."
      />
      <div className="app-card" style={{ padding: 60, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16, color: 'var(--gold-warm)' }}>✦</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--ink)', fontWeight: 500 }}>
          Coming in Phase 2
        </h2>
        <p style={{ marginTop: 12, color: 'var(--ink-soft)', fontSize: '0.95rem', maxWidth: 480, margin: '12px auto 0' }}>
          The collection guide will show real categories, counts, and templates once onchain inscriptions are live.
        </p>
        <button className="app-btn gold" style={{ marginTop: 24 }} onClick={() => window.location.hash = '#/vault'}>
          Open your vault →
        </button>
      </div>
    </AppShell>
  );
}

export { ScreenKeep };
