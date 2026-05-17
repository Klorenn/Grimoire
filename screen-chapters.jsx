import React from 'react';
import { AppShell, PageHead } from './shell.jsx';

function ScreenChapters() {
  return (
    <AppShell active="chapters" crumbs={['HOME', 'CHAPTERS']}>
      <PageHead eyebrow="" title="<em>Chapters</em>" sub="Organize your inscriptions into folders." />
      <div className="app-card" style={{ padding: 60, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16, color: 'var(--gold-warm)' }}>✦</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--ink)', fontWeight: 500 }}>Coming in Phase 2</h2>
        <p style={{ margin: '12px auto 0', color: 'var(--ink-soft)', fontSize: '0.95rem', maxWidth: 480 }}>Create chapters to organize your grimoire. Seed phrases in one, letters in another.</p>
        <button className="app-btn gold" style={{ marginTop: 24 }} onClick={() => window.location.hash = '#/vault'}>Open your vault →</button>
      </div>
    </AppShell>
  );
}
export { ScreenChapters };
