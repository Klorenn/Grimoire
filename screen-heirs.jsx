import React from 'react';
import { AppShell, PageHead } from './shell.jsx';

/* ── Screen 4 · Heir Settings ────────────────────────────────── */
function ScreenHeirs() {
  return (
    <AppShell active="heirs" crumbs={['HOME', 'LEGACY', 'HEIR SETTINGS']}>
      <PageHead
        eyebrow="Legacy · heir management"
        title={`The people the grimoire will <em>find</em>.`}
        sub="Heirs are kept private until your switch fires. Configure who inherits what."
      />
      <div className="app-card" style={{ padding: 60, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16, color: 'var(--gold-warm)' }}>⊹</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--ink)', fontWeight: 500 }}>
          Coming in Phase 3
        </h2>
        <p style={{ marginTop: 12, color: 'var(--ink-soft)', fontSize: '0.95rem', maxWidth: 480, margin: '12px auto 0' }}>
          Multi-signature heir configuration with encrypted notes and inheritance bundles — onchain, trustless.
        </p>
        <button className="app-btn gold" style={{ marginTop: 24 }} onClick={() => window.location.hash = '#/vault'}>
          Open your vault →
        </button>
      </div>
    </AppShell>
  );
}

export { ScreenHeirs };
