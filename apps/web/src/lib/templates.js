/**
 * Grimoire Templates — Pre-built inscription starting points.
 * Supports EN and ES.
 */

const TEMPLATES_EN = [
  {
    id: 'letter-child',
    label: 'Letter to my child',
    label_es: 'Carta para mi hijo/a',
    kind: 'letter',
    chapter: 'Family',
    title: 'A letter for you',
    title_es: 'Una carta para ti',
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
    content_es: `Mi amor,

Escribo esto porque algunas cosas deben sobrevivirme. No los recibos ni los calendarios — esos no importan. Pero esto sí.

Esto es lo que quiero que sepas:

1. Fuiste amado/a desde el momento en que supe que existías.
2. Todo lo que construí fue para ti, incluso cuando no lo dije.
3. El dinero está en [dirección de wallet / cuenta bancaria / contacto del abogado].
4. Los documentos de la casa están con [nombre / ubicación].
5. Las personas que te ayudarán son: [nombres y contactos].

Confío en que llevarás adelante lo que importa y dejarás ir lo que no.

Con todo mi amor,
[Tu nombre]`,
  },
  {
    id: 'wallet-inventory',
    label: 'Wallet inventory',
    label_es: 'Inventario de wallets',
    kind: 'seed-phrase',
    chapter: 'Crypto',
    title: 'My wallet inventory',
    title_es: 'Mi inventario de wallets',
    content: '',
    note: 'Use the 12/24 word grid to enter your seed phrases.',
    note_es: 'Usa la cuadrícula de 12/24 palabras para ingresar tus frases semilla.',
  },
  {
    id: 'funeral',
    label: 'Funeral instructions',
    label_es: 'Instrucciones para mi funeral',
    kind: 'note',
    chapter: 'Personal',
    title: 'When the time comes',
    title_es: 'Cuando llegue el momento',
    content: `These are my wishes for when I'm no longer here.

Ceremony: [burial / cremation / celebration of life]
Location: [where]
Music: [songs that matter]
People to notify: [names and contacts]

I want to be remembered for: [what matters to you]

Don't spend too much. The money is better used by the living.

[Your name]`,
    content_es: `Estos son mis deseos para cuando ya no esté.

Ceremonia: [enti erro / cremación / celebración de vida]
Lugar: [dónde]
Música: [canciones que importan]
Personas a notificar: [nombres y contactos]

Quiero ser recordado/a por: [lo que te importa]

No gastes demasiado. El dinero es mejor usado por los vivos.

[Tu nombre]`,
  },
  {
    id: 'emergency',
    label: 'Emergency contacts',
    label_es: 'Contactos de emergencia',
    kind: 'note',
    chapter: 'Personal',
    title: 'In case of emergency',
    title_es: 'En caso de emergencia',
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
    content_es: `Si algo me pasa, contacta a estas personas inmediatamente:

1. [Nombre] — [Teléfono] — [Relación]
2. [Nombre] — [Teléfono] — [Relación]
3. [Nombre] — [Teléfono] — [Relación]

Información médica:
- Tipo de sangre: [ ]
- Alergias: [ ]
- Medicamentos: [ ]
- Doctor/a: [nombre / teléfono]

Legal:
- Ubicación del testamento: [ ]
- Abogado/a: [nombre / teléfono]
- Poder notarial: [nombre]`,
  },
  {
    id: 'recovery-plan',
    label: 'Recovery plan for partner',
    label_es: 'Plan de recuperación para mi pareja',
    kind: 'note',
    chapter: 'Crypto',
    title: 'If I disappear — recovery plan',
    title_es: 'Si desaparezco — plan de recuperación',
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
    content_es: `Así es como recuperas lo que he estado gestionando.

1. Mi wallet principal es: [dirección de wallet]
2. La frase semilla está guardada en: [ubicación física / caja de seguridad]
3. La llave de Grimoire se deriva de mi wallet — solo conéctate con mi wallet para descifrar.
4. Nuestras cuentas conjuntas: [bancos / exchanges]
5. Pólizas de seguro: [compañías / números de póliza]
6. Facturas mensuales que deben pagarse: [lista]

No necesitas entender cripto. Solo encuentra la frase semilla. Todo lo demás sigue.

Te quiero.
[Tu nombre]`,
  },
];

/**
 * Get templates localized to the given language.
 * @param {'en'|'es'} lang
 * @returns {Array}
 */
export function getTemplates(lang = 'en') {
  return TEMPLATES_EN.map(t => ({
    id: t.id,
    label: lang === 'es' ? (t.label_es || t.label) : t.label,
    kind: t.kind,
    chapter: lang === 'es' ? 'Familia' : t.chapter,
    title: lang === 'es' ? (t.title_es || t.title) : t.title,
    content: lang === 'es' ? (t.content_es || t.content) : t.content,
    note: t.note_es || t.note,
  }));
}
