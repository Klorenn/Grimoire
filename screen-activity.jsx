import React, { useState, useEffect } from 'react';
import { useAccount, usePublicClient } from 'wagmi';
import { AppShell, PageHead } from './shell.jsx';
import { useT } from './i18n.jsx';
import { CONTRACT_ADDRESS } from './src/config.js';

const ABI = [
  { anonymous: false, inputs: [{ indexed: true, name: 'owner', type: 'address' }, { indexed: false, name: 'cid', type: 'string' }, { indexed: false, name: 'kind', type: 'string' }, { indexed: false, name: 'titleHash', type: 'string' }, { indexed: false, name: 'createdAt', type: 'uint256' }, { indexed: false, name: 'unlockAt', type: 'uint256' }], name: 'InscriptionCreated', type: 'event' },
  { anonymous: false, inputs: [{ indexed: true, name: 'owner', type: 'address' }, { indexed: false, name: 'threshold', type: 'uint8' }, { indexed: false, name: 'dormancyPeriod', type: 'uint256' }], name: 'HeirsConfigured', type: 'event' },
  { anonymous: false, inputs: [{ indexed: true, name: 'owner', type: 'address' }, { indexed: false, name: 'timestamp', type: 'uint256' }], name: 'Pinged', type: 'event' },
];

function ScreenActivity() {
  const { isConnected, address } = useAccount();
  const publicClient = usePublicClient();
  const { t } = useT();
  const s = t.screens.activity;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadEvents() {
    if (!isConnected || !address || !publicClient) return;
    setLoading(true);
    try {
      const logs = await publicClient.getLogs({
        address: CONTRACT_ADDRESS,
        events: ABI,
        fromBlock: 0n,
        toBlock: 'latest',
      });
      const parsed = logs
        .filter(log => log.args?.owner?.toLowerCase() === address.toLowerCase())
        .map(log => {
          const ts = log.args?.createdAt || log.args?.timestamp;
          const date = ts ? new Date(Number(ts) * 1000) : null;
          return {
            event: log.eventName,
            kind: log.args?.kind || '',
            date,
            owner: log.args?.owner,
          };
        })
        .sort((a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0));
      setEvents(parsed);
    } catch (e) {
      console.error('Failed to load events:', e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadEvents(); }, [isConnected, address]);

  const kindLabels = { 'seed-phrase': 'Seed phrase', 'private-key': 'Private key', 'document': 'Document', 'letter': 'Letter', 'note': 'Note' };

  return (
    <AppShell active="activity" crumbs={['HOME', 'TRUST', 'ACTIVITY']}>
      <PageHead eyebrow={s.eyebrow} title={s.title} sub={s.sub} />

      {!isConnected ? (
        <div className="app-card" style={{ padding: 60, textAlign: 'center', color: 'var(--ink-soft)' }}>{s.connect || 'Connect your wallet'}</div>
      ) : loading ? (
        <div className="app-card" style={{ padding: 60, textAlign: 'center', color: 'var(--ink-soft)' }}>{s.loading}</div>
      ) : (
        <section className="app-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div className="kv-key">{s.events}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--ink)', marginTop: 4, fontWeight: 500 }}>{events.length} {s.count}</h3>
            </div>
            <button className="app-btn ghost" onClick={loadEvents} style={{ padding: '6px 12px', fontSize: '0.78rem' }}>{s.refresh}</button>
          </div>

          {events.length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--ink-soft)' }}>
              <p>{s.noEvents}</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {events.map((ev, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px dashed color-mix(in srgb, var(--ink) 8%, transparent)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--gold-warm)', minWidth: 80, paddingTop: 2 }}>
                    {ev.date ? ev.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : s.unknown}
                  </span>
                  <div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.5 }}>
                      {ev.event === 'InscriptionCreated' && `✦ ${s.inscribed} ${kindLabels[ev.kind] || ev.kind}`}
                      {ev.event === 'HeirsConfigured' && `✦ ${s.heirsConfigured}`}
                      {ev.event === 'Pinged' && `✦ ${s.pinged}`}
                    </div>
                    {ev.date && (
                      <div style={{ fontSize: '0.72rem', color: 'var(--ink-soft)', marginTop: 2 }}>
                        {ev.date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </AppShell>
  );
}
export { ScreenActivity };
