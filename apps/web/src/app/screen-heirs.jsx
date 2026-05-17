'use client';
import React from 'react';
import { AppShell, PageHead } from './shell.jsx';
import { useT } from './i18n.jsx';

function ScreenHeirs() {
  const { t } = useT();
  const cs = t.comingSoon.heirs;
  return (
    <AppShell active="heirs" crumbs={['HOME', 'LEGACY', 'HEIR SETTINGS']}>
      <PageHead eyebrow="Legacy · heir management" title={`The people the grimoire will <em>find</em>.`} sub="Heirs are kept private until your switch fires. Configure who inherits what." />
      <div className="app-card" style={{ padding: 60, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16, color: 'var(--gold-warm)' }}>⊹</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--ink)', fontWeight: 500 }}>{cs.title}</h2>
        <p style={{ margin: '12px auto 0', color: 'var(--ink-soft)', fontSize: '0.95rem', maxWidth: 480 }}>{cs.body}</p>
        <button className="app-btn gold" style={{ marginTop: 24 }} onClick={() => window.location.hash = '#/vault'}>{cs.cta}</button>
      </div>
    </AppShell>
  );
}
export { ScreenHeirs };
