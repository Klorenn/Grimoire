import React from 'react';
import { useAccount } from 'wagmi';
import { AppShell, PageHead } from './shell.jsx';
import { useT } from './i18n.jsx';

function ScreenChapters() {
  const { isConnected } = useAccount();
  const { t } = useT();
  const s = t.screens.chapters;

  return (
    <AppShell active="chapters" crumbs={['HOME', 'CHAPTERS']}>
      <PageHead eyebrow="" title={s.title} sub={s.sub} />
      <section className="app-card" style={{ padding: 24 }}>
        <div className="kv-key">{s.yourChapters}</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--ink)', marginTop: 4, fontWeight: 500 }}>
          {isConnected ? s.noChapters : 'Connect to see chapters'}
        </h3>
        <p style={{ marginTop: 6, color: 'var(--ink-soft)', fontSize: '0.9rem', lineHeight: 1.55 }}>{s.chaptersHint}</p>
        <button className="app-btn gold" style={{ marginTop: 16 }} onClick={() => window.location.hash = '#/vault'}>{s.openVault}</button>
      </section>
    </AppShell>
  );
}
export { ScreenChapters };
