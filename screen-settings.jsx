import React from 'react';
import { AppShell, PageHead } from './shell.jsx';
import { useT } from './i18n.jsx';

function ScreenSettings() {
  const { lang, setLang } = useT();

  return (
    <AppShell active="settings" crumbs={['HOME', 'ACCOUNT', 'SETTINGS']}>
      <PageHead eyebrow="Account" title="<em>Settings</em>" sub="Configure your grimoire preferences." />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <section className="app-card" style={{ padding: 24 }}>
          <div className="kv-key">language</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--ink)', marginTop: 4, fontWeight: 500 }}>Idioma · Language</h3>
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            {[
              { code: 'en', label: 'English' },
              { code: 'es', label: 'Español' },
            ].map(({ code, label }) => (
              <button key={code} className={`chip ${lang === code ? 'gold' : ''}`} onClick={() => setLang(code)} style={{ fontSize: '0.9rem', padding: '10px 18px' }}>
                {label}
              </button>
            ))}
          </div>
        </section>

        <section className="app-card" style={{ padding: 24 }}>
          <div className="kv-key">network</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--ink)', marginTop: 4, fontWeight: 500 }}>Filecoin Calibration (testnet)</h3>
          <p style={{ marginTop: 6, color: 'var(--ink-soft)', fontSize: '0.85rem', lineHeight: 1.5 }}>
            Chain ID: 314159 · RPC: api.calibration.node.glif.io · Contract: 0x3f0b...1267
          </p>
        </section>

        <section className="app-card" style={{ padding: 24 }}>
          <div className="kv-key">encryption</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--ink)', marginTop: 4, fontWeight: 500 }}>Wallet-signature key derivation</h3>
          <p style={{ marginTop: 6, color: 'var(--ink-soft)', fontSize: '0.85rem', lineHeight: 1.5 }}>
            AES-256-GCM · EIP-191 personal sign · Deterministic per wallet · Same wallet = same key. No passphrase, no server, no recovery.
          </p>
        </section>
      </div>
    </AppShell>
  );
}
export { ScreenSettings };
