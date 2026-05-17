import React, { useState, useEffect } from 'react';

const ACTIONS = [
  { id: 'vault', label: 'Open Vault', keys: 'G V', action: () => { window.location.hash = '#/vault'; } },
  { id: 'inscribe', label: 'New Inscription', keys: 'N', action: () => { window.location.hash = '#/vault'; setTimeout(() => document.querySelector('.app-btn.gold')?.click(), 300); } },
  { id: 'keepers', label: 'Manage Keepers', keys: 'G K', action: () => { window.location.hash = '#/keepers'; } },
  { id: 'activity', label: 'Activity Log', keys: 'G A', action: () => { window.location.hash = '#/activity'; } },
  { id: 'settings', label: 'Settings', keys: 'G S', action: () => { window.location.hash = '#/settings'; } },
  { id: 'proof', label: 'Proof of Life', keys: 'G P', action: () => { window.location.hash = '#/proof'; } },
  { id: 'home', label: 'Landing Page', keys: 'G H', action: () => { window.location.hash = ''; } },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(o => !o);
        setQuery('');
        setSelected(0);
      }
      if (e.key === 'Escape') setOpen(false);
      if (!open) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
      if (e.key === 'Enter') { filtered[selected]?.action(); setOpen(false); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, selected]);

  const filtered = ACTIONS.filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

  if (!open) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '15vh', background: 'rgba(26,46,53,0.5)', backdropFilter: 'blur(6px)' }}
      onClick={() => setOpen(false)}>
      <div className="app-card" style={{ padding: 16, width: 420, maxHeight: '60vh', overflow: 'auto' }}
        onClick={e => e.stopPropagation()}>
        <input
          type="text"
          autoFocus
          value={query}
          onChange={e => { setQuery(e.target.value); setSelected(0); }}
          placeholder="Search actions..."
          style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid color-mix(in srgb, var(--ink) 12%, transparent)', background: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--ink)', outline: 'none', marginBottom: 8, boxSizing: 'border-box' }}
        />
        {filtered.map((a, i) => (
          <div key={a.id}
            onClick={() => { a.action(); setOpen(false); }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '8px 12px', borderRadius: 8, cursor: 'pointer',
              background: i === selected ? 'rgba(255,255,255,0.8)' : 'transparent',
            }}>
            <span style={{ fontSize: '0.88rem', color: 'var(--ink)' }}>{a.label}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)', letterSpacing: '0.1em' }}>{a.keys}</span>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: 20, textAlign: 'center', color: 'var(--ink-soft)', fontSize: '0.85rem' }}>No matching actions</div>
        )}
      </div>
    </div>
  );
}
