'use client';
import React from 'react';
import { AppShell, ASigil } from './shell.jsx';
import { useT } from './i18n.jsx';

function SectionMark({ children }) {
  const symbols = ['✦', '❋', '❀', '⊹', '✦'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '36px 0 28px', color: 'var(--gold)' }}>
      <span style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--gold) 35%, transparent), transparent)' }} />
      <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem' }}>{children}</span>
      <span style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--gold) 35%, transparent), transparent)' }} />
    </div>
  );
}

function BlockQuote({ children }) {
  return (
    <blockquote style={{ margin: '28px 0', padding: '20px 28px', borderLeft: '3px solid var(--gold)', background: 'linear-gradient(170deg, rgba(255,248,232,0.6), rgba(244,229,194,0.35))', borderRadius: '0 14px 14px 0', fontStyle: 'italic', color: 'var(--ink)', fontSize: '1.32rem', lineHeight: 1.5 }}>
      {children}
    </blockquote>
  );
}

function ScreenManifesto() {
  const { t } = useT();
  const m = t.manifesto;
  const symbols = ['✦', '❋', '❀', '⊹', '✦'];

  let symbolIndex = 0;
  const shouldShowSymbol = (item) => item.type === 'h2';

  return (
    <AppShell active="manifesto" crumbs={['HOME', 'THE ORDER', 'MANIFESTO']} mainPadding="0">
      <div style={{ background: 'radial-gradient(60% 30% at 50% 0%, color-mix(in srgb, var(--sky-soft) 22%, transparent), transparent 60%), radial-gradient(40% 40% at 0% 100%, color-mix(in srgb, var(--cloud) 60%, transparent), transparent 60%), var(--shell-bg)', minHeight: '100%', padding: '56px 40px 80px' }}>
        <article style={{ maxWidth: 760, margin: '0 auto' }}>
          <header style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
              <ASigil size={64} />
              <div className="kv-key" style={{ color: 'var(--gold-warm)' }}>{m.eyebrow}</div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3.4rem', color: 'var(--ink)', fontWeight: 400, lineHeight: 1.0, letterSpacing: '-0.015em', textWrap: 'balance', marginTop: 4 }}
                dangerouslySetInnerHTML={{ __html: m.title }} />
              <p style={{ marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>{m.date}</p>
            </div>
          </header>

          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.18rem', color: 'var(--ink)', lineHeight: 1.7, fontWeight: 400 }}>
            {m.body.map((item, i) => {
              if (item.type === 'h2') {
                const sym = symbols[symbolIndex % symbols.length];
                symbolIndex++;
                return (
                  <React.Fragment key={i}>
                    <SectionMark>{sym}</SectionMark>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontStyle: 'italic', color: 'var(--ink)', fontWeight: 500, marginBottom: '0.7em', marginTop: '0.3em', lineHeight: 1.15 }}>{item.text}</h2>
                  </React.Fragment>
                );
              }
              if (item.type === 'quote') return <BlockQuote key={i}>{item.text}</BlockQuote>;
              return <p key={i} style={{ marginBottom: '1.4em', fontStyle: item.italic ? 'italic' : undefined, color: item.italic ? 'var(--gold-warm)' : undefined, fontSize: item.italic ? '1.1rem' : undefined }}>{item.text}</p>;
            })}
          </div>

          <footer style={{ marginTop: 64, paddingTop: 28, borderTop: '1px dashed color-mix(in srgb, var(--ink) 14%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div className="kv-key">in trust</div>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.3rem', color: 'var(--ink)', marginTop: 4, fontWeight: 400 }}>{m.signoff}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginTop: 6 }}>{m.anchored}</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="app-btn gold">Sign your name</button>
            </div>
          </footer>
        </article>
      </div>
    </AppShell>
  );
}

export { ScreenManifesto, SectionMark, BlockQuote };
