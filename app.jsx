import React, { useState, useEffect } from 'react';
import { LangProvider, useT } from './i18n.jsx';
import { useReveal, Navbar, Hero, Problem, Solution, Features, Compare, Science, Testimonials, Pricing, Footer } from './sections.jsx';
import { ScreenVault } from './screen-vault.jsx';
import { ScreenKeep } from './screen-keep.jsx';
import { ScreenInheritance } from './screen-inheritance.jsx';
import { ScreenHeirs } from './screen-heirs.jsx';
import { ScreenRecovery } from './screen-recovery.jsx';
import { ScreenManifesto } from './screen-manifesto.jsx';

const APARTADOS = {
  vault: 'vault',
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
