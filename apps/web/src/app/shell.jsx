'use client';
import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useT } from './i18n.jsx';

/* Local sigil */
const ASigil = ({ size = 28, className = '', style }) => (
  <img src="assets/grimoire-icon.png" alt="Grimoire" width={size} height={size} className={className} style={{ display: 'block', imageRendering: 'auto', ...style }} />
);

/* ── Tiny inline icons for navigation ────────────────────────── */
const NavStroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
const NIcon = ({ children, size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">{children}</svg>;
const NavBook = () => <NIcon><path {...NavStroke} d="M5 4h10a3 3 0 0 1 3 3v13H7a2 2 0 0 1-2-2z"/><path {...NavStroke} d="M5 4v14a2 2 0 0 0 2 2h11"/><path {...NavStroke} d="M8 8h6M8 12h6" opacity=".7"/></NIcon>;
const NavLibrary = () => <NIcon><path {...NavStroke} d="M4 4h4v16H4zM10 4h4v16h-4zM16 6l3 1-3 14-2-1z"/></NIcon>;
const NavHeart = () => <NIcon><path {...NavStroke} d="M12 20s-7-4.35-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.65-9 9-9 9z"/></NIcon>;
const NavUsers = () => <NIcon><circle {...NavStroke} cx="9" cy="8" r="3.2"/><path {...NavStroke} d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle {...NavStroke} cx="17" cy="8" r="2.5" opacity=".7"/><path {...NavStroke} d="M15 14.5c2-.5 4 0 5 1.7" opacity=".7"/></NIcon>;
const NavCompass = () => <NIcon><circle {...NavStroke} cx="12" cy="12" r="9"/><path {...NavStroke} d="m9 15 1.5-5.5L16 8l-1.5 5.5z"/></NIcon>;
const NavScroll = () => <NIcon><path {...NavStroke} d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4z"/><path {...NavStroke} d="M6 4a2 2 0 1 0 0 4h2"/><path {...NavStroke} d="M10 9h6M10 13h6M10 17h4" opacity=".7"/></NIcon>;
const NavSettings = () => <NIcon><circle {...NavStroke} cx="12" cy="12" r="3"/><path {...NavStroke} d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1A1.7 1.7 0 0 0 4.6 9 1.7 1.7 0 0 0 4.3 7.2l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></NIcon>;
const NavBell = () => <NIcon><path {...NavStroke} d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path {...NavStroke} d="M10 21a2 2 0 0 0 4 0"/></NIcon>;
const NavSearch = () => <NIcon size={16}><circle {...NavStroke} cx="11" cy="11" r="6"/><path {...NavStroke} d="m20 20-3.5-3.5"/></NIcon>;
const NavCog = () => NavSettings();
const NavPlus = () => <NIcon><path {...NavStroke} d="M12 5v14M5 12h14"/></NIcon>;
const NavShare = () => <NIcon><circle {...NavStroke} cx="5" cy="12" r="2.5"/><circle {...NavStroke} cx="18" cy="6" r="2.5"/><circle {...NavStroke} cx="18" cy="18" r="2.5"/><path {...NavStroke} d="m7.5 11 8-4M7.5 13l8 4"/></NIcon>;
const NavActivity = () => <NIcon><path {...NavStroke} d="M3 12h4l3-9 4 18 3-9h4"/></NIcon>;
const NavExit = () => <NIcon><path {...NavStroke} d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></NIcon>;

/* ── i18n labels for navigation ──────────────────────────────── */
const SHELL_STRINGS = {
  en: {
    home: 'HOME',
    vault: 'Vault',
    inscribe: 'Inscribe',
    chapters: 'Chapters',
    shared: 'Shared',
    keepers: 'Keepers',
    activity: 'Activity',
    settings: 'Settings',
    disconnect: 'Disconnect',
    yourGrimoire: 'Your Grimoire',
    trust: 'Trust & people',
    account: 'Account',
    search: 'Search the grimoire…',
    vaultStatus: 'Filecoin Calibration',
    vaultStatusLabel: '✦ vault status',
    vaultMeta: 'FEVM · onchain',
  },
  es: {
    home: 'INICIO',
    vault: 'Bóveda',
    inscribe: 'Inscribir',
    chapters: 'Capítulos',
    shared: 'Compartido',
    keepers: 'Guardianes',
    activity: 'Actividad',
    settings: 'Ajustes',
    disconnect: 'Desconectar',
    yourGrimoire: 'Tu grimorio',
    trust: 'Confianza',
    account: 'Cuenta',
    search: 'Buscar en el grimorio…',
    vaultStatus: 'Filecoin Calibration',
    vaultStatusLabel: '✦ estado del vault',
    vaultMeta: 'FEVM · onchain',
  },
};

/* ── Top bar ─────────────────────────────────────────────────── */
function TopBar({ crumbs = [] }) {
  const { lang } = useT();
  const s = SHELL_STRINGS[lang] || SHELL_STRINGS.en;
  return (
    <header className="shell-top">
      <div className="shell-brand">
        <a href="#" className="shell-brand-mark" onClick={(e) => { e.preventDefault(); window.location.hash = ''; }}><ASigil size={32} /></a>
        <a href="#" style={{ textDecoration: 'none' }} className="shell-brand-word" onClick={(e) => { e.preventDefault(); window.location.hash = ''; }}>GRIMOIRE</a>
        <span className="shell-crumbs" style={{ marginLeft: 16 }}>
          {crumbs.map((c, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="sep">›</span>}
              <span className={i === crumbs.length - 1 ? 'now' : ''}>{c}</span>
            </React.Fragment>
          ))}
        </span>
      </div>
      <div className="shell-search">
        <NavSearch />
        <input placeholder={s.search} />
        <span className="kbd">⌘ K</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button className="shell-icon-btn" aria-label="Notifications"><NavBell /></button>
        <button className="shell-icon-btn" aria-label="Settings"><NavCog /></button>
        <ConnectButton.Custom>
          {({ account, chain, openConnectModal, openAccountModal, mounted }) => {
            const connected = mounted && account && chain;
            return (
              <div className="shell-wallet" onClick={connected ? openAccountModal : openConnectModal} style={{ cursor: 'pointer' }}>
                <span className={`dot ${connected ? '' : 'gone'}`} />
                <span className="ens">{connected ? (account.ensName || `${account.address.slice(0, 6)}…${account.address.slice(-4)}`) : 'Not connected'}</span>
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </header>
  );
}

/* ── Sidebar ─────────────────────────────────────────────────── */
function SideBar({ active }) {
  const { lang } = useT();
  const s = SHELL_STRINGS[lang] || SHELL_STRINGS.en;

  const NAV_PRIMARY = [
    { id: 'vault',    label: s.vault,     icon: <NavBook /> },
    { id: 'inscribe', label: s.inscribe,  icon: <NavPlus /> },
    { id: 'chapters', label: s.chapters,  icon: <NavLibrary /> },
  ];
  const NAV_TRUST = [
    { id: 'shared',   label: s.shared,    icon: <NavShare /> },
    { id: 'keepers',  label: s.keepers,   icon: <NavUsers /> },
    { id: 'activity', label: s.activity,  icon: <NavActivity /> },
  ];
  const NAV_ACCOUNT = [
    { id: 'settings',    label: s.settings,    icon: <NavSettings /> },
    { id: 'disconnect',  label: s.disconnect,  icon: <NavExit /> },
  ];

  const navigate = (id) => { window.location.hash = '#/' + id; };
  const renderItem = (it) => (
    <div key={it.id} className={`rail-item ${active === it.id ? 'active' : ''}`} onClick={() => navigate(it.id)}>
      <span className="icon">{it.icon}</span><span>{it.label}</span>
    </div>
  );

  return (
    <aside className="shell-rail">
      <div className="rail-section-label">{s.yourGrimoire}</div>
      <nav className="rail-nav">{NAV_PRIMARY.map(renderItem)}</nav>
      <div className="rail-section-label">{s.trust}</div>
      <nav className="rail-nav">{NAV_TRUST.map(renderItem)}</nav>
      <div className="rail-section-label">{s.account}</div>
      <nav className="rail-nav">{NAV_ACCOUNT.map(renderItem)}</nav>
      <div className="rail-status">
        <div className="tag">{s.vaultStatusLabel}</div>
        <div className="head">{s.vaultStatus}</div>
        <div className="meta"><span className="dot" /><span>{s.vaultMeta}</span></div>
      </div>
    </aside>
  );
}

/* ── App shell composer ──────────────────────────────────────── */
function AppShell({ active, crumbs, children, mainPadding }) {
  return (
    <div className="app-shell">
      <TopBar crumbs={crumbs} />
      <SideBar active={active} />
      <main className="shell-main" style={mainPadding ? { padding: mainPadding } : undefined}>
        {children}
      </main>
    </div>
  );
}

function PageHead({ eyebrow, title, sub, actions }) {
  return (
    <div className="page-head">
      <div>
        {eyebrow && <div className="eyebrow"><span className="apartado-spark" style={{ marginRight: 6 }}>✦</span>{eyebrow}</div>}
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        {sub && <p className="sub">{sub}</p>}
      </div>
      {actions && <div style={{ display: 'flex', gap: 10 }}>{actions}</div>}
    </div>
  );
}

export { ASigil, AppShell, TopBar, SideBar, PageHead, NavBook, NavLibrary, NavHeart, NavUsers, NavCompass, NavScroll, NavSettings, NavSearch, NavBell, NavCog, NavPlus, NavShare, NavActivity, NavExit };
