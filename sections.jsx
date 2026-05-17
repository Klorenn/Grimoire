import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useT } from './i18n.jsx';
import { Sigil, ArrowRight, XLogo, Github, Telegram, IconFlame, IconDrive, IconCompany, IconKey, IconSeed, IconDocument, IconLedger, IconLetter, IconNote, BrushArrow, BrushNode, NodeWallet, NodeFilecoin, NodeChain } from './icons.jsx';
import { WalletConnect, HeroWalletConnect } from './src/components/WalletConnect.jsx';

/* ── Hooks ────────────────────────────────────────────────────── */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);
  return reduced;
}

/* simple intersection-observer reveal — adds .in once visible */
function useReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-word');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    // First, strip 'in' from elements that aren't currently in view so they re-reveal on lang change
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '-60px 0px -60px 0px' }
    );
    els.forEach((el) => {
      // if it's already in viewport, mark immediately
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight - 40 && r.bottom > 40) {
        el.classList.add('in');
      } else {
        obs.observe(el);
      }
    });
    return () => obs.disconnect();
  }, [dep]);
}

/* ── Hero Video (ping-pong loop) ─────────────────────────────── */
function HeroVideo() {
  const videoRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;

    let direction = 1;
    let rafId;
    let lastTime = performance.now();

    const step = (now) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      if (direction === 1) {
        if (video.duration && video.currentTime >= video.duration - 0.05) {
          direction = -1;
          video.pause();
        }
      } else {
        video.currentTime = Math.max(0, video.currentTime - dt);
        if (video.currentTime <= 0.05) {
          direction = 1;
          video.play().catch(() => {});
        }
      }
      rafId = requestAnimationFrame(step);
    };

    video.muted = true;
    video.playsInline = true;
    const start = () => {
      video.play().catch(() => {});
      rafId = requestAnimationFrame(step);
    };
    if (video.readyState >= 2) start();
    else video.addEventListener('loadeddata', start, { once: true });

    return () => cancelAnimationFrame(rafId);
  }, [reduced]);

  return (
    <video
      ref={videoRef}
      src="assets/transition.mp4"
      poster="assets/frame-initial.png"
      muted
      playsInline
      preload="auto"
      className="absolute inset-0 w-full h-full object-cover z-0"
    />
  );
}

