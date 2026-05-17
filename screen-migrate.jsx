import React, { useState } from 'react';
import { AppShell, PageHead } from './shell.jsx';

function ScreenMigrate() {
  const [jwt, setJwt] = useState('');
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchPins() {
    if (!jwt.trim()) return;
    setLoading(true); setError('');
    try {
      const res = await fetch('https://api.pinata.cloud/data/pinList?status=pinned&pageLimit=50', {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setPins(data.rows || []);
    } catch (e) {
      setError(e.message);
      setPins(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell active="migrate" crumbs={['HOME', 'SETTINGS', 'MIGRATE']}>
      <PageHead eyebrow="Migration" title="<em>Pinata</em> → Grimoire" sub="Pull your existing Pinata pins and convert them into encrypted, onchain inscriptions." />

      <section className="app-card" style={{ padding: 24, marginBottom: 18 }}>
        <div className="kv-key">your pinata JWT</div>
        <p style={{ marginTop: 4, color: 'var(--ink-soft)', fontSize: '0.85rem' }}>
          Paste your Pinata JWT token. It stays in your browser — never sent to any server.
        </p>
        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
          <input type="password" value={jwt} onChange={e => setJwt(e.target.value)} placeholder="eyJhbGciOiJI..."
            style={{ flex: 1, padding: '10px 14px', borderRadius: 10, border: '1px solid color-mix(in srgb, var(--ink) 12%, transparent)', background: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--ink)', outline: 'none' }} />
          <button className="app-btn gold" onClick={fetchPins} disabled={loading}>
            {loading ? 'Loading...' : 'Fetch pins'}
          </button>
        </div>
        {error && <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 10, background: 'rgba(164,88,74,0.1)', border: '1px solid rgba(164,88,74,0.2)', color: '#A4584A', fontSize: '0.85rem' }}>{error}</div>}
      </section>

      {pins && (
        <section className="app-card" style={{ padding: 24 }}>
          <div className="kv-key">your pins · {pins.length} found</div>
          <p style={{ marginTop: 4, color: 'var(--ink-soft)', fontSize: '0.85rem' }}>
            Select pins to migrate. Each will be encrypted and inscribed onchain.
          </p>
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 400, overflow: 'auto' }}>
            {pins.map((pin, i) => (
              <div key={pin.ipfs_pin_hash} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.5)', border: '1px solid color-mix(in srgb, var(--ink) 6%, transparent)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)', minWidth: 24 }}>{i + 1}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--ink)', wordBreak: 'break-all' }}>{pin.ipfs_pin_hash.slice(0, 20)}...</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--ink-soft)', marginTop: 2 }}>
                    {pin.metadata?.name || 'Unnamed'} · {(pin.size / 1024).toFixed(1)} KB · {new Date(pin.date_pinned).toLocaleDateString()}
                  </div>
                </div>
                <button className="app-btn ghost" style={{ padding: '6px 12px', fontSize: '0.72rem' }} disabled>
                  Migrate →
                </button>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: 14, borderRadius: 12, background: 'color-mix(in srgb, var(--gold) 8%, transparent)', border: '1px solid color-mix(in srgb, var(--gold) 20%, transparent)' }}>
            <p style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
              🔲 <strong>Coming in Phase 2:</strong> Batch migration with metadata assignment. For now, download files from Pinata and upload them through the Vault as new inscriptions.
            </p>
          </div>
        </section>
      )}
    </AppShell>
  );
}
export { ScreenMigrate };
