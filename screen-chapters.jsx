import React from 'react';
import { AppShell, PageHead } from './shell.jsx';
import { useT } from './i18n.jsx';

function ScreenChapters() {
  return (
    <AppShell active="chapters" crumbs={['HOME', 'CHAPTERS']}>
      <PageHead eyebrow="" title="<em>Chapters</em>" sub="Organize your inscriptions into folders. Create chapters for Family, Crypto, Legal — whatever makes sense." />
      <section className="app-card" style={{ padding: 24 }}>
        <div className="kv-key">your chapters</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--ink)', marginTop: 4, fontWeight: 500 }}>No chapters yet</h3>
        <p style={{ marginTop: 6, color: 'var(--ink-soft)', fontSize: '0.9rem', lineHeight: 1.55 }}>
          Chapters are created automatically when you assign an inscription to one. Create an inscription and set a chapter name to start organizing.
        </p>
        <button className="app-btn gold" style={{ marginTop: 16 }} onClick={() => window.location.hash = '#/vault'}>Open your vault →</button>
      </section>
    </AppShell>
  );
}
export { ScreenChapters };
