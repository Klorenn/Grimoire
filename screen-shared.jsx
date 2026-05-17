import React from 'react';
import { AppShell, PageHead } from './shell.jsx';
import { useT } from './i18n.jsx';

function ScreenShared() {
  const { t } = useT();
  const s = t.screens.shared;
  return (
    <AppShell active="shared" crumbs={['HOME', 'TRUST', 'SHARED']}>
      <PageHead eyebrow={s.eyebrow} title={s.title} sub={s.sub} />
      <section className="app-card" style={{ padding: 24 }}>
        <div className="kv-key">{s.activeGrants}</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--ink)', marginTop: 4, fontWeight: 500 }}>{s.noGrants}</h3>
        <p style={{ marginTop: 6, color: 'var(--ink-soft)', fontSize: '0.9rem', lineHeight: 1.55 }}>{s.grantsHint}</p>
      </section>
      <section className="app-card" style={{ marginTop: 18, padding: 24 }}>
        <div className="kv-key">{s.sharedWithMe}</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--ink)', marginTop: 4, fontWeight: 500 }}>{s.noShared}</h3>
        <p style={{ marginTop: 6, color: 'var(--ink-soft)', fontSize: '0.9rem', lineHeight: 1.55 }}>{s.sharedHint}</p>
      </section>
    </AppShell>
  );
}
export { ScreenShared };
