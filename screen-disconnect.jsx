import React from 'react';
import { useDisconnect } from 'wagmi';
import { AppShell, PageHead } from './shell.jsx';
import { useT } from './i18n.jsx';
function ScreenDisconnect() {
  const { disconnect } = useDisconnect();
  const { t } = useT();
  return (
    <AppShell active="disconnect" crumbs={['HOME', 'ACCOUNT', 'DISCONNECT']}>
      <PageHead eyebrow="Account" title="<em>Disconnect</em>" sub="Disconnect your wallet from this grimoire." />
      <div className="app-card" style={{ padding: 60, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16, color: 'var(--gold-warm)' }}>⊹</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--ink)', fontWeight: 500 }}>Ready to leave?</h2>
        <p style={{ margin: '12px auto 0', color: 'var(--ink-soft)', fontSize: '0.95rem', maxWidth: 480 }}>Your inscriptions stay on Filecoin. You can always reconnect.</p>
        <button className="app-btn gold" style={{ marginTop: 24 }} onClick={() => { disconnect(); window.location.hash = ''; }}>Disconnect wallet</button>
      </div>
    </AppShell>
  );
}
export { ScreenDisconnect };
