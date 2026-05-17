import React from 'react';
import { AppShell, PageHead } from './shell.jsx';
import { useT } from './i18n.jsx';

function ScreenKeep() {
  const { t } = useT();
  const cs = t.comingSoon.keep;
  return (
    <AppShell active="keep" crumbs={['HOME', 'WHAT TO KEEP']}>
      <PageHead eyebrow="The collection · six categories" title={`What you may <em>keep</em> here.`} sub="Learn which inscriptions suit each kind of secret — and how Grimoire protects them." />
      <div className="app-card" style={{ padding: 60, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16, color: 'var(--gold-warm)' }}>✦</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--ink)', fontWeight: 500 }}>{cs.title}</h2>
        <p style={{ margin: '12px auto 0', color: 'var(--ink-soft)', fontSize: '0.95rem', maxWidth: 480 }}>{cs.body}</p>
        <button className="app-btn gold" style={{ marginTop: 24 }} onClick={() => window.location.hash = '#/vault'}>{cs.cta}</button>
      </div>
    </AppShell>
  );
}
export { ScreenKeep };
