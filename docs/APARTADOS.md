# Grimoire — Apartados (Screens Guide)

## Overview

Grimoire uses hash-based routing (`#/route`). The landing page is at `/`. All authenticated screens are under hash routes and use the `AppShell` layout (sidebar + topbar + main content).

## Sidebar Structure

| Group | Screen | Route | Status |
|-------|--------|-------|--------|
| Your Grimoire | Vault | `#/vault` | ✅ Live |
| Your Grimoire | Inscribe | `#/inscribe` | ✅ Live |
| Your Grimoire | Chapters | `#/chapters` | 🔲 Phase 2 |
| Trust & people | Shared | `#/shared` | 🔲 Phase 3 |
| Trust & people | Keepers | `#/keepers` | ✅ Live |
| Trust & people | Activity | `#/activity` | ✅ Live |
| Account | Settings | `#/settings` | ✅ Live |
| Account | Disconnect | `#/disconnect` | ✅ Live |

Plus legacy routes (accessible via footer links):
- `#/keep` — What to Keep (Phase 2)
- `#/inheritance` — Inheritance (Phase 3)
- `#/heirs` — Heir Settings (Phase 3)
- `#/recovery` — Recovery Guide (EN/ES)
- `#/manifesto` — Manifesto (EN/ES)
- `#/proof` — Public proof-of-life page

---

## Screen Details

### Vault (`#/vault`)

**Purpose:** Main dashboard. Shows all inscriptions from the contract, with search, filter, create, and reveal.

**States:**
- **Disconnected:** "Connect your wallet to open the grimoire"
- **Connected, empty:** "No inscriptions yet. Create your first inscription"
- **Connected, with inscriptions:** Table with kind, chapter, CID, created date, locked status, Reveal button

**Features:**
- Real-time inscription list from `getMyInscriptions()` on FEVM
- Search/filter by kind
- Countdown timer for time-locked inscriptions (⏳ Xd Xh)
- Locked vs unlocked counter in status banner
- "New inscription" button opens InscribeForm modal
- "Reveal" button opens RevealModal per inscription
- Auto-refresh after inscription creation

**Components used:** `AppShell`, `PageHead`, `InscribeForm`, `RevealModal`, `useReadContract`, `useAccount`

---

### Inscribe (`#/inscribe`)

**Purpose:** Landing page for inscription creation. Redirects to Vault's form.

Currently shows a simple redirect card. The actual inscription form lives in `InscribeForm.jsx` and is opened from the Vault.

---

### InscribeForm (Modal)

**Purpose:** Create a new inscription.

**Form fields:**
- Title (text, autoComplete=off)
- Kind selector (chips): Seed Phrase, Private Key, Document, Letter, Note
- Chapter (optional text)
- Template selector (5 pre-built templates)
- Content: textarea OR 12/24-word seed grid OR file upload (PDF/images)
- Time-lock date picker (optional)
- No passphrase (wallet signature used instead)

**Flow:**
1. User fills form
2. Clicks "Sign & ✦ Inscribe"
3. Wallet prompts to sign deterministic message
4. 5-step progress: Signing → Hashing → Encrypting → Uploading to Filecoin → Registering onchain
5. Polling for tx confirmation (3s intervals, max 3min)
6. Success screen with CID and tx hash
7. "Close" refreshes vault, "+ New" creates another

**Templates:**
1. Letter to my child
2. Wallet inventory
3. Funeral instructions
4. Emergency contacts
5. Recovery plan for partner

**Security:** Secret and signature never leave browser. Encrypted before upload.

---

### Chapters (`#/chapters`)

**Purpose:** Organize inscriptions by folder. Chapters are created automatically when assigned during inscription creation.

**Status:** Phase 2 — UI shows empty state with explanation. Chapter data is stored in encrypted metadata.

---

### Keepers (`#/keepers`)

**Purpose:** Configure heirs who can claim the grimoire if the owner goes dormant.

**Features:**
- Add up to 3 heir wallet addresses
- Set threshold (M-of-N required to claim)
- Set dormancy period (3 months / 6 months / 1 year / 2 years)
- Live formula display: "After X of silence, Y of Z heirs can claim"
- Save to contract via `configureHeirs()`
- Proof-of-life section with vault link

**Contract:** `configureHeirs(address[] heirs, uint8 threshold, uint256 dormancyPeriod)`

---

### Shared (`#/shared`)

**Purpose:** Time-limited access grants for specific inscriptions.

**Status:** Phase 3 — Shows empty states for "Active grants" and "Shared with me". Architecture ready for ECIES key escrow.

---

### Activity (`#/activity`)

**Purpose:** Onchain event log filtered by connected wallet.

**Features:**
- Reads `InscriptionCreated`, `HeirsConfigured`, `Pinged` events from contract
- Uses `publicClient.getLogs()` with event ABI
- Sorted by date (newest first)
- Shows event type, kind, date, time
- Refresh button

**Events displayed:**
- ✦ Inscribed [kind] — with date
- ✦ Heirs configured
- ✦ Pinged — proof of life

---

### Settings (`#/settings`)

**Purpose:** Configure grimoire preferences.

**Features:**
- Language toggle: English / Español (persisted to localStorage)
- Network info: Filecoin Calibration, chain ID, RPC, contract address
- Encryption info: wallet-signature derivation, AES-256-GCM

---

### Disconnect (`#/disconnect`)

**Purpose:** Disconnect wallet from the grimoire.

**Features:**
- Disconnect button that calls `disconnect()` from wagmi
- Redirects to landing page after disconnect
- Reassuring message: inscriptions stay on Filecoin

---

### Proof (`#/proof`)

**Purpose:** Public proof-of-life page. Shows a wallet has inscriptions without revealing content.

**Features:**
- Shows connected wallet address
- "Verify onchain" button calls `getInscriptions(address)`
- Displays count: "X inscriptions — Stored on Filecoin · Anchored on FEVM"
- "No content is revealed. This is a proof of existence only."
- Can be shared with heirs as a heartbeat indicator

---

### Recovery Guide (`#/recovery`)

**Purpose:** 4-step guide for recovering access to the grimoire.

**Content:** Re-derive wallet → Visit recovery sigil → Sign message → Grimoire returns. Fully translated EN/ES.

---

### Manifesto (`#/manifesto`)

**Purpose:** The Order of Keepers manifesto. Full literary text with drop caps, section dividers, block quotes.

**Content:** On the quiet keeping of precious things. Math-based ownership, what should be kept, inheritance, gentle warning. Fully translated EN/ES.

---

## Landing Page Sections

The landing page (`/`) contains 9 sections + Navbar + Footer:

1. **Navbar** — Fixed top, transparent → glass on scroll. Wallet connect, lang toggle.
2. **Hero** — Full-bleed video, headline reveal, CTA button.
3. **Problem** — "Paper burns. Drives fail. Companies fade." Cards + visuals.
4. **Solution** — Flow diagram: wallet → encrypt → Filecoin → CID → onchain.
5. **Features** — 3×2 grid of inscription types.
6. **Compare** — Table: iCloud vs Notion vs Hardware wallet vs Grimoire.
7. **Science** — Encryption, storage, onchain explainer. Terminal proof block.
8. **Testimonials** — 3 quotes from pseudonymous keepers.
9. **Pricing** — Free (Apprentice) + $12/mo (Keeper) tiers.
10. **Footer** — Links, social (X, GitHub, Telegram), brand.

All sections support EN/ES via `useT()` and `LangProvider`.
