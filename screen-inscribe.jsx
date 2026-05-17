import React from 'react';
import { AppShell, PageHead } from './shell.jsx';

function ScreenInscribe() {
  return (
    <AppShell active="inscribe" crumbs={['HOME', 'INSCRIBE']}>
      <PageHead eyebrow="" title="<em>Inscribe</em>" sub="Create a new inscription — text, seed phrase, or file. Go to the Vault and click '+ New inscription' to begin." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
        {[
          { icon: '✦', title: 'Seed phrase', sub: '12 or 24 words · encrypted with your wallet', color: 'var(--gold)' },
          { icon: '🔑', title: 'Private key', sub: 'Any chain · paste securely', color: 'var(--gold-warm)' },
          { icon: '📄', title: 'Document', sub: 'PDF, images, scans · encrypted before upload', color: 'var(--sky-deep)' },
          { icon: '✉️', title: 'Letter', sub: 'Time-locked · opens on a future date', color: 'var(--grass)' },
          { icon: '📝', title: 'Private note', sub: 'Markdown · journal · daily entries', color: 'var(--ink-soft)' },
          { icon: '🖼️', title: 'Photo', sub: 'Upload images · auto-thumbnail', color: 'var(--gold)' },
        ].map((item) => (
          <div key={item.title} className="app-card" style={{ padding: 22, borderLeft: `3px solid ${item.color}` }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--ink)', fontWeight: 500 }}>{item.title}</h3>
            <p style={{ marginTop: 6, color: 'var(--ink-soft)', fontSize: '0.85rem', lineHeight: 1.5 }}>{item.sub}</p>
          </div>
        ))}
      </div>
      <div className="app-card" style={{ marginTop: 18, padding: 20, textAlign: 'center' }}>
        <button className="app-btn gold" onClick={() => window.location.hash = '#/vault'}>
          Open vault + New inscription →
        </button>
      </div>
    </AppShell>
  );
}
export { ScreenInscribe };
