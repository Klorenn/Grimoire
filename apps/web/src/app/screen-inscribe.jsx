'use client';
import React from 'react';
import { useT } from './i18n.jsx';

function ScreenInscribe() {
  const { t } = useT();
  return (
    <div style={{ padding: 60, textAlign: 'center' }}>
      <div style={{ fontSize: 40, marginBottom: 16, color: 'var(--gold-warm)' }}>✦</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--ink)', fontWeight: 500 }}>Inscribe</h2>
      <p style={{ margin: '12px auto 0', color: 'var(--ink-soft)', fontSize: '0.95rem', maxWidth: 480 }}>Go to the Vault to create a new inscription.</p>
      <button className="app-btn gold" style={{ marginTop: 24 }} onClick={() => window.location.hash = '#/vault'}>Open your vault →</button>
    </div>
  );
}
export { ScreenInscribe };
