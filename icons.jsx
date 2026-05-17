// Icons — lucide-style strokes + custom hand-drawn Ghibli icons.

const Stroke = (props) => ({
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  ...props,
});

const Icon = ({ size = 18, children, className = '', viewBox = '0 0 24 24', style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox={viewBox}
    className={className}
    style={style}
    aria-hidden="true"
    fill="none"
  >
    {children}
  </svg>
);

/* ── Lucide-style ─────────────────────────────────────────────── */
export const XLogo = (p) => (
  <Icon {...p} viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
  </Icon>
);

export const Twitter = (p) => (
  <Icon {...p}>
    <path {...Stroke()} d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009Z"/>
  </Icon>
);

export const Github = (p) => (
  <Icon {...p}>
    <path {...Stroke()} d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path {...Stroke()} d="M9 18c-4.51 2-5-2-7-2"/>
  </Icon>
);

export const Telegram = (p) => (
  <Icon {...p} viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.66-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.41-.88.03-.24.37-.49 1.02-.74 3.98-1.73 6.63-2.87 7.96-3.42 3.79-1.58 4.58-1.85 5.09-1.86.11 0 .37.03.54.17.14.12.18.28.2.45-.01.06.01.24 0 .38z" fill="currentColor"/>
  </Icon>
);

export const MessageCircle = (p) => (
  <Icon {...p}>
    <path {...Stroke()} d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
  </Icon>
);

export const Send = (p) => (
  <Icon {...p}>
    <path {...Stroke()} d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/>
    <path {...Stroke()} d="m21.854 2.147-10.94 10.939"/>
  </Icon>
);

export const Mail = (p) => (
  <Icon {...p}>
    <path {...Stroke()} d="M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/>
    <path {...Stroke()} d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </Icon>
);

export const ArrowRight = (p) => (
  <Icon {...p}>
    <path {...Stroke()} d="M5 12h14"/>
    <path {...Stroke()} d="m12 5 7 7-7 7"/>
  </Icon>
);

/* ── Sigil — Grimoire book icon ──────────────────────────────── */
export const Sigil = ({ size = 22, className = '', style }) => (
  <img
    src="/assets/grimoire-icon.png"
    alt="Grimoire"
    width={size}
    height={size}
    className={className}
    style={{
      display: 'inline-block',
      imageRendering: 'auto',
      filter: 'drop-shadow(0 2px 8px rgba(26,46,53,0.18))',
      ...style,
    }}
  />
);

/* ── Hand-drawn Ghibli-style feature icons (gold strokes) ─────── */
const IconStrokes = { stroke: 'var(--gold-warm)', fill: 'none', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const IconFlame = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <g {...IconStrokes}>
      <path d="M24 6 c -2 6 -10 9 -10 18 a 10 10 0 0 0 20 0 c 0 -4 -3 -7 -5 -9 c -1 3 -3 4 -5 3 c 2 -3 2 -7 0 -12 z"/>
      <path d="M20 30 c 0 3 2 5 4 5 s 4 -2 4 -5" opacity=".6"/>
      <path d="M14 42 h 20" opacity=".4"/>
    </g>
  </svg>
);

export const IconDrive = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <g {...IconStrokes}>
      <rect x="8" y="14" width="32" height="20" rx="3"/>
      <circle cx="32" cy="24" r="2.5"/>
      <path d="M12 20 h 12"/>
      <path d="M12 26 h 8" opacity=".6"/>
      <path d="M8 38 l 32 0" opacity=".3"/>
      <path d="M14 6 l 4 6" opacity=".6"/>
      <path d="M22 4 l 1 7" opacity=".6"/>
    </g>
  </svg>
);

export const IconCompany = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <g {...IconStrokes}>
      <path d="M10 40 V 18 L 24 8 L 38 18 V 40"/>
      <path d="M10 40 H 38"/>
      <rect x="16" y="22" width="5" height="6"/>
      <rect x="27" y="22" width="5" height="6"/>
      <rect x="21" y="32" width="6" height="8"/>
      <path d="M6 42 H 42" opacity=".4"/>
      <path d="M28 6 c 2 2 1 4 0 5" opacity=".5"/>
    </g>
  </svg>
);

export const IconKey = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <g {...IconStrokes}>
      <circle cx="14" cy="24" r="8"/>
      <circle cx="14" cy="24" r="2.5" fill="var(--gold-warm)" stroke="none"/>
      <path d="M22 24 H 42"/>
      <path d="M34 24 V 30"/>
      <path d="M38 24 V 32"/>
    </g>
  </svg>
);

export const IconSeed = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <g {...IconStrokes}>
      <path d="M24 42 c 0 -12 6 -18 14 -20 c -2 10 -6 18 -14 20 z"/>
      <path d="M24 42 c 0 -12 -6 -18 -14 -20 c 2 10 6 18 14 20 z"/>
      <path d="M24 42 V 24"/>
      <circle cx="24" cy="8" r="3" fill="var(--gold-warm)" stroke="none" opacity=".7"/>
    </g>
  </svg>
);

