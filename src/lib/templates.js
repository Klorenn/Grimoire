/**
 * Grimoire Templates — Pre-built inscription starting points.
 */

export const TEMPLATES = [
  {
    id: 'letter-child',
    label: 'Letter to my child',
    kind: 'letter',
    chapter: 'Family',
    title: 'A letter for you',
    content: `My dearest,

I'm writing this because some things should survive me. Not the receipts or the calendars — those don't matter. But this does.

Here is what I want you to know:

1. You were loved from the moment I knew you existed.
2. Everything I built was for you, even when I didn't say it.
3. The money is in [wallet address / bank account / lawyer contact].
4. The house documents are with [name / location].
5. The people who will help you are: [names and contacts].

I trust you to carry forward what matters and let go of what doesn't.

With all my love,
[Your name]`,
  },
  {
    id: 'wallet-inventory',
    label: 'Wallet inventory',
    kind: 'seed-phrase',
    chapter: 'Crypto',
    title: 'My wallet inventory',
    content: '',
    note: 'Use the 12/24 word grid to enter your seed phrases. Create one inscription per wallet.',
  },
  {
    id: 'funeral',
    label: 'Funeral instructions',
    kind: 'note',
    chapter: 'Personal',
    title: 'When the time comes',
    content: `These are my wishes for when I'm no longer here.

Ceremony: [burial / cremation / celebration of life]
Location: [where]
Music: [songs that matter]
People to notify: [names and contacts]

I want to be remembered for: [what matters to you]

Don't spend too much. The money is better used by the living.

[Your name]`,
  },
  {
    id: 'emergency',
    label: 'Emergency contacts',
    kind: 'note',
    chapter: 'Personal',
    title: 'In case of emergency',
    content: `If something happens to me, contact these people immediately:

1. [Name] — [Phone] — [Relationship]
2. [Name] — [Phone] — [Relationship]
3. [Name] — [Phone] — [Relationship]

Medical information:
- Blood type: [ ]
- Allergies: [ ]
- Medications: [ ]
- Doctor: [name / phone]

Legal:
- Will location: [ ]
- Lawyer: [name / phone]
- Power of attorney: [name]`,
  },
  {
    id: 'recovery-plan',
    label: 'Recovery plan for partner',
    kind: 'note',
    chapter: 'Crypto',
    title: 'If I disappear — recovery plan',
    content: `This is how you recover what I've been managing.

1. My main wallet is: [wallet address]
2. The seed phrase is stored in: [physical location / safety deposit box]
3. The Grimoire passphrase is derived from my wallet — just connect with my wallet to decrypt.
4. Our joint accounts: [banks / exchanges]
5. Insurance policies: [companies / policy numbers]
6. Monthly bills that must be paid: [list]

You don't need to understand crypto. Just find the seed phrase. Everything else follows.

I love you.
[Your name]`,
  },
];

/** Get a template by ID */
export function getTemplate(id) {
  return TEMPLATES.find(t => t.id === id) || null;
}
