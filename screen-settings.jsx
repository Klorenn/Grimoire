import React from 'react';
import { AppShell, PageHead } from './shell.jsx';

function ScreenSettings() {
  return (
    <AppShell active="settings" crumbs={['HOME', 'ACCOUNT', 'SETTINGS']}>
      <PageHead eyebrow="Account" title="<em>Settings</em>" sub="Configure your grimoire preferences." />
      <div className="app-card" style={{ padding: 60, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16, color: 'var(--gold-warm)' }}>✦</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--ink)', fontWeight: 500 }}>Coming soon</h2>
        <p style={{ margin: '12px auto 0', color: 'var(--ink-soft)', fontSize: '0.95rem', maxWidth: 480 }}>Language, notifications, and account preferences will be here.</p>
        <button className="app-btn gold" style={{ marginTop: 24 }} onClick={() => window.location.hash = '#/vault'}>Open your vault →</button>
      </div>
    </AppShell>
  );
}
export { ScreenSettings };
