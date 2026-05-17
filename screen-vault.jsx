import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { AppShell, PageHead } from './shell.jsx';
import { IconSeed, IconKey, IconLetter, IconDocument, IconLedger, IconNote } from './icons.jsx';
import { getGatewayUrl } from './src/lib/lighthouse.js';
import { InscribeForm } from './src/components/InscribeForm.jsx';
import { RevealModal } from './src/components/RevealModal.jsx';
import { CONTRACT_ADDRESS } from './src/config.js';
import { useT } from './i18n.jsx';
import { readContract } from '@wagmi/core';
import { config } from './src/config.js';

const ABI = [
  { inputs: [], name: 'getMyInscriptions', outputs: [{ components: [{ name: 'owner', type: 'address' }, { name: 'cid', type: 'string' }, { name: 'kind', type: 'string' }, { name: 'titleHash', type: 'string' }, { name: 'createdAt', type: 'uint256' }], name: '', type: 'tuple[]' }], stateMutability: 'view', type: 'function' },
];

const INS_ICONS = {
  'seed-phrase': <IconSeed />,
  'private-key': <IconKey />,
  'letter': <IconLetter />,
  'document': <IconDocument />,
  'note': <IconNote />,
  'ledger': <IconLedger />,
};

function ScreenVault() {
  const { isConnected, address } = useAccount();
  const { t } = useT();
  const v = t.vault;
  const [showForm, setShowForm] = useState(false);
  const [reveal, setReveal] = useState(null);
  const [inscriptions, setInscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  async function loadInscriptions() {
    if (!isConnected || !address) return;
    setLoading(true);
    try {
      const data = await readContract(config, {
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: 'getMyInscriptions',
        account: address,
      });
      setInscriptions(data || []);
    } catch (e) {
      console.error('Failed to load:', e);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (isConnected && address) loadInscriptions();
  }, [isConnected, address]);

  const filtered = search
    ? inscriptions.filter(ins => ins.kind.toLowerCase().includes(search.toLowerCase()))
    : inscriptions;

  // Countdown helper
  function Countdown({ unlockAt }) {
    const [now, setNow] = useState(Date.now());
    React.useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
    if (!unlockAt || Number(unlockAt) === 0) return null;
    const unlockMs = Number(unlockAt) * 1000;
    if (now >= unlockMs) return <span className="chip grass" style={{ fontSize: '0.68rem' }}>✦ unlocked</span>;
    const diff = unlockMs - now;
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    return <span className="chip gold" style={{ fontSize: '0.68rem' }}>⏳ {days}d {hours}h</span>;
  }

  const kindLabel = (k) => {
    const labels = { 'seed-phrase': 'Seed phrase', 'private-key': 'Private key', 'document': 'Document', 'letter': 'Letter', 'note': 'Note' };
    return labels[k] || k;
  };

  const formatDate = (ts) => {
    const d = new Date(Number(ts) * 1000);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <AppShell active="vault" crumbs={['HOME', 'OPEN GRIMOIRE']}>
      <PageHead
        eyebrow={isConnected ? v.eyebrowConnected : v.eyebrow}
        title={isConnected ? v.welcomeBack : v.welcome}
        sub={isConnected ? v.sub : v.subDisconnected}
        actions={isConnected ? (
          <>
            <button className="app-btn ghost" onClick={loadInscriptions}>{v.refresh}</button>
            <button className="app-btn gold" onClick={() => setShowForm(!showForm)}>
              {showForm ? v.closeForm : v.newInscription}
            </button>
          </>
        ) : null}
      />

      {showForm && (
        <InscribeForm onClose={() => setShowForm(false)} onSuccess={() => { setShowForm(false); loadInscriptions(); }} />
      )}

      {/* Vault status banner */}
      <section className="app-card" style={{ padding: '18px 22px', display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: 0, alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 22 }}>✦</span>
          <div>
            <div className="kv-key">vault state</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--ink)', fontWeight: 500 }}>
              {isConnected ? 'Active · onchain' : 'Wallet not connected'}
            </div>
          </div>
        </div>
        <StatBlock k="Inscriptions" v={String(inscriptions.length)} sub="onchain" />
        <StatBlock k="Locked" v={String(inscriptions.filter(ins => ins.unlockAt && Number(ins.unlockAt) * 1000 > Date.now()).length)} sub="time-locked" />
        <StatBlock k="Encryption" v="AES-256" sub="client-side" />
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 18, marginTop: 18 }}>
        <section className="app-card" style={{ overflow: 'hidden' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px 12px' }}>
            <div>
              <div className="kv-key">the collection</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--ink)', fontWeight: 500, marginTop: 2 }}>Your inscriptions</h2>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ padding: '4px 10px', borderRadius: 8, border: '1px solid color-mix(in srgb, var(--ink) 12%, transparent)', background: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--ink)', outline: 'none', width: 140 }}
              />
              <button className="chip">all · {inscriptions.length}</button>
            </div>
          </header>

          {!isConnected ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--ink-soft)' }}>
              Connect your wallet to view your inscriptions.
            </div>
          ) : loading ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--ink-soft)' }}>
              Loading inscriptions...
            </div>
          ) : inscriptions.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--ink-soft)' }}>
              <p>No inscriptions yet.</p>
              <button className="app-btn gold" style={{ marginTop: 12 }} onClick={() => setShowForm(true)}>
                Create your first inscription
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14, padding: '12px 20px 20px' }}>
              {[...filtered].reverse().map((ins, i) => (
                <article key={i} className="app-card" style={{ padding: 18, display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                  onClick={() => setReveal({ cid: ins.cid, kind: ins.kind })}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div className="icon-tile" style={{ width: 42, height: 42 }}>
                      <span style={{ transform: 'scale(0.6)', display: 'inline-flex' }}>{INS_ICONS[ins.kind] || <IconNote />}</span>
                    </div>
                    {ins.unlockAt && Number(ins.unlockAt) > 0 && <Countdown unlockAt={ins.unlockAt} />}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: 'var(--ink)', fontWeight: 500, lineHeight: 1.2 }}>
                    {kindLabel(ins.kind)}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--ink-soft)', marginTop: 6, flex: 1 }}>
                    {formatDate(ins.createdAt)}
                  </div>
                  <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px dashed color-mix(in srgb, var(--ink) 10%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--ink-soft)' }}>{ins.cid.slice(0, 10)}...</span>
                    <span style={{ color: 'var(--gold-warm)', fontSize: '0.78rem', fontWeight: 500 }}>Reveal →</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <section className="app-card" style={{ padding: 18 }}>
            <div className="kv-key">filecoin · proof of storage</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--ink)', marginTop: 2, fontWeight: 500 }}>Live verification</h3>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { k: 'contract', v: CONTRACT_ADDRESS === '0x0000000000000000000000000000000000000000' ? 'not deployed' : `${CONTRACT_ADDRESS.slice(0, 6)}...${CONTRACT_ADDRESS.slice(-4)}` },
                { k: 'encrypt', v: 'AES-256 · client' },
                { k: 'chain', v: 'Filecoin Calibration' },
              ].map((l) => (
                <div key={l.k} style={{ display: 'grid', gridTemplateColumns: '4.6rem 1fr', gap: 8, padding: '6px 0', borderBottom: '1px dashed color-mix(in srgb, var(--ink) 10%, transparent)' }}>
                  <span className="kv-key" style={{ letterSpacing: '0.16em' }}>{l.k}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--ink)' }}>→ {l.v}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="app-card" style={{ padding: 18 }}>
            <div className="kv-key">protocol info</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--ink)', marginTop: 2, fontWeight: 500 }}>How it works</h3>
            <ul style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span className="spark-dot" style={{ marginTop: 2 }}>✦</span>
                <div style={{ fontSize: '0.85rem', color: 'var(--ink)', lineHeight: 1.45 }}>
                  Secrets are encrypted in your browser before they touch a wire.
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span className="spark-dot" style={{ marginTop: 2 }}>✦</span>
                <div style={{ fontSize: '0.85rem', color: 'var(--ink)', lineHeight: 1.45 }}>
                  Ciphertext is stored on Filecoin via Lighthouse.
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span className="spark-dot" style={{ marginTop: 2 }}>✦</span>
                <div style={{ fontSize: '0.85rem', color: 'var(--ink)', lineHeight: 1.45 }}>
                  The CID is registered onchain in GrimoireRegistry on FEVM.
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span className="spark-dot" style={{ marginTop: 2 }}>✦</span>
                <div style={{ fontSize: '0.85rem', color: 'var(--ink)', lineHeight: 1.45 }}>
                  Only your passphrase can decrypt. Not us. Not the chain. Not the protocol.
                </div>
              </li>
            </ul>
          </section>
        </aside>
      </div>

      {/* Reveal modal */}
      {reveal && (
        <RevealModal
          cid={reveal.cid}
          kind={reveal.kind}
          onClose={() => setReveal(null)}
        />
      )}
    </AppShell>
  );
}

function StatBlock({ k, v, sub }) {
  return (
    <div style={{ paddingLeft: 22, borderLeft: '1px solid color-mix(in srgb, var(--ink) 10%, transparent)' }}>
      <div className="kv-key">{k}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--ink)', fontWeight: 500, marginTop: 2, lineHeight: 1 }}>{v}</div>
      <div style={{ fontSize: '0.74rem', color: 'var(--ink-soft)', marginTop: 4 }}>{sub}</div>
    </div>
  );
}

export { ScreenVault, StatBlock };
