import React from 'react';
import { useAccount } from 'wagmi';
import { AppShell, PageHead } from './shell.jsx';
import { useT } from './i18n.jsx';

function ScreenActivity() {
  const { isConnected } = useAccount();
  const { t } = useT();

  return (
    <AppShell active="activity" crumbs={['HOME', 'TRUST', 'ACTIVITY']}>
      <PageHead eyebrow="Trust & people" title="<em>Activity</em> log" sub="Every inscription and proof-of-life is recorded onchain. Your grimoire remembers." />

      {!isConnected ? (
        <div className="app-card" style={{ padding: 60, textAlign: 'center', color: 'var(--ink-soft)' }}>
          Connect your wallet to view your activity.
        </div>
      ) : (
        <section className="app-card" style={{ padding: 24 }}>
          <div className="kv-key">onchain events</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--ink)', marginTop: 4, fontWeight: 500 }}>Recent activity</h3>

          <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <ActivityItem time="Connected" text="Wallet connected to Grimoire" />
            <ActivityItem time="Now" text={<span>Your inscriptions are fetched from <strong>Filecoin Calibration</strong> (chain 314159)</span>} />
            <ActivityItem time="Onchain" text="Activity events (InscriptionCreated, Pinged, HeirsConfigured) are emitted by GrimoireRegistry on FEVM" />
          </div>
        </section>
      )}

      <section className="app-card" style={{ marginTop: 18, padding: 24, background: 'linear-gradient(170deg, rgba(255,248,232,0.7), rgba(244,229,194,0.4))', border: '1px solid color-mix(in srgb, var(--gold) 22%, transparent)' }}>
        <div className="kv-key" style={{ color: 'var(--gold-warm)' }}>coming in Phase 3</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--ink)', marginTop: 4, fontWeight: 500 }}>Full event history</h3>
        <p style={{ marginTop: 8, color: 'var(--ink-soft)', fontSize: '0.9rem', lineHeight: 1.55 }}>
          The Graph subgraph indexing will provide fast, sortable, filterable activity with links to inscriptions, timestamps, and onchain verification links. For now, every event is visible on the Calibration block explorer.
        </p>
        <button className="app-btn gold" style={{ marginTop: 14 }} onClick={() => window.open('https://calibration.filfox.info/address/0x3f0bF9B29F276CD3219995d434621b2C70a91267', '_blank')}>
          View contract on explorer →
        </button>
      </section>
    </AppShell>
  );
}

function ActivityItem({ time, text }) {
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px dashed color-mix(in srgb, var(--ink) 8%, transparent)' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--gold-warm)', minWidth: 72, paddingTop: 2 }}>{time}</span>
      <span style={{ fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.5 }}>{text}</span>
    </div>
  );
}

export { ScreenActivity };