export const IconDocument = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <g {...IconStrokes}>
      <path d="M12 6 H 30 L 38 14 V 42 H 12 Z"/>
      <path d="M30 6 V 14 H 38"/>
      <path d="M16 22 H 32"/>
      <path d="M16 28 H 32" opacity=".7"/>
      <path d="M16 34 H 26" opacity=".5"/>
    </g>
  </svg>
);

export const IconLedger = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <g {...IconStrokes}>
      <path d="M10 8 c 4 -2 12 -2 14 2 c 2 -4 10 -4 14 -2 V 40 c -4 -2 -12 -2 -14 2 c -2 -4 -10 -4 -14 -2 z"/>
      <path d="M24 10 V 42" opacity=".5"/>
      <path d="M14 18 h 6" opacity=".6"/>
      <path d="M14 26 h 6" opacity=".6"/>
      <path d="M28 18 h 6" opacity=".6"/>
      <path d="M28 26 h 6" opacity=".6"/>
    </g>
  </svg>
);

export const IconLetter = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <g {...IconStrokes}>
      <path d="M8 14 h 32 v 22 h -32 z"/>
      <path d="M8 14 L 24 26 L 40 14"/>
      <path d="M14 36 V 22" opacity=".4"/>
      <path d="M34 36 V 22" opacity=".4"/>
      <circle cx="24" cy="8" r="3" fill="var(--gold-warm)" stroke="none" opacity=".5"/>
    </g>
  </svg>
);

export const IconNote = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <g {...IconStrokes}>
      <path d="M10 8 h 20 l 8 8 v 24 h -28 z"/>
      <path d="M16 18 h 10" opacity=".7"/>
      <path d="M16 24 h 16" opacity=".7"/>
      <path d="M16 30 h 16" opacity=".5"/>
      <path d="M16 36 h 8" opacity=".4"/>
      <path d="M34 6 l 2 2 -10 10 -3 1 1 -3 z"/>
    </g>
  </svg>
);

/* ── Brush-stroke flow diagram pieces ─────────────────────────── */
export const BrushArrow = ({ width = 60, className = '', delay = 0 }) => (
  <svg width={width} height="28" viewBox="0 0 60 28" className={className} aria-hidden="true" style={{ '--reveal-delay': `${delay}s` }}>
    <defs>
      <linearGradient id={`bg-${delay}`} x1="0" x2="1">
        <stop offset="0%" stopColor="var(--gold-warm)" stopOpacity=".0"/>
        <stop offset="40%" stopColor="var(--gold-warm)" stopOpacity=".9"/>
        <stop offset="100%" stopColor="var(--gold-warm)" stopOpacity=".9"/>
      </linearGradient>
    </defs>
    <path
      d="M2 14 C 14 9, 22 19, 34 12 C 44 7, 50 16, 56 12"
      stroke={`url(#bg-${delay})`}
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    <path d="M52 7 L 58 12 L 52 18" stroke="var(--gold-warm)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const BrushNode = ({ children, accent = false }) => (
  <div
    className="relative flex flex-col items-center gap-2"
    style={{ minWidth: '6.5rem' }}
  >
    <div className={`relative w-20 h-20 rounded-full flex items-center justify-center ${accent ? '' : ''}`}
      style={{
        background: accent
          ? 'radial-gradient(circle at 30% 30%, rgba(232,168,71,0.32), rgba(232,168,71,0.08) 70%)'
          : 'radial-gradient(circle at 30% 30%, rgba(168,208,216,0.55), rgba(168,208,216,0.18) 70%)',
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.6), 0 6px 18px -10px rgba(26,46,53,0.25)',
      }}
    >
      {children}
    </div>
  </div>
);

export const NodeWallet = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" aria-hidden="true">
    <g {...IconStrokes}>
      <path d="M8 14 c 0 -3 2 -5 5 -5 h 22 c 2 0 4 1 5 3 H 13 c -3 0 -5 2 -5 5 z"/>
      <rect x="8" y="14" width="32" height="24" rx="3"/>
      <circle cx="32" cy="26" r="2" fill="var(--gold-warm)" stroke="none"/>
    </g>
  </svg>
);

export const NodeFilecoin = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" aria-hidden="true">
    <g {...IconStrokes}>
      <circle cx="24" cy="24" r="14"/>
      <path d="M18 18 h 12"/>
      <path d="M16 24 h 12"/>
      <path d="M22 12 l -3 24" opacity=".6"/>
      <path d="M28 12 l -3 24" opacity=".6"/>
    </g>
  </svg>
);

export const NodeChain = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" aria-hidden="true">
    <g {...IconStrokes}>
      <rect x="6" y="18" width="14" height="14" rx="2"/>
      <rect x="28" y="18" width="14" height="14" rx="2"/>
      <path d="M20 25 h 8"/>
      <path d="M13 18 V 12"/>
      <path d="M13 32 V 38"/>
      <path d="M35 18 V 12"/>
      <path d="M35 32 V 38"/>
    </g>
  </svg>
);
