import React, { useState, useEffect } from 'react';
import { LangProvider, useT } from './i18n.jsx';
import { useReveal, Navbar, Hero, Problem, Solution, Features, Compare, Science, Testimonials, Pricing, Footer } from './sections.jsx';
import { ScreenVault } from './screen-vault.jsx';
import { ScreenInscribe } from './screen-inscribe.jsx';
import { ScreenChapters } from './screen-chapters.jsx';
import { ScreenShared } from './screen-shared.jsx';
import { ScreenKeepers } from './screen-keepers.jsx';
import { ScreenActivity } from './screen-activity.jsx';
import { ScreenSettings } from './screen-settings.jsx';
import { ScreenDisconnect } from './screen-disconnect.jsx';
import { ScreenProof } from './screen-proof.jsx';
import { ScreenMigrate } from './screen-migrate.jsx';
// Legacy screens — kept for footer links
import { ScreenKeep } from './screen-keep.jsx';
import { ScreenInheritance } from './screen-inheritance.jsx';
import { ScreenHeirs } from './screen-heirs.jsx';
import { ScreenRecovery } from './screen-recovery.jsx';
import { ScreenManifesto } from './screen-manifesto.jsx';

const APARTADOS = {
  vault: 'vault',
  inscribe: 'inscribe',
  chapters: 'chapters',
  shared: 'shared',
  keepers: 'keepers',
  activity: 'activity',
  settings: 'settings',
  disconnect: 'disconnect',
  proof: 'proof',
  migrate: 'migrate',
  keep: 'keep',
  inheritance: 'inheritance',
  heirs: 'heirs',
  recovery: 'recovery',
  manifesto: 'manifesto',
};

function useHash() {
  const [hash, setHash] = useState(() => {
    const h = window.location.hash.replace('#/', '');
    return APARTADOS[h] || '';
  });
  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace('#/', '');
      setHash(APARTADOS[h] || '');
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return hash;
}

function Landing() {
  const { lang } = useT();
  useReveal(lang);
  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <Compare />
      <Science />
      <Testimonials />
      <Pricing />
      <Footer />
    </main>
  );
}

function AppContent() {
  const hash = useHash();
  switch (hash) {
    case 'vault':       return <ScreenVault />;
    case 'inscribe':    return <ScreenInscribe />;
    case 'chapters':    return <ScreenChapters />;
    case 'shared':      return <ScreenShared />;
    case 'keepers':     return <ScreenKeepers />;
    case 'activity':    return <ScreenActivity />;
    case 'settings':    return <ScreenSettings />;
    case 'disconnect':  return <ScreenDisconnect />;
    case 'proof':       return <ScreenProof />;
    case 'migrate':     return <ScreenMigrate />;
    case 'keep':        return <ScreenKeep />;
    case 'inheritance': return <ScreenInheritance />;
    case 'heirs':       return <ScreenHeirs />;
    case 'recovery':    return <ScreenRecovery />;
    case 'manifesto':   return <ScreenManifesto />;
    default:            return <Landing />;
  }
}

export function App() {
  return (
    <LangProvider>
      <AppContent />
    </LangProvider>
  );
}
