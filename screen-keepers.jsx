import React from 'react';
import { AppShell, PageHead } from './shell.jsx';
import { useT } from './i18n.jsx';
function ScreenKeepers() {
  const { t } = useT();
  return (
    <AppShell active="keepers" crumbs={['HOME', 'TRUST', 'KEEPERS']}>
      <PageHead eyebrow="Trust & people" title={`The <em>Keepers</em>`} sub="Configure heirs who will inherit your inscriptions." />
      <div className="app-card" style={{ padding: 60, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16, color: 'var(--gold-warm)' }}>❋</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--ink)', fontWeight: 500 }}>Coming in Phase 3</h2>
        <p style={{ margin: '12px auto 0', color: 'var(--ink-soft)', fontSize: '0.95rem', maxWidth: 480 }}>Heir configuration with multi-sig and dead-man's switch will be available soon.</p>
        <button className="app-btn gold" style={{ marginTop: 24 }} onClick={() => window.location.hash = '#/vault'}>Open your vault →</button>
      </div>
    </AppShell>
  );
}
export { ScreenKeepers };
