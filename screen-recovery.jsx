import React from 'react';
import { AppShell, PageHead } from './shell.jsx';
import { IconSeed, IconKey } from './icons.jsx';

/* ── Screen 5 · Recovery Guide ───────────────────────────────── */
function ScreenRecovery() {
  const steps = [
    {
      n: '01',
      title: 'Re-derive your wallet.',
      lead: 'From your seed phrase, hardware device, or whatever you safekept.',
      help: 'No seed? Try your hardware wallet. Still nothing? See "what we cannot help with".',
      icon: <IconSeed />,
    },
    {
      n: '02',
      title: 'Visit the recovery sigil.',
      lead: 'Open recover.grimoire.eth from any browser. No account. No email.',
      help: 'Onion mirror available. Works offline once cached — the protocol is local.',
      icon: <IconCompass />,
    },
    {
      n: '03',
      title: 'Sign the recovery message.',
      lead: 'Your wallet signs a short, free message. The protocol verifies onchain.',
      help: 'Signing is free. The signature never leaves your browser.',
      icon: <IconKey />,
    },
    {
      n: '04',
      title: 'Your grimoire returns to you.',
      lead: 'Inscriptions decrypt locally. The vault opens exactly as you left it.',
      help: 'Average retrieval · 1.4 s. First open after long silence may take longer.',
      icon: <IconBook />,
    },
  ];

  return (
    <AppShell active="recovery" crumbs={['HOME', 'LEGACY', 'RECOVERY']}>
      <PageHead
        eyebrow="Recovery · four steps"
        title={`If you have lost your way, the grimoire <em>remembers</em>.`}
        sub="There is no help desk, because there are no employees with access. Recovery is a protocol — quiet, free, and always available."
        actions={(<><button className="app-btn ghost">Print this guide</button><button className="app-btn gold">Begin recovery →</button></>)}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 18 }}>
        {/* Steps */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {steps.map((s, i) => (
            <article key={s.n} className="app-card" style={{ padding: 22, display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 22, alignItems: 'flex-start' }}>
              {/* number + icon */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, minWidth: 88 }}>
                <div className="icon-tile" style={{ width: 64, height: 64, borderRadius: 16 }}>
                  <span style={{ transform: 'scale(0.95)', display: 'inline-flex' }}>{s.icon}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--gold-warm)' }}>{s.n}</div>
              </div>

              {/* body */}
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--ink)', fontWeight: 500, lineHeight: 1.15 }}>{s.title}</h3>
                <p style={{ marginTop: 6, color: 'var(--ink-soft)', fontSize: '0.95rem', lineHeight: 1.55, maxWidth: '52ch' }}>{s.lead}</p>
                <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 12, background: 'color-mix(in srgb, var(--sky-soft) 22%, rgba(255,255,255,0.45))', border: '1px solid color-mix(in srgb, var(--sky-mid) 22%, transparent)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--sky-deep)', fontWeight: 600, fontFamily: 'var(--font-mono)', fontSize: '0.66rem', letterSpacing: '0.2em' }}>HINT</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--ink)', lineHeight: 1.5 }}>{s.help}</span>
                </div>
              </div>

              {/* connector arrow */}
              <div style={{ alignSelf: 'center', color: 'var(--gold-warm)', opacity: 0.65 }}>
                {i < steps.length - 1 ? '↓' : '✦'}
              </div>
            </article>
          ))}
        </section>

        {/* Right rail */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* What you'll need */}
          <section className="app-card" style={{ padding: 20 }}>
            <div className="kv-key" style={{ color: 'var(--gold-warm)' }}>what you will need</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--ink)', marginTop: 4, fontWeight: 500 }}>A short checklist</h3>
            <ul style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {[
                'Your wallet (any way).',
                'A browser with WebCrypto.',
                'Five quiet minutes.',
              ].map((line, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, fontSize: '0.9rem', color: 'var(--ink)' }}>
                  <span style={{ color: 'var(--grass)' }}>✦</span>{line}
                </li>
              ))}
            </ul>
          </section>

          {/* What we cannot help with */}
          <section className="app-card" style={{ padding: 20, background: 'linear-gradient(170deg, color-mix(in srgb, var(--cloud) 50%, rgba(255,255,255,0.7)), rgba(255,255,255,0.5))', border: '1px solid color-mix(in srgb, var(--gold) 22%, transparent)' }}>
            <div className="kv-key" style={{ color: 'var(--gold-warm)' }}>what we cannot do</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--ink)', marginTop: 4, fontWeight: 500, fontStyle: 'italic' }}>
              A gentle truth.
            </h3>
            <p style={{ marginTop: 10, color: 'var(--ink)', fontSize: '0.9rem', lineHeight: 1.55 }}>
              If you lose every copy of your wallet and every recovery key, the grimoire will outlast you with no key to open. The math will not bend, and we cannot soften it.
            </p>
            <p style={{ marginTop: 10, color: 'var(--ink-soft)', fontSize: '0.86rem', lineHeight: 1.55 }}>
              This is the same reason it cannot be seized.
            </p>
          </section>

          {/* Contact */}
          <section className="app-card" style={{ padding: 18 }}>
            <div className="kv-key">if you are stuck</div>
            <p style={{ marginTop: 8, fontSize: '0.86rem', color: 'var(--ink)', lineHeight: 1.5 }}>
              Reach the Order in the public forum. We help with the protocol, never with secrets.
            </p>
            <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
              <button className="app-btn ghost" style={{ padding: '6px 12px', fontSize: '0.76rem' }}>Forum →</button>
              <button className="app-btn ghost" style={{ padding: '6px 12px', fontSize: '0.76rem' }}>Field notes →</button>
            </div>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}

/* extra icon for step 4 */
const IconBook = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <g stroke="var(--gold-warm)" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 8h22a4 4 0 0 1 4 4v28H12a4 4 0 0 1-4-4z"/>
      <path d="M8 8a4 4 0 1 0 0 8h4"/>
      <path d="M16 16h12M16 22h12M16 28h8" opacity=".7"/>
      <path d="M30 4l6 1-4 5z" opacity=".7"/>
    </g>
  </svg>
);
const IconCompass = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <g stroke="var(--gold-warm)" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="16"/>
      <circle cx="24" cy="24" r="2" fill="var(--gold-warm)" stroke="none"/>
      <path d="m17 31 5-13 9-3-5 13z"/>
      <path d="M24 4v4M24 40v4M4 24h4M40 24h4" opacity=".6"/>
    </g>
  </svg>
);

export { ScreenRecovery, IconBook, IconCompass };
