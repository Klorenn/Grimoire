import React from 'react';

// i18n: EN + ES dictionaries, language context, useT() hook.

const dict = {
  en: {
    /* nav */
    nav: { collection: 'Collection', howitworks: 'How it works', stay: 'Stay', begin: 'Begin' },

    /* hero */
    hero: {
      eyebrow: 'Your personal grimoire',
      h1: ['Some', 'things', 'BR', 'deserve', 'to', 'BR', 'last', 'forever.'],
      goldWord: 'forever.',
      subtitle: 'Seed phrases. Private keys. Letters to your children. The things you\u2019d write on paper and hide under a floorboard — now woven into the eternity of Filecoin.',
      placeholder: 'Connect your wallet',
      cta: 'Begin',
      foot: ['encrypted client-side', 'stored on filecoin', 'onchain'],
      scroll: 'scroll',
    },

    /* problem */
    problem: {
      eyebrow: 'What we lose',
      titleA: 'Paper ', titleB: 'burns.', titleC: ' Drives ', titleD: 'fail.', titleE: ' Companies ', titleF: 'fade.',
      intro: 'Every safekeeping method we trust is borrowed from something fragile. Paper smolders. Disks rot. Custodians close their doors with our keepsakes inside.',
      visualHeadline: 'What time takes.',
      visualSub: 'Every method we trust has an expiry — only its shape changes.',
      visualTag: 'field footage · the failure of paper',
      learnMore: 'Learn more',
      cards: [
        { t: 'Paper burns.',    code: '001', b: 'Fire, floods, time. The most precious notes outlast nothing.',
          bullets: ['Single point of failure — one fire ends it', 'Degrades with humidity and light', 'No copy, no recovery', 'Anyone who finds it can read it'] },
        { t: 'Drives fail.',    code: '002', b: 'Hard drives die silently. Accounts get locked forever. The cloud is someone else\u2019s computer.',
          bullets: ['Mechanical failure within 5–10 years', 'Cloud accounts get suspended or locked', 'Encryption keys often live on the same drive', 'Backups need backups need backups'] },
        { t: 'Companies fade.', code: '003', b: 'Even giants disappear. Custodians vanish. What lives on someone\u2019s server lives on borrowed time.',
          bullets: ['Custodians get acquired, fail, or close', 'Terms change without your consent', 'Your keys are not yours', 'Servers retire, data is purged'] },
      ],
    },

    /* solution */
    solution: {
      eyebrow: 'A grimoire that lasts',
      titleA: 'A grimoire that ', titleB: 'cannot', titleC: ' be burned, broken, or seized.',
      paragraphs: [
        'Open Grimoire, write what only you should know. Your browser whispers it into AES-256 ciphertext before it ever touches a wire.',
        'The ciphertext drifts onto Filecoin — thousands of independent storage providers, holding cryptographic proof of your fragments every twenty-four hours.',
        'Your CID is anchored onchain through FEVM. The protocol remembers. Your wallet is the only key that turns the lock.',
      ],
      pathTitle: 'The path of a secret',
      stepWallet: { l: 'wallet',         s: 'signs · derives' },
      stepEncrypt:{ l: 'encrypt',        s: 'AES-256 · in your browser' },
      stepFile:   { l: 'filecoin',       s: 'proof every 24h' },
      stepCid:    { l: 'cid',            s: 'permanent address' },
      stepChain:  { l: 'onchain · fevm', s: 'immutable record' },
      onlyYou:    'only you hold the key',
      forever:    '✦ forever',
      videoTag: 'before · the way we did it',
      videoHead: 'A disk, mid-repair.',
      videoSub:  'Hands working against time, salvaging what should have been permanent.',
    },

    /* features */
    features: {
      eyebrow: 'The collection',
      titleA: 'What you may ', titleB: 'keep', titleC: ' here.',
      items: [
        { n: 'Seed phrases',    b: 'Twelve or twenty-four words, ciphered the moment you commit them.',           tag: 'AES-256 · client-side' },
        { n: 'Private keys',    b: 'Any chain. Any custody model. Quiet, hidden, retrievable.',                   tag: 'any chain · ciphered' },
        { n: 'Documents',       b: 'Wills, deeds, certificates. The paper that anchors a life.',                  tag: 'files · permanent' },
        { n: 'Wallet ledger',   b: 'A readable inventory of every address you steward.',                          tag: 'multichain · readable' },
        { n: 'Letters & wills', b: 'Time-locked messages that reach the right person at the right moment.',       tag: 'programmable · onchain' },
        { n: 'Private notes',   b: 'Anything you would rather forget the world than ever forget yourself.',       tag: 'text · encrypted' },
      ],
    },

    /* comparison */
    compare: {
      eyebrow: 'Why a grimoire',
      titleA: 'Not a service. ', titleB: 'A protocol.',
      intro: 'Every other keepsake belongs to someone else\u2019s building, server, or shoebox. Grimoire belongs to math.',
      colHead: 'Property',
      cols: ['iCloud / Drive', 'Notion', 'Hardware wallet', 'Grimoire'],
      rows: [
        { k: 'Only you can read it',          v: [false, false, true,  true] },
        { k: 'Survives if the company closes', v: [false, false, true,  true] },
        { k: 'Reachable from anywhere',        v: [true,  true,  false, true] },
        { k: 'Cannot be deleted',              v: [false, false, false, true] },
        { k: 'No account, no email, no KYC',   v: [false, false, true,  true] },
        { k: 'Inheritable on its own',         v: [false, false, false, true] },
      ],
      yes: 'yes',
      no: 'no',
      videoTag:  'time-lapse · custodians',
      videoHead: 'Even the giants fade.',
      videoSub:  'Servers retire. Companies close. What lived on someone\u2019s ledger goes with it.',
    },

    /* science */
    science: {
      eyebrow: 'How the magic works',
      titleA: 'How the ', titleB: 'magic', titleC: ' works. ', titleD: '(It\u2019s math.)',
      blocks: [
        { t: 'Encrypted in your browser.', b: 'AES-256, client-side. Your secrets become ciphertext on your own machine before anything touches the network.' },
        { t: 'Stored on Filecoin.',         b: 'Cryptographic proofs every twenty-four hours quietly confirm that your data still exists, intact, across thousands of storage providers.' },
        { t: 'Anchored onchain.',           b: 'A smart contract on FEVM remembers your CID — the address of your encrypted parcel. Your wallet is the only key.' },
      ],
      term: {
        title: 'inscription · live',
        wallet:  'wallet',
        encrypt: 'encrypt',
        cid:     'cid',
        proof:   'proof',
        status:  'status',
        statusVal: '✦ stored · onchain · forever',
        synced:  'synced · 14 sec ago',
      },
      wovenFrom: 'woven from',
    },

    /* testimonials */
    testimonials: {
      eyebrow: 'From the keepers',
      titleA: 'Quiet voices, ', titleB: 'kept', titleC: ' safely.',
      quotes: [
        { q: 'I sleep better knowing my seed isn\u2019t a piece of paper my kid might find in a drawer.', a: '@nightkeeper' },
        { q: 'I wrote a letter to my daughter she\u2019ll read after I\u2019m gone. Grimoire makes sure she will.', a: '@cipher.eth' },
        { q: 'Inheritance for crypto, finally done right. Not a service. A protocol.', a: '@order_of_keys' },
      ],
    },

    /* pricing */
    pricing: {
      eyebrow: 'Two paths',
      titleA: 'Two ways to ', titleB: 'begin', titleC: '.',
      tiers: [
        {
          name: 'The Apprentice',
          price: 'Free',
          priceSub: '',
          altPrice: '',
          sub: 'a quiet beginning',
          features: [
            'Up to 10 inscriptions',
            'AES-256 client-side encryption',
            'Standard Filecoin storage',
            'Annual renewal',
            'Community support',
          ],
          cta: 'Begin freely',
        },
        {
          name: 'The Keeper',
          price: '$12',
          priceSub: '/ month',
          altPrice: 'or 100 FIL / year',
          sub: 'for what truly matters',
          features: [
            'Unlimited inscriptions',
            'Programmable inheritance (dead-man\u2019s switch on FEVM)',
            'Priority retrieval network',
            'Multi-signature heir configuration',
            'Direct guidance from the Keepers',
          ],
          cta: 'Take the path',
        },
      ],
      recommended: '✦ recommended',
      footnoteA: 'Pay in FIL, USDC, or any card. ',
      footnoteB: 'No KYC. Ever.',
    },

    /* footer */
    footer: {
      desc: 'A quiet vault for the things that matter most — encrypted by you, stored on Filecoin, kept safe forever.',
      cols: [
        { t: 'The Collection', l: ['Open Grimoire', 'What to Keep', 'Inheritance', 'Heir Settings', 'Recovery Guide'] },
        { t: 'The Keepers',    l: ['Manifesto', 'The Council', 'Field Notes', 'Join Us'] },
        { t: 'Help',           l: ['Reach Us', 'Privacy', 'Terms', 'Report an Issue'] },
      ],
      copy: 'Made with care · © 2026 The Grimoire Order',
      stay: 'Stay in touch:',
      foreverLine: 'forever · always · onchain',
    },
  },

  es: {
    nav: { collection: 'La colección', howitworks: 'Cómo funciona', stay: 'Quedarse', begin: 'Comenzar' },

    hero: {
      eyebrow: 'Tu grimorio personal',
      h1: ['Algunas', 'cosas', 'BR', 'merecen', 'durar', 'BR', 'para', 'siempre.'],
      goldWord: 'siempre.',
      subtitle: 'Frases semilla. Llaves privadas. Cartas para tus hijos. Lo que escribirías en papel y esconderías bajo un tablón — ahora tejido en la eternidad de Filecoin.',
      placeholder: 'Conecta tu wallet',
      cta: 'Comenzar',
      foot: ['cifrado en tu navegador', 'guardado en filecoin', 'onchain'],
      scroll: 'desliza',
    },

    problem: {
      eyebrow: 'Lo que perdemos',
      titleA: 'El papel ', titleB: 'arde.', titleC: ' Los discos ', titleD: 'fallan.', titleE: ' Las empresas ', titleF: 'se apagan.',
      intro: 'Cada método al que confiamos lo que importa toma prestada su fragilidad de otra cosa. El papel se quema. Los discos se pudren. Los custodios cierran sus puertas con nuestros recuerdos adentro.',
      visualHeadline: 'Lo que el tiempo se lleva.',
      visualSub: 'Cada método en el que confiamos tiene fecha de caducidad — solo cambia su forma.',
      visualTag: 'imágenes de campo · la caída del papel',
      learnMore: 'Saber más',
      cards: [
        { t: 'El papel arde.',         code: '001', b: 'Fuego, inundaciones, tiempo. Las notas más preciosas no sobreviven a nada.',
          bullets: ['Un solo punto de falla — un incendio lo termina', 'Se degrada con humedad y luz', 'Sin copia, sin recuperación', 'Quien lo encuentre puede leerlo'] },
        { t: 'Los discos fallan.',     code: '002', b: 'Los discos duros mueren en silencio. Las cuentas se bloquean para siempre. La nube es la computadora de alguien más.',
          bullets: ['Falla mecánica entre 5–10 años', 'Cuentas en la nube se suspenden o bloquean', 'Las llaves suelen vivir en el mismo disco', 'Los respaldos necesitan respaldos'] },
        { t: 'Las empresas se apagan.', code: '003', b: 'Hasta los gigantes desaparecen. Los custodios se desvanecen. Lo que vive en el servidor de otro vive con tiempo prestado.',
          bullets: ['Custodios son adquiridos, quiebran o cierran', 'Los términos cambian sin tu consentimiento', 'Tus llaves no son tuyas', 'Los servidores se retiran, los datos se borran'] },
      ],
    },

    solution: {
      eyebrow: 'Un grimorio que perdura',
      titleA: 'Un grimorio que ', titleB: 'no puede', titleC: ' ser quemado, roto, ni confiscado.',
      paragraphs: [
        'Abres Grimoire y escribes lo que solo tú deberías saber. Tu navegador lo susurra en texto cifrado AES-256 antes de que toque cualquier cable.',
        'El texto cifrado viaja a Filecoin — miles de proveedores de almacenamiento independientes, sosteniendo pruebas criptográficas de tus fragmentos cada veinticuatro horas.',
        'Tu CID queda anclado onchain a través de FEVM. El protocolo recuerda. Tu wallet es la única llave que abre la cerradura.',
      ],
      pathTitle: 'El camino de un secreto',
      stepWallet: { l: 'wallet',         s: 'firma · deriva' },
      stepEncrypt:{ l: 'cifrar',         s: 'AES-256 · en tu navegador' },
      stepFile:   { l: 'filecoin',       s: 'prueba cada 24h' },
      stepCid:    { l: 'cid',            s: 'dirección permanente' },
      stepChain:  { l: 'onchain · fevm', s: 'registro inmutable' },
      onlyYou:    'solo tú tienes la llave',
      videoTag:   'antes · cómo lo hacíamos',
      videoHead:  'Un disco, en plena reparación.',
      videoSub:   'Manos trabajando contra el tiempo, rescatando lo que debió ser permanente.',
      forever:    '✦ para siempre',
    },

    features: {
      eyebrow: 'La colección',
      titleA: 'Lo que puedes ', titleB: 'guardar', titleC: ' aquí.',
      items: [
        { n: 'Frases semilla',     b: 'Doce o veinticuatro palabras, cifradas en el instante en que las confías.',                tag: 'AES-256 · en tu navegador' },
        { n: 'Llaves privadas',    b: 'Cualquier cadena. Cualquier custodia. Silenciosas, ocultas, recuperables.',                tag: 'cualquier cadena · cifrado' },
        { n: 'Documentos',         b: 'Testamentos, escrituras, certificados. El papel que sostiene una vida.',                    tag: 'archivos · permanente' },
        { n: 'Registro de wallets',b: 'Un inventario legible de cada dirección que custodias.',                                    tag: 'multichain · legible' },
        { n: 'Cartas y testamentos', b: 'Mensajes con cerradura de tiempo que llegan a la persona correcta en el momento correcto.', tag: 'programable · onchain' },
        { n: 'Notas privadas',     b: 'Lo que preferirías que el mundo olvidara antes que olvidarlo tú.',                          tag: 'texto · cifrado' },
      ],
    },

    compare: {
      eyebrow: 'Por qué un grimorio',
      titleA: 'No un servicio. ', titleB: 'Un protocolo.',
      intro: 'Cualquier otro recuerdo pertenece al edificio, servidor o caja de alguien más. Grimoire pertenece a la matemática.',
      colHead: 'Propiedad',
      cols: ['iCloud / Drive', 'Notion', 'Hardware wallet', 'Grimoire'],
      rows: [
        { k: 'Solo tú lo puedes leer',           v: [false, false, true,  true] },
        { k: 'Sobrevive si la empresa cierra',    v: [false, false, true,  true] },
        { k: 'Accesible desde cualquier lugar',   v: [true,  true,  false, true] },
        { k: 'No se puede borrar',                v: [false, false, false, true] },
        { k: 'Sin cuenta, sin correo, sin KYC',   v: [false, false, true,  true] },
        { k: 'Hereda por sí solo',                v: [false, false, false, true] },
      ],
      yes: 'sí',
      no: 'no',
      videoTag:  'time-lapse · custodios',
      videoHead: 'Hasta los gigantes se apagan.',
      videoSub:  'Los servidores se retiran. Las empresas cierran. Lo que vivía en su libro mayor se va con ellos.',
    },

    science: {
      eyebrow: 'Cómo funciona la magia',
      titleA: 'Cómo funciona la ', titleB: 'magia', titleC: '. ', titleD: '(Es matemática.)',
      blocks: [
        { t: 'Cifrado en tu navegador.', b: 'AES-256, del lado del cliente. Tus secretos se vuelven texto cifrado en tu propia máquina antes de que algo toque la red.' },
        { t: 'Guardado en Filecoin.',     b: 'Pruebas criptográficas cada veinticuatro horas confirman en silencio que tus datos siguen existiendo, intactos, en miles de proveedores.' },
        { t: 'Anclado onchain.',          b: 'Un contrato inteligente en FEVM recuerda tu CID — la dirección de tu paquete cifrado. Tu wallet es la única llave.' },
      ],
      term: {
        title: 'inscripción · en vivo',
        wallet:  'wallet',
        encrypt: 'cifrar',
        cid:     'cid',
        proof:   'prueba',
        status:  'estado',
        statusVal: '✦ guardado · onchain · para siempre',
        synced:  'sincronizado · hace 14 seg',
      },
      wovenFrom: 'tejido con',
    },

    testimonials: {
      eyebrow: 'De los guardianes',
      titleA: 'Voces calladas, ', titleB: 'guardadas', titleC: ' a salvo.',
      quotes: [
        { q: 'Duermo mejor sabiendo que mi semilla no es un papel que mi hijo podría encontrar en un cajón.', a: '@nightkeeper' },
        { q: 'Le escribí una carta a mi hija que leerá cuando yo ya no esté. Grimoire se asegura de que la lea.', a: '@cipher.eth' },
        { q: 'Herencia para cripto, por fin bien hecha. No un servicio. Un protocolo.', a: '@order_of_keys' },
      ],
    },

    pricing: {
      eyebrow: 'Dos caminos',
      titleA: 'Dos formas de ', titleB: 'comenzar', titleC: '.',
      tiers: [
        {
          name: 'El aprendiz',
          price: 'Gratis',
          priceSub: '',
          altPrice: '',
          sub: 'un comienzo tranquilo',
          features: [
            'Hasta 10 inscripciones',
            'Cifrado AES-256 en tu navegador',
            'Almacenamiento estándar en Filecoin',
            'Renovación anual',
            'Soporte de la comunidad',
          ],
          cta: 'Comenzar libremente',
        },
        {
          name: 'El guardián',
          price: '$12',
          priceSub: '/ mes',
          altPrice: 'o 100 FIL / año',
          sub: 'para lo que de verdad importa',
          features: [
            'Inscripciones ilimitadas',
            'Herencia programable (dead-man switch en FEVM)',
            'Red de recuperación prioritaria',
            'Configuración de herederos multifirma',
            'Guía directa de los Guardianes',
          ],
          cta: 'Tomar el camino',
        },
      ],
      recommended: '✦ recomendado',
      footnoteA: 'Paga en FIL, USDC, o con cualquier tarjeta. ',
      footnoteB: 'Nunca KYC. Jamás.',
    },

    footer: {
      desc: 'Una bóveda tranquila para lo que más importa — cifrado por ti, guardado en Filecoin, a salvo para siempre.',
      cols: [
        { t: 'La colección', l: ['Abrir Grimoire', 'Qué guardar', 'Herencia', 'Ajustes de herederos', 'Guía de recuperación'] },
        { t: 'Los guardianes', l: ['Manifiesto', 'El consejo', 'Notas de campo', 'Únete'] },
        { t: 'Ayuda', l: ['Contáctanos', 'Privacidad', 'Términos', 'Reportar un problema'] },
      ],
      copy: 'Hecho con cuidado · © 2026 La Orden de Grimoire',
      stay: 'Sigamos en contacto:',
      foreverLine: 'para siempre · onchain · siempre',
    },
  },
};

const LangContext = React.createContext({ lang: 'en', setLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLang] = React.useState(() => {
    try { return localStorage.getItem('grimoire-lang') || 'en'; } catch (e) { return 'en'; }
  });
  React.useEffect(() => {
    try { localStorage.setItem('grimoire-lang', lang); } catch (e) {}
    document.documentElement.lang = lang;
  }, [lang]);
  const ctx = React.useMemo(() => ({ lang, setLang, t: dict[lang] }), [lang]);
  return <LangContext.Provider value={ctx}>{children}</LangContext.Provider>;
}

export function useT() {
  return React.useContext(LangContext);
}