/* ── Ambient particles + atmospheric motion for hero ─────────── */
function HeroAmbient() {
  const reduced = usePrefersReducedMotion();

  const drifting = useMemo(() => {
    const glyphs = ['✦', '❋', '❀', '⊹', '✦', '⊹', '·'];
    return Array.from({ length: 22 }).map((_, i) => ({
      ch: glyphs[i % glyphs.length],
      left: Math.random() * 100,
      dx: (Math.random() - 0.5) * 200,
      rot: (Math.random() - 0.5) * 90,
      dur: 22 + Math.random() * 22,
      delay: -Math.random() * 40,
      size: 12 + Math.random() * 24,
    }));
  }, []);

  const wanderers = useMemo(() => {
    const glyphs = ['✦', '⊹', '·', '✦'];
    return Array.from({ length: 10 }).map((_, i) => ({
      ch: glyphs[i % glyphs.length],
      left: Math.random() * 100,
      top: 30 + Math.random() * 70,
      dx: (Math.random() - 0.5) * 240,
      dy: -(40 + Math.random() * 50),
      dy2: -(80 + Math.random() * 40),
      s: 0.7 + Math.random() * 0.9,
      dur: 30 + Math.random() * 20,
      delay: -Math.random() * 40,
      size: 10 + Math.random() * 18,
      maxOp: 0.45 + Math.random() * 0.3,
    }));
  }, []);

  const orbs = useMemo(() => ([
    { left: '12%', top: '24%', w: 320, h: 320, dur: 16, delay: -2,
      bg: 'radial-gradient(circle, rgba(255,232,168,0.55), rgba(232,168,71,0) 70%)' },
    { left: '64%', top: '12%', w: 460, h: 460, dur: 22, delay: -7,
      bg: 'radial-gradient(circle, rgba(168,208,216,0.6), rgba(168,208,216,0) 70%)' },
    { left: '78%', top: '58%', w: 280, h: 280, dur: 18, delay: -4,
      bg: 'radial-gradient(circle, rgba(255,232,168,0.45), rgba(232,168,71,0) 70%)' },
    { left: '32%', top: '70%', w: 360, h: 360, dur: 20, delay: -10,
      bg: 'radial-gradient(circle, rgba(244,229,194,0.5), rgba(244,229,194,0) 70%)' },
  ]), []);

  const wisps = useMemo(() => ([
    { top: '28%',  h: 60, w: '38%', dur: 55, delay: -10, ny: '-2%',
      bg: 'linear-gradient(90deg, transparent, rgba(255,248,232,0.45), transparent)' },
    { top: '54%',  h: 80, w: '46%', dur: 70, delay: -30, ny: '-4%',
      bg: 'linear-gradient(90deg, transparent, rgba(255,248,232,0.35), transparent)' },
    { top: '76%',  h: 50, w: '32%', dur: 60, delay: -5, ny: '-1%',
      bg: 'linear-gradient(90deg, transparent, rgba(244,229,194,0.4), transparent)' },
  ]), []);

  if (reduced) return null;
  return (
    <>
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]" aria-hidden="true">
        {orbs.map((o, i) => (
          <span key={i} className="hero-orb" style={{
            left: o.left, top: o.top, width: o.w, height: o.h, background: o.bg,
            '--dur': `${o.dur}s`, '--delay': `${o.delay}s`,
            '--ox': `${(i % 2 ? 1 : -1) * 20}px`, '--oy': `${(i % 3 - 1) * 10}px`,
          }}/>
        ))}
        {wisps.map((w, i) => (
          <span key={`w-${i}`} className="wisp" style={{
            top: w.top, height: w.h, width: w.w, background: w.bg,
            '--dur': `${w.dur}s`, '--delay': `${w.delay}s`, '--ny': w.ny,
          }}/>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[3]" aria-hidden="true">
        {drifting.map((p, i) => (
          <span key={i} className="particle" style={{
            left: `${p.left}%`, fontSize: `${p.size}px`,
            '--dx': `${p.dx}px`, '--rot': `${p.rot}deg`, '--dur': `${p.dur}s`, '--delay': `${p.delay}s`,
          }}>{p.ch}</span>
        ))}
        {wanderers.map((p, i) => (
          <span key={`w-${i}`} className="particle-wander" style={{
            left: `${p.left}%`, top: `${p.top}%`, fontSize: `${p.size}px`,
            '--dx': `${p.dx}px`, '--dy': `${p.dy}vh`, '--dy2': `${p.dy2}vh`,
            '--s': p.s, '--max-op': p.maxOp,
            '--dur': `${p.dur}s`, '--delay': `${p.delay}s`,
          }}>{p.ch}</span>
        ))}
      </div>
    </>
  );
}

/* ── Language toggle ────────────────────────────────────────── */
function LangToggle({ onDark = false }) {
  const { lang, setLang } = useT();
  const c = onDark ? 'rgba(250,243,227,0.85)' : 'var(--ink-soft)';
  const bd = onDark ? 'rgba(250,243,227,0.35)' : 'color-mix(in srgb, var(--ink) 18%, transparent)';
  return (
    <div
      className="hidden md:inline-flex items-center text-[11px] font-mono uppercase tracking-[0.18em] rounded-full overflow-hidden"
      style={{ border: `1px solid ${bd}`, color: c, padding: '2px' }}
    >
      {['en', 'es'].map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className="px-2.5 py-1 rounded-full transition-all"
          style={{
            background: lang === code ? 'var(--gold)' : 'transparent',
            color: lang === code ? 'var(--parchment)' : 'inherit',
            cursor: 'pointer',
          }}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

/* ── Navbar ──────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useT();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-md bg-[color-mix(in_srgb,var(--parchment)_85%,transparent)] border-b border-[color-mix(in_srgb,var(--ink)_8%,transparent)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <span className="sigil-slow relative inline-flex">
            <Sigil size={32} />
          </span>
          <span
            className="font-display"
            style={{
              fontWeight: 500, letterSpacing: '0.18em', fontSize: '1rem',
              color: scrolled ? 'var(--ink)' : 'var(--on-dark)',
              transition: 'color 0.5s ease',
              textShadow: scrolled ? 'none' : '0 1px 12px rgba(26,46,53,0.45)',
            }}
          >GRIMOIRE</span>
        </a>
        <div
          className="hidden md:flex items-center gap-9 text-sm"
          style={{
            color: scrolled ? 'var(--ink-soft)' : 'rgba(250,243,227,0.9)',
            transition: 'color 0.5s ease',
            textShadow: scrolled ? 'none' : '0 1px 12px rgba(26,46,53,0.45)',
          }}
        >
          <a href="#features"     className="hover:text-[var(--gold-warm)] transition-colors">{t.nav.collection}</a>
          <a href="#science"      className="hover:text-[var(--gold-warm)] transition-colors">{t.nav.howitworks}</a>
          <a href="#pricing"      className="hover:text-[var(--gold-warm)] transition-colors">{t.nav.stay}</a>
        </div>
        <div className="flex items-center gap-3">
          <LangToggle onDark={!scrolled} />
          <WalletConnect onDark={!scrolled} label={t.nav.connect} />
        </div>
      </div>
    </nav>
  );
}

/* ── Hero ────────────────────────────────────────────────────── */
function Hero() {
  const reduced = usePrefersReducedMotion();
  const { t, lang } = useT();

  // word-by-word reveal — re-run when lang changes
  useEffect(() => {
    if (reduced) {
      document.querySelectorAll('.hero-word').forEach((el) => el.classList.add('in'));
      return;
    }
    const words = document.querySelectorAll('.hero-word');
    words.forEach((w) => w.classList.remove('in'));
    const timers = [];
    words.forEach((w, i) => {
      timers.push(setTimeout(() => w.classList.add('in'), 200 + i * 130));
    });
    return () => timers.forEach(clearTimeout);
  }, [reduced, lang]);

  return (
    <section id="top" className="relative min-h-[115vh] w-full overflow-hidden">
      <HeroVideo />
      <div className="hero-vignette" />
      <HeroAmbient />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 pt-[140px] md:pt-[160px] pb-24">
        <div className="md:max-w-[60%] hero-text">
          <h1
            className="font-display leading-[1.0] tracking-[-0.01em] relative"
            style={{ color: 'var(--on-dark)', fontWeight: 400, fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
          >
            {t.hero.h1.map((w, i) => {
              if (w === 'BR') return <br key={i} />;
              const gold = w === t.hero.goldWord;
              const italic = gold;
              const floatDur = 6 + ((i * 1.3) % 3);
              const floatDelay = 1.1 + ((i * 0.4) % 3);
              const floatAmp = -(4 + ((i * 2.1) % 5));
              return (
                <span
                  key={i}
                  className={`reveal-word hero-word inline-block ${gold ? 'hero-word-gold relative' : ''}`}
                  style={{
                    fontStyle: italic ? 'italic' : 'normal',
                    color: gold ? 'var(--gold)' : 'inherit',
                    fontWeight: italic ? 500 : 400,
                    marginRight: '0.22em',
                    textShadow: gold ? '0 2px 28px rgba(232,168,71,0.55), 0 2px 14px rgba(26,46,53,0.35)' : undefined,
                    '--float-dur': `${floatDur}s`,
                    '--float-delay': `${floatDelay}s`,
                    '--float': `${floatAmp}px`,
                  }}
                >
                  {w}
                  {gold && (
                    <>
                      <span className="spark" style={{ left: '-8%',  top: '-12%', fontSize: '14px', '--dur':'3.2s', '--delay':'0s' }}>✦</span>
                      <span className="spark" style={{ left: '38%',  top: '-22%', fontSize: '10px', '--dur':'2.8s', '--delay':'0.9s' }}>⊹</span>
                      <span className="spark" style={{ left: '92%',  top: '8%',   fontSize: '16px', '--dur':'3.6s', '--delay':'1.6s' }}>✦</span>
                      <span className="spark" style={{ left: '108%', top: '38%',  fontSize: '12px', '--dur':'3s',   '--delay':'2.2s' }}>⊹</span>
                      <span className="spark" style={{ left: '64%',  top: '92%',  fontSize: '13px', '--dur':'2.6s', '--delay':'0.4s' }}>·</span>
                      <span className="spark" style={{ left: '18%',  top: '110%', fontSize: '11px', '--dur':'3.4s', '--delay':'1.2s' }}>✦</span>
                    </>
                  )}
                </span>
              );
            })}
          </h1>

          <p className="mt-8 reveal-word hero-word"
             style={{ maxWidth: '460px', color: 'rgba(250,243,227,0.92)', fontWeight: 300, fontSize: '1.075rem', lineHeight: 1.65, textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>
            {t.hero.subtitle}
          </p>

          <div className="reveal-word hero-word mt-9">
            <HeroWalletConnect label={t.hero.cta} />
          </div>

          <div className="mt-6 reveal-word hero-word flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono uppercase tracking-[0.18em]"
               style={{ color: 'rgba(250,243,227,0.7)' }}>
            {t.hero.foot.map((s, i) => (
              <React.Fragment key={i}>
                <span>{s}</span>
                {i < t.hero.foot.length - 1 && <span style={{ color: 'var(--gold)' }}>⊹</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 reveal-word hero-word scroll-cue flex flex-col items-center gap-2"
           style={{ color: 'rgba(250,243,227,0.7)' }}>
        <span className="text-[10px] uppercase tracking-[0.3em] font-mono">{t.hero.scroll}</span>
        <span className="block w-px h-10 bg-[rgba(250,243,227,0.5)]"></span>
      </div>
    </section>
  );
}

/* ── Section helpers ─────────────────────────────────────────── */
function SectionEyebrow({ children }) {
  return (
    <div className="eyebrow inline-flex items-center gap-2 reveal">
      <span className="eyebrow-spark" style={{ color: 'var(--gold)' }}>✦</span>
      {children}
    </div>
  );
}

function SectionTitle({ children, className = '' }) {
  return (
    <h2 className={`font-display reveal ${className}`}
        style={{
          color: 'var(--ink)', fontWeight: 400,
          fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
          lineHeight: 1.08, letterSpacing: '-0.01em', textWrap: 'balance',
        }}>
      {children}
    </h2>
  );
}

function Italic({ children, color = 'var(--gold-warm)' }) {
  return <em style={{ color, fontStyle: 'italic', fontWeight: 500 }}>{children}</em>;
}

/* ── 3 · Problem ─────────────────────────────────────────────── */
function Problem() {
  const { t } = useT();
  const icons = [<IconFlame />, <IconDrive />, <IconCompany />];
  return (
    <section id="problem" className="relative py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-[1280px] mx-auto">
        <SectionEyebrow>{t.problem.eyebrow}</SectionEyebrow>
        <SectionTitle className="mt-5 max-w-[22ch]">
          {t.problem.titleA}<Italic>{t.problem.titleB}</Italic>{t.problem.titleC}<Italic>{t.problem.titleD}</Italic>{t.problem.titleE}<Italic>{t.problem.titleF}</Italic>
        </SectionTitle>
        <p className="reveal mt-6 max-w-[60ch] text-[var(--ink-soft)] text-lg leading-relaxed">{t.problem.intro}</p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {/* Visual card — paper-burns video */}
          <VisualCard
            videoSrc="assets/paper-burns.mp4"
            filter="saturate(1.05) contrast(1.08)"
            tag={t.problem.visualTag}
            headline={t.problem.visualHeadline}
            sub={t.problem.visualSub}
          />

          {/* 3 text cards with bullets */}
          {t.problem.cards.map((c, i) => (
            <article
              key={i}
              className="warm-glass reveal flex flex-col p-6 md:p-7"
              style={{ transitionDelay: `${(i + 1) * 0.08}s` }}
            >
              <header className="flex items-start justify-between gap-4 mb-7">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                     style={{ background: 'color-mix(in srgb, var(--gold) 12%, transparent)',
                              border: '1px solid color-mix(in srgb, var(--gold) 24%, transparent)' }}>
                  <span className="icon-breath" style={{ transform: 'scale(0.72)', '--ib-delay': `${i * 0.4}s` }}>{icons[i]}</span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-soft)] opacity-60 mt-2">
                  {c.code}
                </span>
              </header>

              <h3 className="font-display text-[1.7rem] leading-tight text-[var(--ink)]" style={{ fontWeight: 500 }}>{c.t}</h3>
              <p className="mt-3 text-[var(--ink-soft)] text-[0.92rem] leading-relaxed">{c.b}</p>

              <ul className="mt-6 space-y-2.5 flex-1">
                {c.bullets.map((line, bi) => (
                  <li key={bi} className="flex gap-2.5 text-[0.85rem] leading-snug text-[var(--ink)]">
                    <CheckMark />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-dashed border-[color-mix(in_srgb,var(--ink)_12%,transparent)]">
                <a href="#solution" className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--gold-warm)] hover:text-[var(--gold)] transition-colors">
                  {t.problem.learnMore} <ArrowRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Reusable full-bleed visual card with looping video ──────── */
function VisualCard({ videoSrc, filter, tag, headline, sub, ratio, dark = true, className = '', delay = 0 }) {
  const vRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const v = vRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    v.loop = true;
    if (!reduced) v.play().catch(() => {});
    else v.pause();
  }, [reduced]);

  return (
    <article
      className={`reveal relative overflow-hidden rounded-3xl flex flex-col ${className}`}
      style={{
        transitionDelay: `${delay}s`,
        background: 'var(--ink)',
        border: '1px solid rgba(26,46,53,0.08)',
        boxShadow: '0 1px 0 rgba(255,255,255,0.5) inset, 0 14px 40px -22px rgba(26,46,53,0.35)',
        aspectRatio: ratio,
        minHeight: ratio ? undefined : '100%',
      }}
    >
      <video
        ref={vRef}
        src={videoSrc}
        muted
        playsInline
        loop
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter }}
      />
      {/* warm wash */}
      <div aria-hidden="true" className="absolute inset-0"
           style={{ background: 'linear-gradient(180deg, rgba(26,46,53,0) 0%, rgba(26,46,53,0.15) 50%, rgba(26,46,53,0.78) 100%)' }} />
      <div aria-hidden="true" className="absolute inset-0 mix-blend-soft-light opacity-50"
           style={{ background: 'linear-gradient(155deg, rgba(255,232,168,0.4), rgba(232,168,71,0) 65%)' }} />

      {/* bottom caption */}
      <div className="relative z-10 mt-auto px-5 md:px-7 pb-6 md:pb-7">
        {headline && (
          <div className="font-display leading-[1.12]"
               style={{ color: 'var(--parchment)', fontWeight: 500, fontSize: 'clamp(1.45rem, 1.85vw, 1.95rem)' }}>
            {headline}
          </div>
        )}
        {sub && (
          <p className="mt-2.5 text-[0.88rem] leading-relaxed"
             style={{ color: 'rgba(250,243,227,0.78)', maxWidth: '40ch' }}>
            {sub}
          </p>
        )}
      </div>
    </article>
  );
}

/* ── A 4-petal checkmark — gold ✦ */
function CheckMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className="shrink-0 mt-[3px]">
      <path d="M3 7.3 L 6 10 L 11 4" stroke="var(--gold-warm)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ── 4 · Solution + explicit flow diagram ────────────────────── */
function Solution() {
  const { t } = useT();
  return (
    <section id="solution" className="relative py-28 md:py-36 px-6 md:px-10 overflow-hidden"
             style={{ background: 'linear-gradient(180deg, var(--parchment) 0%, color-mix(in srgb, var(--sky-soft) 32%, var(--parchment)) 50%, var(--parchment) 100%)' }}>
      <div aria-hidden="true" className="absolute inset-0 opacity-50 pointer-events-none"
           style={{ background: 'radial-gradient(60% 40% at 20% 30%, rgba(255,255,255,0.55), transparent 60%), radial-gradient(50% 35% at 85% 70%, rgba(255,248,232,0.5), transparent 60%)' }}/>

      <div className="relative max-w-[1180px] mx-auto">
        <SectionEyebrow>{t.solution.eyebrow}</SectionEyebrow>
        <SectionTitle className="mt-5 max-w-[22ch]">
          {t.solution.titleA}<Italic>{t.solution.titleB}</Italic>{t.solution.titleC}
        </SectionTitle>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Left — prose, narrower */}
          <div className="lg:col-span-2 space-y-7 max-w-[52ch]">
            <div className="reveal" style={{ aspectRatio: '4 / 3' }}>
              <VisualCard
                videoSrc="assets/disk-repair.mp4"
                filter="saturate(0.92) contrast(1.04)"
                tag={t.solution.videoTag}
                headline={t.solution.videoHead}
                sub={t.solution.videoSub}
                className="h-full"
              />
            </div>
            {t.solution.paragraphs.map((line, i) => (
              <p key={i} className="reveal flex gap-4 text-[var(--ink)] text-lg leading-[1.7]" style={{ transitionDelay: `${i * 0.1}s` }}>
                <span className="text-[var(--gold)] text-xl shrink-0 leading-[1.6] bullet-spark"
                      style={{ '--bs-delay': `${i * 1.4}s` }}>✦</span>
                <span>{line}</span>
              </p>
            ))}
          </div>

          {/* Right — explicit horizontal flow diagram */}
          <div className="reveal lg:col-span-3">
            <FlowDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Explicit flow diagram: wallet → encrypt → Filecoin → CID → onchain ── */
function FlowDiagram() {
  const { t } = useT();
  const steps = [
    { node: <NodeWallet />,  label: t.solution.stepWallet.l,  sub: t.solution.stepWallet.s  },
    { node: <NodeEncrypt />, label: t.solution.stepEncrypt.l, sub: t.solution.stepEncrypt.s, accent: true },
    { node: <NodeFilecoin />,label: t.solution.stepFile.l,    sub: t.solution.stepFile.s,    accent: true },
    { node: <NodeChain />,   label: t.solution.stepChain.l,   sub: t.solution.stepChain.s   },
  ];

  return (
    <div className="warm-glass p-7 md:p-10"
         style={{ background: 'linear-gradient(165deg, rgba(255,255,255,0.72) 0%, rgba(255,248,232,0.48) 100%)' }}>
      <div className="flex items-center justify-between mb-7">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink-soft)]">
          {t.solution.pathTitle}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--gold-warm)' }}>
          ✦ AES-256 · FEVM
        </div>
      </div>

      {/* Steps */}
      <div className="flex items-stretch justify-between gap-1 md:gap-2">
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <FlowStep node={s.node} label={s.label} sub={s.sub} accent={s.accent} delay={i * 0.15} />
            {i < steps.length - 1 && <FlowConnector delay={i * 0.15 + 0.1} />}
          </React.Fragment>
        ))}
      </div>

      {/* CID annotation */}
      <div className="mt-7 reveal" style={{ transitionDelay: '0.6s' }}>
        <div className="font-mono text-[11px] text-[var(--ink-soft)] mb-2 uppercase tracking-[0.22em]">
          {t.solution.stepCid.l} · {t.solution.stepCid.s}
        </div>
        <div className="font-mono text-xs md:text-sm text-[var(--ink)] p-3 rounded-xl"
             style={{ background: 'color-mix(in srgb, var(--ink) 5%, transparent)', wordBreak: 'break-all' }}>
          bafybeig7xvk3m9p2nqf4z8r2tcyx5w...
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-dashed border-[color-mix(in_srgb,var(--ink)_15%,transparent)] flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">
        <span>{t.solution.onlyYou}</span>
        <span style={{ color: 'var(--gold-warm)' }}>{t.solution.forever}</span>
      </div>
    </div>
  );
}

function FlowStep({ node, label, sub, accent, delay = 0 }) {
  return (
    <div className="reveal flex flex-col items-center text-center flex-1 min-w-0" style={{ transitionDelay: `${delay}s` }}>
      <BrushNode accent={accent}>{node}</BrushNode>
      <div className="mt-3 font-display text-base md:text-lg text-[var(--ink)] leading-tight"
           style={{ fontWeight: 500 }}>
        {label}
      </div>
      <div className="mt-1 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.16em] text-[var(--ink-soft)] leading-tight">
        {sub}
      </div>
    </div>
  );
}

function FlowConnector({ delay = 0 }) {
  return (
    <div className="reveal flex items-start justify-center pt-6 md:pt-8 flex-shrink-0"
         style={{ transitionDelay: `${delay}s`, minWidth: '20px' }}>
      <svg width="46" height="20" viewBox="0 0 46 20" aria-hidden="true">
        <path d="M 2 10 C 14 4, 22 16, 34 10" stroke="var(--gold-warm)" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeDasharray="3 4"/>
        <path d="M 30 5 L 42 10 L 30 15" stroke="var(--gold-warm)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

/* extra brush node for "encrypt" — a lock with sparkles */
function NodeEncrypt() {
  return (
    <svg width="42" height="42" viewBox="0 0 48 48" aria-hidden="true">
      <g stroke="var(--gold-warm)" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="12" y="22" width="24" height="18" rx="3"/>
        <path d="M16 22 V 16 C 16 11, 19 8, 24 8 C 29 8, 32 11, 32 16 V 22"/>
        <circle cx="24" cy="31" r="2.5" fill="var(--gold-warm)" stroke="none"/>
        <path d="M24 33 V 36"/>
        <path d="M40 12 l 1 -3 1 3 3 1 -3 1 -1 3 -1 -3 -3 -1 z" fill="var(--gold-warm)" stroke="none" opacity=".7"/>
      </g>
    </svg>
  );
}

/* expose for testing */
export { NodeEncrypt };

/* ── 5 · Features ────────────────────────────────────────────── */
function Features() {
  const { t } = useT();
  const icons = [<IconSeed />, <IconKey />, <IconDocument />, <IconLedger />, <IconLetter />, <IconNote />];
  return (
    <section id="features" className="relative py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-[1180px] mx-auto">
        <SectionEyebrow>{t.features.eyebrow}</SectionEyebrow>
        <SectionTitle className="mt-5 max-w-[20ch]">
          {t.features.titleA}<Italic>{t.features.titleB}</Italic>{t.features.titleC}
        </SectionTitle>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.features.items.map((f, i) => (
            <div key={i} className="warm-glass reveal p-7 md:p-8 flex flex-col"
                 style={{ transitionDelay: `${(i % 3) * 0.08}s` }}>
              <div className="mb-5 icon-breath" style={{ '--ib-delay': `${(i * 0.35) % 2.5}s`, display: 'inline-flex' }}>{icons[i]}</div>
              <h3 className="font-display text-2xl text-[var(--ink)]" style={{ fontWeight: 500 }}>{f.n}</h3>
              <p className="mt-3 text-[var(--ink-soft)] leading-relaxed flex-1">{f.b}</p>
              <div className="mt-6 pt-5 border-t border-dashed border-[color-mix(in_srgb,var(--ink)_12%,transparent)]">
                <span className="tag-mono">{f.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 5.5 · Compare table ─────────────────────────────────────── */
function Compare() {
  const { t } = useT();
  const cols = t.compare.cols;
  const grimoireIdx = cols.length - 1;
  return (
    <section id="compare" className="relative py-28 md:py-36 px-6 md:px-10"
             style={{ background: 'linear-gradient(180deg, var(--parchment), color-mix(in srgb, var(--cloud) 28%, var(--parchment)) 50%, var(--parchment))' }}>
      <div className="max-w-[1180px] mx-auto">
        <SectionEyebrow>{t.compare.eyebrow}</SectionEyebrow>
        <SectionTitle className="mt-5 max-w-[22ch]">
          {t.compare.titleA}<Italic>{t.compare.titleB}</Italic>
        </SectionTitle>
        <p className="reveal mt-6 max-w-[58ch] text-[var(--ink-soft)] text-lg leading-relaxed">{t.compare.intro}</p>

        {/* Banner — companies-fade video */}
        <div className="reveal mt-10" style={{ aspectRatio: '24 / 9' }}>
          <VisualCard
            videoSrc="assets/companies-fade.mp4"
            filter="saturate(0.95) contrast(1.02)"
            tag={t.compare.videoTag}
            headline={t.compare.videoHead}
            sub={t.compare.videoSub}
            className="h-full"
          />
        </div>

        {/* Table — desktop */}
        <div className="reveal mt-10 hidden md:block">
          <div className="warm-glass p-2 md:p-3"
               style={{ background: 'linear-gradient(165deg, rgba(255,255,255,0.76) 0%, rgba(244,229,194,0.4) 100%)' }}>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-5 pl-6 pr-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-soft)] align-bottom">
                    {t.compare.colHead}
                  </th>
                  {cols.map((c, i) => (
                    <th key={i}
                        className="py-5 px-3 font-display text-[var(--ink)] align-bottom"
                        style={{
                          fontSize: '1.05rem',
                          fontWeight: 500,
                          textAlign: 'center',
                          color: i === grimoireIdx ? 'var(--gold-warm)' : 'var(--ink)',
                          position: 'relative',
                        }}>
                      {i === grimoireIdx && (
                        <span className="absolute -top-1 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.2em]"
                              style={{ color: 'var(--gold)' }}>✦</span>
                      )}
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.compare.rows.map((r, ri) => (
                  <tr key={ri} className="border-t border-dashed border-[color-mix(in_srgb,var(--ink)_10%,transparent)]">
                    <td className="py-5 pl-6 pr-3 text-[var(--ink)]" style={{ fontSize: '0.98rem' }}>{r.k}</td>
                    {r.v.map((val, ci) => (
                      <td key={ci} className="py-5 px-3 text-center"
                          style={{
                            background: ci === grimoireIdx ? 'color-mix(in srgb, var(--gold) 6%, transparent)' : 'transparent',
                          }}>
                        <Mark yes={val} accent={ci === grimoireIdx} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile — stacked cards */}
        <div className="reveal mt-10 md:hidden space-y-4">
          {cols.map((col, ci) => (
            <div key={ci}
                 className={`warm-glass p-6 ${ci === grimoireIdx ? 'pricing-highlight' : ''}`}
                 style={{ background: ci === grimoireIdx ? 'linear-gradient(170deg, rgba(255,248,232,0.85), rgba(255,255,255,0.55))' : undefined }}>
              <div className="font-display text-xl mb-3" style={{ fontWeight: 500, color: ci === grimoireIdx ? 'var(--gold-warm)' : 'var(--ink)' }}>
                {col}
              </div>
              <ul className="space-y-2">
                {t.compare.rows.map((r, ri) => (
                  <li key={ri} className="flex items-center gap-3 text-sm text-[var(--ink)]">
                    <Mark yes={r.v[ci]} accent={ci === grimoireIdx} small />
                    <span>{r.k}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Mark({ yes, accent, small }) {
  if (yes) {
    return (
      <span
        aria-label="yes"
        className="inline-flex items-center justify-center font-display"
        style={{
          color: accent ? 'var(--gold-warm)' : 'var(--grass)',
          fontSize: small ? '1rem' : '1.4rem',
          lineHeight: 1,
          textShadow: accent ? '0 0 12px rgba(232,168,71,0.45)' : 'none',
        }}
      >✦</span>
    );
  }
  return (
    <span aria-label="no" className="inline-block"
          style={{
            width: small ? 10 : 14, height: 1.5,
            background: 'color-mix(in srgb, var(--ink) 25%, transparent)',
            borderRadius: 1,
          }}/>
  );
}

/* ── 6 · Science / Trust ─────────────────────────────────────── */
function Science() {
  const { t } = useT();
  const proofLines = [
    { k: t.science.term.wallet,  v: '0x4a9f...3b7c' },
    { k: t.science.term.encrypt, v: 'AES-256 · client-side' },
    { k: t.science.term.cid,     v: 'bafybeig7xv...k3m9p2' },
    { k: t.science.term.proof,   v: 'PoSt verified · block #4,291,847' },
    { k: t.science.term.status,  v: t.science.term.statusVal, gold: true },
  ];
  return (
    <section id="science" className="relative py-28 md:py-36 px-6 md:px-10 overflow-hidden">
      <div aria-hidden="true" className="absolute left-0 right-0 top-1/3 bottom-1/3"
           style={{ background: 'linear-gradient(180deg, transparent, color-mix(in srgb, var(--sky-soft) 28%, transparent), transparent)', filter: 'blur(40px)' }}/>

      <div className="relative max-w-[1180px] mx-auto">
        <SectionEyebrow>{t.science.eyebrow}</SectionEyebrow>
        <SectionTitle className="mt-5 max-w-[22ch]">
          {t.science.titleA}<Italic>{t.science.titleB}</Italic>{t.science.titleC}
          <span style={{ color: 'var(--ink-soft)', fontStyle: 'italic' }}>{t.science.titleD}</span>
        </SectionTitle>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-9 max-w-[50ch]">
            {t.science.blocks.map((p, i) => (
              <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <h3 className="font-display text-2xl text-[var(--ink)]" style={{ fontWeight: 500 }}>
                  <span style={{ color: 'var(--gold)', marginRight: '0.5rem' }}>✦</span>
                  {p.t}
                </h3>
                <p className="mt-2 ml-7 text-[var(--ink-soft)] text-lg leading-relaxed">{p.b}</p>
              </div>
            ))}
          </div>

          <div className="reveal">
            <div className="warm-glass p-7 md:p-9"
                 style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.78) 0%, rgba(244,229,194,0.42) 100%)' }}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--gold)' }}></span>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--sky-mid)' }}></span>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--grass)' }}></span>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-soft)]">
                  {t.science.term.title}
                </div>
              </div>

              <div>
                {proofLines.map((l, i) => (
                  <div key={i} className="proof-line reveal" style={{ transitionDelay: `${i * 0.3}s` }}>
                    <span className="proof-key">{l.k}</span>
                    <span className="proof-val" style={l.gold ? { color: 'var(--gold-warm)' } : undefined}>→ {l.v}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 font-mono text-[11px] text-[var(--ink-soft)]">
                <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--grass)' }}></span>
                {t.science.term.synced}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 reveal">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-soft)] text-center mb-5 opacity-70">
            {t.science.wovenFrom}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-10 md:gap-x-16 gap-y-4">
            {['Filecoin', 'IPFS', 'Lighthouse', 'FEVM'].map((name, i, arr) => (
              <React.Fragment key={name}>
                <span className="logo-strip-item">{name}</span>
                {i < arr.length - 1 && <span className="text-[var(--gold)] opacity-50">⊹</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 7 · Testimonials ────────────────────────────────────────── */
function Testimonials() {
  const { t } = useT();
  return (
    <section id="testimonials" className="relative py-28 md:py-36 px-6 md:px-10"
             style={{ background: 'linear-gradient(180deg, var(--parchment) 0%, color-mix(in srgb, var(--sky-soft) 28%, var(--parchment)) 50%, var(--parchment) 100%)' }}>
      <div className="max-w-[1180px] mx-auto">
        <SectionEyebrow>{t.testimonials.eyebrow}</SectionEyebrow>
        <SectionTitle className="mt-5 max-w-[20ch]">
          {t.testimonials.titleA}<Italic>{t.testimonials.titleB}</Italic>{t.testimonials.titleC}
        </SectionTitle>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.testimonials.quotes.map((q, i) => (
            <figure key={i} className="warm-glass reveal p-8 md:p-9 flex flex-col"
                    style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="text-[var(--gold)] text-2xl mb-4 font-display leading-none">&ldquo;</div>
              <blockquote className="font-display italic text-[var(--ink)] flex-1"
                          style={{ fontSize: 'clamp(1.15rem, 1.4vw, 1.4rem)', lineHeight: 1.45, fontWeight: 400 }}>
                {q.q}
              </blockquote>
              <figcaption className="mt-7 pt-5 border-t border-dashed border-[color-mix(in_srgb,var(--ink)_12%,transparent)] font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-soft)]">
                — {q.a}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 8 · Pricing ─────────────────────────────────────────────── */
function Pricing() {
  const { t } = useT();
  return (
    <section id="pricing" className="relative py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-[1180px] mx-auto">
        <SectionEyebrow>{t.pricing.eyebrow}</SectionEyebrow>
        <SectionTitle className="mt-5 max-w-[20ch]">
          {t.pricing.titleA}<Italic>{t.pricing.titleB}</Italic>{t.pricing.titleC}
        </SectionTitle>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-7">
          {t.pricing.tiers.map((tier, i) => {
            const highlight = i === 1;
            return (
              <div key={i}
                   className={`warm-glass reveal p-9 md:p-11 ${highlight ? 'pricing-highlight' : ''}`}
                   style={{ transitionDelay: `${i * 0.1}s`, background: highlight ? 'linear-gradient(170deg, rgba(255,248,232,0.85), rgba(255,255,255,0.55))' : undefined }}>
                {highlight && (
                  <div className="absolute -top-3 left-9 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.22em]"
                       style={{ background: 'var(--gold)', color: 'var(--parchment)' }}>
                    {t.pricing.recommended}
                  </div>
                )}
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--ink-soft)]">{tier.sub}</div>
                <h3 className="mt-2 font-display text-3xl md:text-4xl text-[var(--ink)]" style={{ fontWeight: 500 }}>{tier.name}</h3>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-display text-5xl" style={{ color: highlight ? 'var(--gold-warm)' : 'var(--ink)', fontWeight: 400 }}>{tier.price}</span>
                  {tier.priceSub && <span className="text-[var(--ink-soft)] text-lg">{tier.priceSub}</span>}
                </div>
                {tier.altPrice && (
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-soft)]">{tier.altPrice}</div>
                )}
                <ul className="mt-8 space-y-3.5">
                  {tier.features.map((f, fi) => (
                    <li key={fi} className="flex gap-3 text-[var(--ink)] leading-relaxed">
                      <span className="text-[var(--gold)] shrink-0 mt-0.5">✦</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-9">
                  {highlight
                    ? <a href="#" className="btn-gold w-full justify-center">{tier.cta} <ArrowRight size={14} /></a>
                    : <a href="#" className="btn-ghost w-full justify-center">{tier.cta} <ArrowRight size={14} /></a>}
                </div>
              </div>
            );
          })}
        </div>

        <p className="reveal mt-12 text-center font-mono text-xs uppercase tracking-[0.22em] text-[var(--ink-soft)]">
          {t.pricing.footnoteA}<span style={{ color: 'var(--gold-warm)' }}>{t.pricing.footnoteB}</span>
        </p>
      </div>
    </section>
  );
}

/* ── 9 · Footer ──────────────────────────────────────────────── */
function Footer() {
  const { t } = useT();
  const reduced = usePrefersReducedMotion();

  // ambient drifting glyphs
  const motes = useMemo(() => {
    const glyphs = ['✦', '⊹', '·', '❋', '✦', '⊹', '·'];
    return Array.from({ length: 18 }).map((_, i) => ({
      ch: glyphs[i % glyphs.length],
      left: Math.random() * 100,
      top: Math.random() * 100,
      dx: (Math.random() - 0.5) * 80,
      dy: -(20 + Math.random() * 50),
      size: 8 + Math.random() * 14,
      dur: 20 + Math.random() * 26,
      delay: -Math.random() * 30,
      maxOp: 0.18 + Math.random() * 0.32,
    }));
  }, []);

  // route mapping for footer columns: [col][linkIndex] → hash route
  const footerRoutes = [
    ['#/vault', '#/inscribe', '#/chapters', '#/shared', '#/settings'],
    ['#/keepers', '#/activity', '#/manifesto', null],
    [null, null, null, null],
  ];

  return (
    <footer
      className="reveal liquid-glass w-full rounded-3xl text-[var(--ink-soft)] mt-24 md:mt-40 mx-4 md:mx-8 mb-8 footer-shell"
      style={{ background: 'linear-gradient(170deg, rgba(255,255,255,0.55) 0%, rgba(168,208,216,0.28) 100%)' }}
    >
      {/* Ambient aurora behind everything */}
      <div className="footer-aurora" aria-hidden="true" />

      {/* Floating glyphs (skip on reduced-motion) */}
      {!reduced && (
        <div className="footer-motes" aria-hidden="true">
          {motes.map((m, i) => (
            <span
              key={i}
              className="footer-mote"
              style={{
                left: `${m.left}%`,
                top: `${m.top}%`,
                fontSize: `${m.size}px`,
                '--dx': `${m.dx}px`,
                '--dy': `${m.dy}px`,
                '--dur': `${m.dur}s`,
                '--delay': `${m.delay}s`,
                '--max-op': m.maxOp,
              }}
            >
              {m.ch}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="footer-sigil inline-flex">
                <Sigil size={40} />
              </span>
              <span
                className="font-display text-xl footer-wordmark"
                style={{ fontWeight: 500, color: 'var(--ink)', letterSpacing: '0.12em' }}
              >
                GRIMOIRE
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm text-[var(--ink-soft)]">{t.footer.desc}</p>

            {/* Subtle "✦ forever" mark with breath */}
            <div
              className="footer-forever mt-7 inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--ink-soft)]"
            >
              <span className="footer-spark">✦</span>
              <span>{t.footer.foreverLine}</span>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {t.footer.cols.map((col, ci) => (
              <div key={col.t}>
                <div className="text-sm uppercase tracking-wider text-[var(--ink)] font-medium mb-4">{col.t}</div>
                <ul className="space-y-2.5">
                  {col.l.map((l, li) => (
                    <li key={l}>
                      <a
                        href={footerRoutes[ci] && footerRoutes[ci][li] ? footerRoutes[ci][li] : '#'}
                        className="footer-link text-sm text-[var(--ink-soft)] transition-colors"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-[color-mix(in_srgb,var(--ink)_10%,transparent)] flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          <p className="text-[10px] uppercase tracking-widest opacity-50">{t.footer.copy}</p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest opacity-50">{t.footer.stay}</span>
            <div className="flex items-center gap-3">
              {[
                { Icon: XLogo, href: 'https://x.com/kl0ren' },
                { Icon: Github, href: 'https://github.com/klorenn' },
                { Icon: Telegram, href: 'https://t.me/pau_koh' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social opacity-60 transition-all"
                  style={{ '--i': i }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Navbar, Hero, Problem, Solution, Features, Compare, Science, Testimonials, Pricing, Footer, usePrefersReducedMotion, useReveal };
