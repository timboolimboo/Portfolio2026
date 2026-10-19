/**
 * Gesamter Seiteninhalt.
 * Texte, Projekte, Navigation und die vorbereiteten Bereiche
 * Fotografie und Meeresschutz werden nur hier gepflegt.
 * Ein Bereich mit enabled: false bleibt in der Oberfläche deaktiviert
 * und erzeugt keine Seite. Auf true stellen, neu bauen — dann erscheint
 * er in der Navigation und als eigene Seite.
 */

const site = {
  lang: "de",
  person: {
    name: "Tim Kattenbusch",
    brand: "Hello Tim.",
    role: "Freelance Digital UI/UX Designer",
    location: "Hamm, DE",
    timezone: "Europe/Berlin",
    locale: "de-DE",
    email: "contact@hellotim.work",
    headerNote: "Kurztext für die Kopfzeile folgt.",
    url: "https://hellotim.work",
    sameAs: [
      "https://www.linkedin.com/in/tim-kattenbusch-107b5a122",
      "https://www.xing.com/profile/Tim_Kattenbusch",
      "https://dribbble.com/helloTim",
      "https://twitter.com/hellotimk",
    ],
  },

  meta: {
    title: "Tim Kattenbusch — Digital UI/UX Designer",
    description:
      "Tim Kattenbusch, freiberuflicher Digital UI/UX Designer, spezialisiert auf UX/UI, digitales Design und Konzeption.",
  },

  navigation: [
    { id: "home", label: "Start", href: "/" },
    { id: "about", label: "Über mich", href: "/ueber-mich" },
    { id: "work", label: "Arbeiten", href: "/arbeiten" },
    { id: "contact", label: "Kontakt", href: "#kontakt" },
  ],

  home: {
    headline: [
      { text: "Designer", tone: "ink" },
      { text: "für digitale Erlebnisse von", tone: "mute" },
      { text: "UX bis UI.", tone: "ink" },
    ],
    lede: "Freiberuflicher Digital UI/UX Designer, spezialisiert auf UX/UI, digitales Design und Konzeption.",
    portrait: {
      placeholder: true,
      label: "Porträt — Platzhalter",
      alt: "Porträt — Platzhalter. Ein Foto von Tim Kattenbusch liegt noch nicht vor.",
    },
    wideImage: {
      src: "/images/promiflash/01.webp",
      alt: "Promiflash, Interface Design für eine Android- und iOS-App",
    },
    info: {
      label: "Info",
      text: "Ich bin Tim Kattenbusch, ein freiberuflicher Designer spezialisiert auf UX/UI, Digital Design und Konzeption.",
      moreLabel: "Mehr erfahren",
      moreHref: "/ueber-mich",
    },
    servicesLabel: "Leistungen",
    work: {
      label: "Arbeiten",
      text: "Eine Auswahl an Projekten aus Interface, UX/UI und Konzeption — Websites, Apps und Gestaltung für den Bildschirm.",
      moreLabel: "Alle Arbeiten",
      moreHref: "/arbeiten",
      featured: ["promiflash", "bmw-m-experience"],
    },
    explorationsTitle: "Explorationen",
    explorationsMeta: "Platzhalter — Designstudien folgen",
  },

  services: [
    {
      number: "001",
      icon: "ux",
      title: "UX Design",
      subtitle: "Nutzung vor Form.",
      text: "Abläufe für Apps und Websites, die sich ohne Umwege erschließen — von der ersten Skizze bis zum fertigen Flow.",
    },
    {
      number: "002",
      icon: "ui",
      title: "UI Design",
      subtitle: "Hierarchie und Detail.",
      text: "Oberflächen mit klarer Struktur, ruhiger Typografie und einer Form, die zur jeweiligen Marke passt.",
    },
    {
      number: "003",
      icon: "digital",
      title: "Digital Design",
      subtitle: "Vom Screen bis zum System.",
      text: "Digitale Gestaltung für Web, App und Kampagne, konsistent über die einzelnen Touchpoints hinweg.",
    },
    {
      number: "004",
      icon: "konzept",
      title: "Konzept",
      subtitle: "Die Idee, die trägt.",
      text: "Konzeption für digitale und klassische Kommunikation, bevor Pixel, Layout und Produktion festliegen.",
    },
  ],

  about: {
    title: "Über mich — Tim Kattenbusch",
    hero: {
      placeholder: true,
      label: "Porträt — Platzhalter",
      alt: "Porträt — Platzhalter. Ein Foto von Tim Kattenbusch liegt noch nicht vor.",
    },
    infoLabel: "Info",
    paragraphs: [
      "Ich bin Tim Kattenbusch, ein freiberuflicher Designer spezialisiert auf UX/UI, Digital Design und Konzeption.",
      "Mein Name ist Tim Kattenbusch, ich bin freiberuflicher Designer. Die digitale Welt ist mein Zuhause, aber auch die Bereiche der klassischen Kommunikation ziehen mich immer wieder in ihren Bann.",
      "Egal ob Kampagne, Website oder App, ich bin ständig auf der Suche nach neuen Projekten und Herausforderungen. Ob im Bereich Digital oder Print ich finde die ideale Lösung, also schreiben Sie mir einfach!",
      "Vor kurzem hab ich meinen Bachelor im Bereich Computervisualistik & Design abgeschlossen. Während eines Praktikums in einer Full-Service Agentur durfte ich für Kunden wie LG, Asus und Trilux arbeiten.",
    ],
    experienceLabel: "Werdegang",
    experience: [
      {
        mark: "TK",
        markLabel: "Platzhalter-Monogramm",
        org: "Freiberuflich",
        role: "Digital UI/UX Designer",
        period: "Heute",
        paragraphs: [
          "Ich bin ständig auf der Suche nach neuen Projekten und Herausforderungen. Ob Kampagne, Website oder App, im Bereich Digital oder Print — schreiben Sie mir einfach.",
        ],
      },
      {
        mark: "AG",
        markLabel: "Platzhalter — Agenturname nicht veröffentlicht",
        org: "Full-Service-Agentur",
        role: "Praktikum",
        period: "Zeitraum — Platzhalter",
        paragraphs: [
          "Während eines Praktikums in einer Full-Service-Agentur durfte ich für Kunden wie LG, Asus und Trilux arbeiten. Der Name der Agentur ist auf hellotim.work nicht genannt.",
        ],
      },
      {
        mark: "CV",
        markLabel: "Platzhalter-Monogramm",
        org: "Computervisualistik & Design",
        role: "Bachelor",
        period: "Abschluss",
        paragraphs: [
          "Bachelor im Bereich Computervisualistik & Design. Das Abschlussjahr ist hier als Platzhalter offen, weil es auf der bisherigen Website nicht steht.",
        ],
      },
    ],
  },

  workPage: {
    title: "Arbeiten — Tim Kattenbusch",
    headline: [
      { text: "Eine Sammlung von", tone: "mute" },
      { text: "Projekten, Studien", tone: "ink" },
      { text: "und", tone: "mute" },
      { text: "Details.", tone: "ink" },
      { text: "Einiges sind", tone: "mute" },
      { text: "Case Studies.", tone: "ink" },
      { text: "Einiges ist einfach", tone: "mute" },
      { text: "gute Arbeit.", tone: "ink" },
    ],
    studiesLabel: "Projekte",
    explorationsLabel: "Explorationen",
  },

  /**
   * Bilder stammen von http://www.hellotim.work und liegen
   * komprimiert unter public/images/<slug>/.
   * year und link sind Platzhalter, weil die alte Website dazu nichts nennt.
   */
  projects: [
    {
      slug: "promiflash",
      title: "Promiflash",
      summary: "Interface Design",
      type: "Android/iOS App",
      year: "Platzhalter",
      role: "Interface Design",
      link: null,
      cover: "/images/promiflash/01.webp",
      images: [
        ["/images/promiflash/01.webp", "Promiflash, Titelbild der App-Gestaltung"],
        ["/images/promiflash/02.webp", "Promiflash, Screen 2"],
        ["/images/promiflash/03.webp", "Promiflash, Screen 3"],
        ["/images/promiflash/04.webp", "Promiflash, Screen 4"],
        ["/images/promiflash/05.webp", "Promiflash, Screen 5"],
        ["/images/promiflash/06.webp", "Promiflash, Screen 6"],
        ["/images/promiflash/07.webp", "Promiflash, Screen 7"],
      ].map(([src, alt]) => ({ src, alt })),
      intro: [
        { text: "Promiflash — Interface Design für eine Android- und iOS-App." },
        {
          text: "Ausführliche Projektbeschreibung, Ablauf und Ergebnis folgen. Auf hellotim.work ist zu diesem Projekt nur die Kurzzeile und die Bildstrecke veröffentlicht.",
          placeholder: true,
        },
      ],
      goals: [
        {
          text: "Ziele, gestalterische Entscheidungen und der Umgang mit den Inhalten der App werden hier ergänzt, sobald ein ausformulierter Case vorliegt.",
          placeholder: true,
        },
      ],
    },
    {
      slug: "bmw-m-experience",
      title: "BMW M Experience",
      summary: "Konzept, UX/UI",
      type: "Projektarbeit",
      year: "Platzhalter",
      role: "Konzept, UX/UI Design",
      link: null,
      cover: "/images/bmw-m-experience/01.webp",
      images: [
        ["/images/bmw-m-experience/01.webp", "BMW M Experience, Titelbild"],
        ["/images/bmw-m-experience/02.webp", "BMW M Experience, Screen 2"],
        ["/images/bmw-m-experience/03.webp", "BMW M Experience, Screen 3"],
        ["/images/bmw-m-experience/04.webp", "BMW M Experience, Screen 4"],
        ["/images/bmw-m-experience/05.webp", "BMW M Experience, Screen 5"],
        ["/images/bmw-m-experience/06.webp", "BMW M Experience, Screen 6"],
        ["/images/bmw-m-experience/07.webp", "BMW M Experience, Screen 7"],
      ].map(([src, alt]) => ({ src, alt })),
      intro: [
        { text: "BMW M Experience — Konzept und UX/UI Design, entstanden als Projektarbeit." },
        {
          text: "Ausführliche Projektbeschreibung, Aufgabenstellung und Ergebnis folgen. Veröffentlicht ist bisher die Kurzzeile und die Bildstrecke.",
          placeholder: true,
        },
      ],
      goals: [
        {
          text: "Konzeptionelle Ziele und die UX-Entscheidungen der Projektarbeit werden hier ergänzt.",
          placeholder: true,
        },
      ],
    },
    {
      slug: "passpoints",
      title: "Passpoints",
      summary: "UX/UI Design",
      type: "Website",
      year: "Platzhalter",
      role: "UX/UI Design",
      link: null,
      cover: "/images/passpoints/01.webp",
      images: [
        ["/images/passpoints/01.webp", "Passpoints, Titelbild der Website"],
        ["/images/passpoints/02.webp", "Passpoints, Screen 2"],
        ["/images/passpoints/03.webp", "Passpoints, Screen 3"],
        ["/images/passpoints/04.webp", "Passpoints, Screen 4"],
        ["/images/passpoints/05.webp", "Passpoints, Screen 5"],
        ["/images/passpoints/06.webp", "Passpoints, Screen 6"],
        ["/images/passpoints/07.webp", "Passpoints, Screen 7"],
      ].map(([src, alt]) => ({ src, alt })),
      intro: [
        { text: "Passpoints — UX/UI Design für eine Website." },
        {
          text: "Ausführliche Projektbeschreibung folgt. Veröffentlicht ist bisher die Kurzzeile und die Bildstrecke.",
          placeholder: true,
        },
      ],
      goals: [
        {
          text: "Ziele für Struktur, Nutzerführung und die visuelle Gestaltung der Website werden hier ergänzt.",
          placeholder: true,
        },
      ],
    },
    {
      slug: "frames",
      title: "Frames",
      summary: "UI Design / Branding",
      type: "iOS App",
      year: "Platzhalter",
      role: "UI Design / Branding",
      link: null,
      cover: "/images/frames/01.webp",
      images: [
        ["/images/frames/01.webp", "Frames, Titelbild der iOS-App"],
        ["/images/frames/02.webp", "Frames, Screen 2"],
        ["/images/frames/03.webp", "Frames, Screen 3"],
        ["/images/frames/04.webp", "Frames, Screen 4"],
        ["/images/frames/05.webp", "Frames, Screen 5"],
        ["/images/frames/06.webp", "Frames, Screen 6"],
      ].map(([src, alt]) => ({ src, alt })),
      intro: [
        { text: "Frames — UI Design und Branding für eine iOS-App." },
        {
          text: "Ausführliche Projektbeschreibung zu Branding, Interface und Produkt folgt.",
          placeholder: true,
        },
      ],
      goals: [
        {
          text: "Ziele für Markenauftritt und Interface der App werden hier ergänzt.",
          placeholder: true,
        },
      ],
    },
    {
      slug: "medivital",
      title: "Medivital",
      summary: "Webdesign / Packaging",
      type: "Website / Produktverpackungen",
      year: "Platzhalter",
      role: "Webdesign / Packaging",
      link: null,
      cover: "/images/medivital/01.webp",
      images: [
        ["/images/medivital/01.webp", "Medivital, Titelbild"],
        ["/images/medivital/02.webp", "Medivital, Screen 2"],
        ["/images/medivital/03.webp", "Medivital, Screen 3"],
        ["/images/medivital/04.webp", "Medivital, Screen 4"],
        ["/images/medivital/05.webp", "Medivital, Screen 5"],
        ["/images/medivital/06.webp", "Medivital, Screen 6"],
      ].map(([src, alt]) => ({ src, alt })),
      intro: [
        { text: "Medivital — Webdesign und Packaging für Website und Produktverpackungen." },
        {
          text: "Ausführliche Projektbeschreibung zu Website und Verpackung folgt.",
          placeholder: true,
        },
      ],
      goals: [
        {
          text: "Ziele für den Auftritt im Web und auf der Verpackung werden hier ergänzt.",
          placeholder: true,
        },
      ],
    },
  ],

  /**
   * Acht Plätze wie im Referenz-Raster. Tim hat keine separaten
   * Explorationen veröffentlicht — deshalb klar als Platzhalter markiert.
   */
  explorations: Array.from({ length: 8 }, (_, index) => ({
    id: `exploration-${index + 1}`,
    label: `Exploration ${String(index + 1).padStart(2, "0")} — Platzhalter`,
    alt: `Exploration ${index + 1} — Platzhalter. Hier kann später eine Designstudie stehen.`,
    placeholder: true,
  })),

  /**
   * Keine offiziellen Logos. Nur gesetzte Wortmarken.
   * uncertain: der Name stammt aus einem Projekt, nicht aus der
   * Kundenliste des Praktikums — auf der Seite als Platzhalter markiert.
   */
  clients: [
    { name: "LG" },
    { name: "Asus" },
    { name: "Trilux" },
    { name: "BMW", uncertain: true },
    { name: "Promiflash", uncertain: true },
    { name: "Passpoints", uncertain: true },
    { name: "Frames", uncertain: true },
    { name: "Medivital", uncertain: true },
  ],
  clientsNote:
    "Typografische Wortmarken, keine offiziellen Logos. Platzhalter: bei BMW, Promiflash, Passpoints, Frames und Medivital ist auf hellotim.work ein Projekt genannt, nicht ausdrücklich ein Auftraggeber.",

  contact: {
    headlineBefore: "Kontakt, Zusammenarbeit",
    headlineAfter: "oder einfach Hallo",
    emailLabelShort: "E-Mail",
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/tim-kattenbusch-107b5a122",
      },
      {
        label: "Xing",
        href: "https://www.xing.com/profile/Tim_Kattenbusch",
      },
      {
        label: "Dribbble",
        href: "https://dribbble.com/helloTim",
      },
      {
        label: "Twitter",
        href: "https://twitter.com/hellotimk",
      },
    ],
  },

  /**
   * Vorbereitete, standardmäßig deaktivierte Bereiche.
   * enabled auf true setzen, dann erscheinen Navigationseintrag und Seite.
   */
  preparedSections: [
    {
      id: "fotografie",
      enabled: false,
      label: "Fotografie",
      href: "/fotografie",
      title: "Fotografie — Tim Kattenbusch",
      headline: [
        { text: "Fotografie", tone: "ink" },
        { text: "folgt.", tone: "mute" },
      ],
      intro:
        "Platzhalter: Der Bereich Fotografie ist angelegt und noch deaktiviert. Bilder und Texte können in diesem Eintrag ergänzt werden.",
    },
    {
      id: "meeresschutz",
      enabled: false,
      label: "Meeresschutz",
      href: "/meeresschutz",
      title: "Meeresschutz — Tim Kattenbusch",
      kicker: "Ocean Conservation",
      headline: [
        { text: "Meeresschutz", tone: "ink" },
        { text: "folgt.", tone: "mute" },
      ],
      intro:
        "Platzhalter: Der Bereich Meeresschutz / Ocean Conservation ist angelegt und noch deaktiviert. Inhalte können in diesem Eintrag ergänzt werden.",
    },
  ],

  impressum: {
    title: "Impressum — Tim Kattenbusch",
    label: "Impressum",
    intro: "Angaben gemäß § 5 TMG. Übernommen von der bisher veröffentlichten Impressum-Seite.",
    lines: [
      "Tim Kattenbusch",
      "Am Kirchgraben 23",
      "59077 Hamm",
      "Steuer-Nummer: DE 322 / 5140 / 3336",
      "USt-IdNr. DE93183507466",
      "Tel: +49 (0) 157 89177374",
      "E-Mail: info@hellotim.work",
    ],
    blocks: [
      {
        heading: "Haftung für Inhalte",
        paragraphs: [
          "Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.",
        ],
      },
      {
        heading: "Haftung für Links",
        paragraphs: [
          "Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
        ],
      },
      {
        heading: "Urheberrechte",
        paragraphs: [
          "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.",
        ],
      },
      {
        heading: "Datenschutz",
        paragraphs: [
          "Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich. Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.",
        ],
      },
    ],
  },

  ui: {
    skip: "Zum Inhalt",
    nextProject: "Nächstes Projekt",
    viewProject: "Ansehen →",
    goalsLabel: "Ziele",
    introLabel: "Projekt",
    clientsLabel: "Clients",
    year: "Jahr",
    role: "Rolle",
    type: "Art",
    link: "Link",
    visit: "Website besuchen",
    close: "Schließen",
    previous: "Vorheriges Bild",
    next: "Nächstes Bild",
    enlarge: "Bild vergrößern",
    impressum: "Impressum",
    prepared: "Vorbereitet, noch nicht freigeschaltet",
  },
};

export default site;
