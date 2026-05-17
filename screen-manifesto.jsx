import React from 'react';
import { AppShell, ASigil } from './shell.jsx';

/* ── Screen 6 · Manifesto ────────────────────────────────────── */
function ScreenManifesto() {
  return (
    <AppShell active="manifesto" crumbs={['HOME', 'THE ORDER', 'MANIFESTO']} mainPadding="0">
      <div style={{
        background:
          'radial-gradient(60% 30% at 50% 0%, color-mix(in srgb, var(--sky-soft) 22%, transparent), transparent 60%),' +
          'radial-gradient(40% 40% at 0% 100%, color-mix(in srgb, var(--cloud) 60%, transparent), transparent 60%),' +
          'var(--shell-bg)',
        minHeight: '100%',
        padding: '56px 40px 80px',
      }}>
        <article style={{ maxWidth: 760, margin: '0 auto' }}>
          {/* Mark + title */}
          <header style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
              <ASigil size={64} />
              <div className="kv-key" style={{ color: 'var(--gold-warm)' }}>✦ A manifesto · the order of keepers</div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3.4rem', color: 'var(--ink)', fontWeight: 400, lineHeight: 1.0, letterSpacing: '-0.015em', textWrap: 'balance', marginTop: 4 }}>
                On the quiet keeping of <em style={{ fontStyle: 'italic', color: 'var(--gold-warm)', fontWeight: 500 }}>precious things</em>.
              </h1>
              <p style={{ marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
                Mmxxvi · written for those who come after
              </p>
            </div>
          </header>

          {/* Body */}
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.18rem', color: 'var(--ink)', lineHeight: 1.7, fontWeight: 400 }}>
            <p style={{ marginBottom: '1.4em' }}>
              <span style={{ float: 'left', fontFamily: 'var(--font-display)', fontSize: '5rem', lineHeight: '0.85', marginRight: 14, marginTop: 6, color: 'var(--gold-warm)', fontWeight: 400 }}>
                W
              </span>
              e are not in the business of remembering for you. We have built a quiet room in which your most precious things can wait — not for us, not for a company, not even for the chain — but for the person you are when you return, or for the person you have asked to find them.
            </p>

            <p style={{ marginBottom: '1.4em' }}>
              The world has many places to keep what matters. Drawers, vaults, custodial cloud, paper folded into a book that goes with you when you move. Each one is borrowed. Borrowed from the company that owns the drawer. Borrowed from the fragility of the paper. Borrowed from electricity, from servers, from arrangements between strangers.
            </p>

            <SectionMark>✦</SectionMark>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontStyle: 'italic', color: 'var(--ink)', fontWeight: 500, marginBottom: '0.7em', marginTop: '0.3em', lineHeight: 1.15 }}>
              The grimoire belongs to math.
            </h2>

            <p style={{ marginBottom: '1.4em' }}>
              Everything you write into it is sealed inside your own browser, before it touches a wire. The keys to that seal live with your wallet — never with us, never on a server, never in a screenshot we could be subpoenaed for. We engineered ourselves out of the loop.
            </p>

            <p style={{ marginBottom: '1.4em' }}>
              Once sealed, your inscription drifts onto Filecoin: a network of thousands of independent storage providers across thousands of independent jurisdictions, each holding a fragment, each cryptographically proving every twenty-four hours that they still hold what they promised to hold.
            </p>

            <BlockQuote>
              "A grimoire is not a service.
              <br />
              It is an arrangement between you, your wallet, and the math."
            </BlockQuote>

            <p style={{ marginBottom: '1.4em' }}>
              And because the grimoire is anchored to FEVM — Filecoin's small, durable virtual machine — its address is etched into a place no court can reach, no acquisition can rewrite, no quiet pivot can erase. The protocol remembers, even when we don't.
            </p>

            <SectionMark>❋</SectionMark>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontStyle: 'italic', color: 'var(--ink)', fontWeight: 500, marginBottom: '0.7em', lineHeight: 1.15 }}>
              On what should be kept.
            </h2>

            <p style={{ marginBottom: '1.4em' }}>
              Not everything deserves the grimoire. Receipts do not. Calendars do not. Most photographs do not. The grimoire is for the few small things whose loss would unmake a piece of you or a piece of those who follow you.
            </p>

            <p style={{ marginBottom: '1.4em' }}>
              Seed phrases. Private keys. The deed that proves a roof is yours. The letter you cannot send while alive but want delivered on a specific day. The inventory of every account, written in language a fourteen-year-old could read. The note no one but you should ever see — kept, finally, in a way that does not require trusting that no one will see it.
            </p>

            <SectionMark>❀</SectionMark>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontStyle: 'italic', color: 'var(--ink)', fontWeight: 500, marginBottom: '0.7em', lineHeight: 1.15 }}>
              On inheritance.
            </h2>

            <p style={{ marginBottom: '1.4em' }}>
              When you go quiet, the grimoire is patient. It will nudge you, then ping you, then wait. Only at the end of a window <em style={{ color: 'var(--gold-warm)' }}>you</em> chose will it transition to the heirs <em style={{ color: 'var(--gold-warm)' }}>you</em> chose. We will not be in that room. We will not have a key to that room. The protocol will turn the lock.
            </p>

            <SectionMark>⊹</SectionMark>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontStyle: 'italic', color: 'var(--ink)', fontWeight: 500, marginBottom: '0.7em', lineHeight: 1.15 }}>
              A gentle warning.
            </h2>

            <p style={{ marginBottom: '1.4em' }}>
              We cannot help you recover what you have lost the keys to. That is the same property that makes it impossible to steal from you. We will not call this a feature, but we will not apologize for it either.
            </p>

            <p style={{ marginBottom: '1.6em' }}>
              Keep your wallet well. Keep its seed in two places only you know. Tell at least one person that the grimoire exists, so they can find it when you cannot tell them yourself. Then, when the world is quieter than usual, return — and inscribe one small precious thing.
            </p>

            <SectionMark>✦</SectionMark>

            <p style={{ marginBottom: '0.5em', fontSize: '1.1rem' }}>
              The grimoire will be here.
            </p>
            <p style={{ marginBottom: '1.4em', fontStyle: 'italic', color: 'var(--gold-warm)', fontSize: '1.1rem' }}>
              And it will hold what you give it for as long as the math holds the world.
            </p>
          </div>

          {/* Sign-off */}
          <footer style={{ marginTop: 64, paddingTop: 28, borderTop: '1px dashed color-mix(in srgb, var(--ink) 14%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div className="kv-key">in trust</div>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.3rem', color: 'var(--ink)', marginTop: 4, fontWeight: 400 }}>
                — The Order of Keepers
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginTop: 6 }}>
                Anchored · FEVM · 0xfe…42a9
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="app-btn ghost">Read in Spanish</button>
              <button className="app-btn gold">Sign your name</button>
            </div>
          </footer>
        </article>
      </div>
    </AppShell>
  );
}

function SectionMark({ children }) {
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
    <blockquote style={{
      margin: '28px 0',
      padding: '20px 28px',
      borderLeft: '3px solid var(--gold)',
      background: 'linear-gradient(170deg, rgba(255,248,232,0.6), rgba(244,229,194,0.35))',
      borderRadius: '0 14px 14px 0',
      fontStyle: 'italic',
      color: 'var(--ink)',
      fontSize: '1.32rem',
      lineHeight: 1.5,
    }}>
      {children}
    </blockquote>
  );
}

export { ScreenManifesto, SectionMark, BlockQuote };
