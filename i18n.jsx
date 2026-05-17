import React from 'react';

// i18n: EN + ES dictionaries, language context, useT() hook.

const dict = {
  en: {
    /* nav */
    nav: { collection: 'Collection', howitworks: 'How it works', stay: 'Stay', begin: 'Begin', connect: 'Connect' },

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

    /* apartados */
    vault: {
      eyebrow: 'Your grimoire',
      eyebrowConnected: 'Your grimoire',
      welcome: 'Welcome, <em>keeper</em>.',
      welcomeBack: 'Welcome back, <em>keeper</em>.',
      sub: 'Your vault is quiet. The last proof lives on Filecoin.',
      subDisconnected: 'Connect your wallet to open the grimoire.',
      newInscription: '+ New inscription',
      closeForm: 'Close form',
      refresh: 'Refresh',
      noInscriptions: 'No inscriptions yet.',
      createFirst: 'Create your first inscription',
      loadError: 'Failed to load inscriptions',
    },
    recovery: {
      eyebrow: 'Recovery · four steps',
      title: 'If you have lost your way, the grimoire <em>remembers</em>.',
      sub: 'There is no help desk, because there are no employees with access. Recovery is a protocol — quiet, free, and always available.',
      steps: [
        { title: 'Re-derive your wallet.', lead: 'From your seed phrase, hardware device, or whatever you safekept.', help: 'No seed? Try your hardware wallet. Still nothing? See "what we cannot help with".' },
        { title: 'Visit the recovery sigil.', lead: 'Open recover.grimoire.eth from any browser. No account. No email.', help: 'Onion mirror available. Works offline once cached — the protocol is local.' },
        { title: 'Sign the recovery message.', lead: 'Your wallet signs a short, free message. The protocol verifies onchain.', help: 'Signing is free. The signature never leaves your browser.' },
        { title: 'Your grimoire returns to you.', lead: 'Inscriptions decrypt locally. The vault opens exactly as you left it.', help: 'Average retrieval · 1.4 s. First open after long silence may take longer.' },
      ],
      checklist: { title: 'A short checklist', items: ['Your wallet (any way).', 'A browser with WebCrypto.', 'Five quiet minutes.'] },
      warning: { title: 'A gentle truth.', body: 'If you lose every copy of your wallet and every recovery key, the grimoire will outlast you with no key to open. The math will not bend, and we cannot soften it.', note: 'This is the same reason it cannot be seized.' },
      stuck: { title: 'if you are stuck', body: 'Reach the Order in the public forum. We help with the protocol, never with secrets.' },
      needs: 'what you will need',
      cannot: 'what we cannot do',
    },
    manifesto: {
      eyebrow: '✦ A manifesto · the order of keepers',
      title: 'On the quiet keeping of <em>precious things</em>.',
      date: 'Mmxxvi · written for those who come after',
      body: [
        { type: 'p', text: 'We are not in the business of remembering for you. We have built a quiet room in which your most precious things can wait — not for us, not for a company, not even for the chain — but for the person you are when you return, or for the person you have asked to find them.' },
        { type: 'p', text: 'The world has many places to keep what matters. Drawers, vaults, custodial cloud, paper folded into a book that goes with you when you move. Each one is borrowed. Borrowed from the company that owns the drawer. Borrowed from the fragility of the paper. Borrowed from electricity, from servers, from arrangements between strangers.' },
        { type: 'h2', text: 'The grimoire belongs to math.' },
        { type: 'p', text: 'Everything you write into it is sealed inside your own browser, before it touches a wire. The keys to that seal live with your wallet — never with us, never on a server, never in a screenshot we could be subpoenaed for. We engineered ourselves out of the loop.' },
        { type: 'p', text: 'Once sealed, your inscription drifts onto Filecoin: a network of thousands of independent storage providers across thousands of independent jurisdictions, each holding a fragment, each cryptographically proving every twenty-four hours that they still hold what they promised to hold.' },
        { type: 'quote', text: 'A grimoire is not a service. It is an arrangement between you, your wallet, and the math.' },
        { type: 'p', text: 'And because the grimoire is anchored to FEVM — Filecoin\'s small, durable virtual machine — its address is etched into a place no court can reach, no acquisition can rewrite, no quiet pivot can erase. The protocol remembers, even when we don\'t.' },
        { type: 'h2', text: 'On what should be kept.' },
        { type: 'p', text: 'Not everything deserves the grimoire. Receipts do not. Calendars do not. Most photographs do not. The grimoire is for the few small things whose loss would unmake a piece of you or a piece of those who follow you.' },
        { type: 'p', text: 'Seed phrases. Private keys. The deed that proves a roof is yours. The letter you cannot send while alive but want delivered on a specific day. The inventory of every account, written in language a fourteen-year-old could read. The note no one but you should ever see — kept, finally, in a way that does not require trusting that no one will see it.' },
        { type: 'h2', text: 'On inheritance.' },
        { type: 'p', text: 'When you go quiet, the grimoire is patient. It will nudge you, then ping you, then wait. Only at the end of a window you chose will it transition to the heirs you chose. We will not be in that room. We will not have a key to that room. The protocol will turn the lock.' },
        { type: 'h2', text: 'A gentle warning.' },
        { type: 'p', text: 'We cannot help you recover what you have lost the keys to. That is the same property that makes it impossible to steal from you. We will not call this a feature, but we will not apologize for it either.' },
        { type: 'p', text: 'Keep your wallet well. Keep its seed in two places only you know. Tell at least one person that the grimoire exists, so they can find it when you cannot tell them yourself. Then, when the world is quieter than usual, return — and inscribe one small precious thing.' },
        { type: 'p', text: 'The grimoire will be here.' },
        { type: 'p', text: 'And it will hold what you give it for as long as the math holds the world.', italic: true },
      ],
      signoff: '— The Order of Keepers',
      anchored: 'Anchored · FEVM · 0xfe…42a9',
    },
    inscribe: {
      title: 'Title',
      kind: 'Kind',
      secret: 'Secret content',
      passphrase: 'Passphrase',
      confirm: 'Confirm passphrase',
      warning: 'GRIMOIRE cannot recover your passphrase. If you lose it, your inscription cannot be decrypted.',
      cta: '✦ Inscribe',
      ctaDisconnected: 'Connect wallet to inscribe',
      placeholder: { title: 'e.g. Ledger seed backup', secret: 'Write what only you should know...', passphrase: 'Choose a strong passphrase', confirm: 'Repeat your passphrase' },
      kinds: ['Seed phrase', 'Private key', 'Document', 'Letter', 'Private note'],
      steps: ['Hashing title...', 'Encrypting your secret...', 'Uploading to Filecoin...', 'Confirm in your wallet...', 'Waiting for confirmation...'],
      stepsSub: ['SHA-256 · your browser', 'AES-256-GCM · your browser', 'Lighthouse · IPFS · Filecoin', 'FEVM · GrimoireRegistry · Calibration', ''],
      done: { title: 'Inscription sealed', body: 'Encrypted, stored on Filecoin, and anchored onchain.', close: 'Close', next: '+ New inscription' },
      newTitle: '✦ new inscription',
      newSub: 'Inscribe a secret',
      cancel: 'Cancel',
    },
    reveal: {
      title: '✦ reveal',
      subtitle: 'Decrypt inscription',
      passphrase: 'Enter your passphrase',
      placeholder: 'Your passphrase',
      cta: '✦ Reveal',
      decrypting: 'Decrypting...',
      decrypted: '✦ decrypted locally',
      hide: 'Hide & close',
      close: 'Close',
      error: 'Decryption failed. Check your passphrase.',
      fetchError: 'Could not fetch from IPFS. The file may still be propagating. Try again in 30 seconds.',
      fetching: 'Fetching from IPFS...',
      decryptError: 'Wrong passphrase. Try again.',
    },
    comingSoon: {
      keep: { title: 'Coming in Phase 2', body: 'The collection guide will show real categories, counts, and templates once onchain inscriptions are live.', cta: 'Open your vault →' },
      inheritance: { title: 'Coming in Phase 3', body: "Dead-man's switch, silence windows, and heir bundles will be programmable via FEVM smart contracts.", cta: 'Open your vault →' },
      heirs: { title: 'Coming in Phase 3', body: 'Multi-signature heir configuration with encrypted notes and inheritance bundles — onchain, trustless.', cta: 'Open your vault →' },
    },
  },

  es: {
    nav: { collection: 'La colección', howitworks: 'Cómo funciona', stay: 'Quedarse', begin: 'Comenzar', connect: 'Conectar' },

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

    /* apartados */
    vault: {
      eyebrow: 'Tu grimorio',
      eyebrowConnected: 'Tu grimorio',
      welcome: 'Bienvenido, <em>guardián</em>.',
      welcomeBack: 'Bienvenido de vuelta, <em>guardián</em>.',
      sub: 'Tu bóveda está tranquila. La última prueba vive en Filecoin.',
      subDisconnected: 'Conecta tu wallet para abrir el grimorio.',
      newInscription: '+ Nueva inscripción',
      closeForm: 'Cerrar formulario',
      refresh: 'Actualizar',
      noInscriptions: 'Sin inscripciones aún.',
      createFirst: 'Crea tu primera inscripción',
      loadError: 'Error al cargar inscripciones',
    },
    recovery: {
      eyebrow: 'Recuperación · cuatro pasos',
      title: 'Si has perdido el camino, el grimorio <em>recuerda</em>.',
      sub: 'No hay mesa de ayuda, porque no hay empleados con acceso. La recuperación es un protocolo — silencioso, gratuito y siempre disponible.',
      steps: [
        { title: 'Re-deriva tu wallet.', lead: 'Desde tu frase semilla, dispositivo hardware, o lo que hayas guardado.', help: '¿Sin semilla? Prueba tu hardware wallet. ¿Nada aún? Mira "con qué no podemos ayudar".' },
        { title: 'Visita el sello de recuperación.', lead: 'Abre recover.grimoire.eth desde cualquier navegador. Sin cuenta. Sin correo.', help: 'Hay mirror en Onion. Funciona offline una vez cacheado — el protocolo es local.' },
        { title: 'Firma el mensaje de recuperación.', lead: 'Tu wallet firma un mensaje corto y gratuito. El protocolo verifica onchain.', help: 'Firmar es gratis. La firma nunca sale de tu navegador.' },
        { title: 'Tu grimorio vuelve a ti.', lead: 'Las inscripciones se descifran localmente. La bóveda se abre exactamente como la dejaste.', help: 'Recuperación media · 1.4 s. La primera apertura tras un largo silencio puede tardar más.' },
      ],
      checklist: { title: 'Una lista corta', items: ['Tu wallet (de cualquier forma).', 'Un navegador con WebCrypto.', 'Cinco minutos de calma.'] },
      warning: { title: 'Una verdad delicada.', body: 'Si pierdes cada copia de tu wallet y cada clave de recuperación, el grimorio te sobrevivirá sin llave para abrirlo. La matemática no se dobla, y no podemos suavizarla.', note: 'Esta es la misma razón por la que no puede ser confiscado.' },
      stuck: { title: 'si estás atascado', body: 'Contacta a la Orden en el foro público. Ayudamos con el protocolo, nunca con secretos.' },
      needs: 'lo que necesitarás',
      cannot: 'lo que no podemos hacer',
    },
    manifesto: {
      eyebrow: '✦ Un manifiesto · la orden de los guardianes',
      title: 'Sobre el cuidado silencioso de las <em>cosas preciosas</em>.',
      date: 'Mmxxvi · escrito para los que vienen después',
      body: [
        { type: 'p', text: 'No estamos en el negocio de recordar por ti. Hemos construido una habitación tranquila donde tus cosas más preciosas pueden esperar — no por nosotros, no por una empresa, ni siquiera por la cadena — sino por la persona que eres cuando regresas, o por la persona a la que le has pedido que las encuentre.' },
        { type: 'p', text: 'El mundo tiene muchos lugares para guardar lo que importa. Cajones, bóvedas, nube de custodia, papel doblado en un libro que va contigo cuando te mudas. Cada uno es prestado. Prestado de la empresa dueña del cajón. Prestado de la fragilidad del papel. Prestado de la electricidad, de los servidores, de acuerdos entre extraños.' },
        { type: 'h2', text: 'El grimorio pertenece a la matemática.' },
        { type: 'p', text: 'Todo lo que escribes en él se sella dentro de tu propio navegador, antes de tocar un cable. Las llaves de ese sello viven con tu wallet — nunca con nosotros, nunca en un servidor, nunca en una captura de pantalla por la que podamos ser citados. Nos hemos diseñado fuera del circuito.' },
        { type: 'p', text: 'Una vez sellada, tu inscripción viaja a Filecoin: una red de miles de proveedores de almacenamiento independientes en miles de jurisdicciones independientes, cada uno sosteniendo un fragmento, cada uno probando criptográficamente cada veinticuatro horas que aún guardan lo que prometieron guardar.' },
        { type: 'quote', text: 'Un grimorio no es un servicio. Es un acuerdo entre tú, tu wallet y la matemática.' },
        { type: 'p', text: 'Y como el grimorio está anclado a FEVM — la pequeña y duradera máquina virtual de Filecoin — su dirección está grabada en un lugar que ningún tribunal puede alcanzar, ninguna adquisición puede reescribir, ningún giro silencioso puede borrar. El protocolo recuerda, incluso cuando nosotros no.' },
        { type: 'h2', text: 'Sobre lo que debe guardarse.' },
        { type: 'p', text: 'No todo merece el grimorio. Los recibos no. Los calendarios no. La mayoría de las fotografías no. El grimorio es para las pocas cosas pequeñas cuya pérdida desharía una parte de ti o de quienes te siguen.' },
        { type: 'p', text: 'Frases semilla. Llaves privadas. La escritura que prueba que un techo es tuyo. La carta que no puedes enviar en vida pero quieres entregar en un día concreto. El inventario de cada cuenta, escrito en un lenguaje que un chico de catorce años pueda leer. La nota que nadie más que tú debería ver — guardada, por fin, sin necesidad de confiar en que nadie la verá.' },
        { type: 'h2', text: 'Sobre la herencia.' },
        { type: 'p', text: 'Cuando te quedes en silencio, el grimorio es paciente. Te dará un toque, luego un aviso, luego esperará. Solo al final de una ventana que tú elegiste hará la transición a los herederos que tú elegiste. No estaremos en esa habitación. No tendremos una llave de esa habitación. El protocolo girará la cerradura.' },
        { type: 'h2', text: 'Una advertencia delicada.' },
        { type: 'p', text: 'No podemos ayudarte a recuperar aquello de lo que has perdido las llaves. Esa es la misma propiedad que hace imposible robártelo. No lo llamaremos una ventaja, pero tampoco nos disculparemos por ello.' },
        { type: 'p', text: 'Cuida bien tu wallet. Guarda su semilla en dos lugares que solo tú conozcas. Dile al menos a una persona que el grimorio existe, para que pueda encontrarlo cuando tú no puedas decírselo. Luego, cuando el mundo esté más callado de lo habitual, regresa — e inscribe una pequeña cosa preciosa.' },
        { type: 'p', text: 'El grimorio estará aquí.' },
        { type: 'p', text: 'Y guardará lo que le des mientras la matemática sostenga el mundo.', italic: true },
      ],
      signoff: '— La Orden de los Guardianes',
      anchored: 'Anclado · FEVM · 0xfe…42a9',
    },
    inscribe: {
      title: 'Título',
      kind: 'Tipo',
      secret: 'Contenido secreto',
      passphrase: 'Frase de acceso',
      confirm: 'Confirmar frase',
      warning: 'GRIMOIRE no puede recuperar tu frase de acceso. Si la pierdes, tu inscripción no podrá descifrarse.',
      cta: '✦ Inscribir',
      ctaDisconnected: 'Conecta tu wallet para inscribir',
      placeholder: { title: 'ej. Backup de semilla Ledger', secret: 'Escribe lo que solo tú deberías saber...', passphrase: 'Elige una frase segura', confirm: 'Repite tu frase de acceso' },
      kinds: ['Frase semilla', 'Llave privada', 'Documento', 'Carta', 'Nota privada'],
      steps: ['Hasheando título...', 'Cifrando tu secreto...', 'Subiendo a Filecoin...', 'Confirma en tu wallet...', 'Esperando confirmación...'],
      stepsSub: ['SHA-256 · tu navegador', 'AES-256-GCM · tu navegador', 'Lighthouse · IPFS · Filecoin', 'FEVM · GrimoireRegistry · Calibration', ''],
      done: { title: 'Inscripción sellada', body: 'Cifrado, almacenado en Filecoin y anclado onchain.', close: 'Cerrar', next: '+ Nueva inscripción' },
      newTitle: '✦ nueva inscripción',
      newSub: 'Inscribe un secreto',
      cancel: 'Cancelar',
    },
    reveal: {
      title: '✦ revelar',
      subtitle: 'Descifrar inscripción',
      passphrase: 'Ingresa tu frase de acceso',
      placeholder: 'Tu frase de acceso',
      cta: '✦ Revelar',
      decrypting: 'Descifrando...',
      decrypted: '✦ descifrado localmente',
      hide: 'Ocultar y cerrar',
      close: 'Cerrar',
      error: 'Falló el descifrado. Revisa tu frase de acceso.',
      fetchError: 'No se pudo obtener de IPFS. El archivo puede estar propagándose. Reintentá en 30 segundos.',
      fetching: 'Obteniendo de IPFS...',
      decryptError: 'Frase incorrecta. Intentá de nuevo.',
    },
    comingSoon: {
      keep: { title: 'Próximamente en Fase 2', body: 'La guía de colección mostrará categorías reales, contadores y plantillas cuando las inscripciones onchain estén activas.', cta: 'Abrir tu bóveda →' },
      inheritance: { title: 'Próximamente en Fase 3', body: 'Dead-man\'s switch, ventanas de silencio y paquetes de herencia serán programables mediante contratos inteligentes en FEVM.', cta: 'Abrir tu bóveda →' },
      heirs: { title: 'Próximamente en Fase 3', body: 'Configuración de herederos multifirma con notas cifradas y paquetes de herencia — onchain, sin confianza.', cta: 'Abrir tu bóveda →' },
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
