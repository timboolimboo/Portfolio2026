import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import site from "../src/data/site.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const esc = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

let letterIndex = 0;

function resetLetters() {
  letterIndex = 0;
}

function wordHtml(word, tone) {
  const chars = [...word].map((char) => {
    const mute = tone === "mute" || char === "." || char === "," || char === "—" || char === "–";
    const html = `<span class="char${mute ? " is-mute" : ""}" style="--i:${letterIndex}">${esc(char)}</span>`;
    letterIndex += 1;
    return html;
  });
  return `<span class="word">${chars.join("")}</span>`;
}

function letterHeading(tag, className, segments) {
  resetLetters();
  const words = segments
    .flatMap((segment) => segment.text.split(/\s+/).filter(Boolean).map((word) => wordHtml(word, segment.tone)))
    .join(" ");
  return `<${tag} class="${className}" data-letters>${words}</${tag}>`;
}

function placeholder(label, alt, extraClass = "") {
  return `<div class="ph ${extraClass}" role="img" aria-label="${esc(alt || label)}"><span>${esc(label)}</span></div>`;
}

function frameImage(image, { ratio = "16/9", fit = "contain", eager = false } = {}) {
  if (image.placeholder) {
    return `<div class="frame" style="--ratio:${ratio}">${placeholder(image.label, image.alt, "ph-fill")}</div>`;
  }
  return `<div class="frame" style="--ratio:${ratio}"><img src="${esc(image.src)}" alt="${esc(image.alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} class="fit-${fit}"></div>`;
}

function proseParagraphs(items) {
  return items
    .map((item) => {
      const text = typeof item === "string" ? item : item.text;
      const placeholderFlag = typeof item === "object" && item.placeholder;
      if (!placeholderFlag) return `<p>${esc(text)}</p>`;
      return `<p class="is-placeholder"><span class="ph-tag">Platzhalter</span> ${esc(text)}</p>`;
    })
    .join("");
}

function iconSvg(name) {
  const icons = {
    ux: `<svg class="icon icon-ux" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="10"/><circle cx="50" cy="50" r="22"/><circle cx="50" cy="50" r="34"/></svg>`,
    ui: `<svg class="icon icon-ui" viewBox="0 0 100 100" aria-hidden="true"><rect x="18" y="22" width="64" height="56" rx="8"/><path d="M18 38h64"/><rect x="28" y="48" width="18" height="18" rx="3"/><path d="M54 52h18M54 62h12"/></svg>`,
    digital: `<svg class="icon icon-digital" viewBox="0 0 100 100" aria-hidden="true"><rect x="18" y="18" width="26" height="26" rx="6"/><rect x="56" y="18" width="26" height="26" rx="6"/><rect x="18" y="56" width="26" height="26" rx="6"/><rect x="56" y="56" width="26" height="26" rx="6"/></svg>`,
    konzept: `<svg class="icon icon-konzept" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 16 84 50 50 84 16 50Z"/><path d="M50 34 66 50 50 66 34 50Z"/></svg>`,
  };
  return icons[name] || icons.ux;
}

function navHtml(activeHref) {
  const prepared = site.preparedSections.filter((section) => section.enabled);
  const items = [
    ...site.navigation.slice(0, 3),
    ...prepared.map((section) => ({ id: section.id, label: section.label, href: section.href })),
    site.navigation[3],
  ];
  const links = items
    .map((item) => {
      const current = item.href === activeHref;
      return `<a href="${esc(item.href)}"${current ? ' aria-current="page" class="is-active"' : ""}>${esc(item.label)}</a>`;
    })
    .join("");
  return `<nav aria-label="Hauptnavigation" class="nav">${links}</nav>`;
}

function headerHtml(activeHref) {
  const nav = navHtml(activeHref);
  return `<a class="skip" href="#inhalt">${esc(site.ui.skip)}</a>
<header class="site-header">
  <div class="wrap header-grid">
    <div class="brand-block">
      <p class="brand">${esc(site.person.brand)}</p>
      <p class="brand-meta" id="local-clock">— ${esc(site.person.location)}</p>
    </div>
    <div class="header-nav">${nav}</div>
  </div>
</header>
<header class="site-header-fixed" id="sticky-header" aria-hidden="true">
  <div class="wrap header-fixed-row">
    <p class="brand">${esc(site.person.brand)}</p>
    ${nav}
  </div>
</header>`;
}

function footerHtml() {
  const socials = site.contact.links
    .map(
      (link) =>
        `<a class="footer-link" href="${esc(link.href)}" target="_blank" rel="noopener noreferrer">${esc(link.label)}</a>`,
    )
    .join("");
  const prepared = site.preparedSections
    .map((section) => {
      if (section.enabled) {
        return `<a href="${esc(section.href)}">${esc(section.label)}</a>`;
      }
      return `<span>${esc(section.label)} — deaktiviert</span>`;
    })
    .join("");
  return `<footer id="kontakt" class="site-footer">
  <div class="wrap footer-stack">
    <div>
      <h2 class="footer-title">${esc(site.contact.headlineBefore)}<br>${esc(site.contact.headlineAfter)}</h2>
      <a class="footer-link footer-mail-full" href="mailto:${esc(site.person.email)}">${esc(site.person.email)}</a>
      <a class="footer-link footer-mail-short" href="mailto:${esc(site.person.email)}">${esc(site.contact.emailLabelShort)}</a>
    </div>
    <div class="footer-links">${socials}</div>
  </div>
  <div class="wrap footer-meta">
    <a href="/impressum">${esc(site.ui.impressum)}</a>
    ${prepared}
  </div>
</footer>`;
}

function clientsHtml() {
  const once = site.clients
    .map(
      (client) =>
        `<span class="wordmark" role="img" aria-label="${esc(client.name)}, ${esc(site.clientsNote)}">${esc(client.name)}</span>`,
    )
    .join("");
  const half = once.repeat(8);
  return `<section class="band band-marquee" aria-label="Kunden">
  <div class="marquee-mask">
    <div class="marquee-track">${half}${half}</div>
  </div>
  <p class="wrap clients-note">${esc(site.clientsNote)}</p>
</section>`;
}

function projectCard(project) {
  return `<a class="card" href="/arbeiten/${esc(project.slug)}">
    <div class="frame frame-poster"><img src="${esc(project.cover)}" alt="${esc(project.title)}" loading="lazy" class="fit-cover"></div>
    <p class="card-title">${esc(project.title)}</p>
    <p class="card-meta">${esc(project.summary)}</p>
  </a>`;
}

function explorationButton(item, group) {
  return `<button type="button" class="explore-btn" data-lightbox data-group="${esc(group)}" data-label="${esc(item.label)}" aria-label="${esc(site.ui.enlarge)}: ${esc(item.label)}">
    ${placeholder(item.label, item.alt, "ph-fill")}
  </button>`;
}

function reveal(html, { delay = 0, mode = "scroll" } = {}) {
  return `<div class="reveal" data-reveal="${mode}" style="--d:${delay}">${html}</div>`;
}

function pageShell({ title, description, active, main }) {
  const desc = description || site.meta.description;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.person.name,
    jobTitle: site.person.role,
    email: site.person.email,
    url: site.person.url,
    address: { "@type": "PostalAddress", addressLocality: "Hamm", addressCountry: "DE" },
    sameAs: site.person.sameAs,
  };
  return `<!DOCTYPE html>
<html lang="${site.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="de_DE">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/src/styles/main.css">
  <script>document.documentElement.classList.add("js")</script>
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body data-timezone="${esc(site.person.timezone)}" data-locale="${esc(site.person.locale)}" data-location="${esc(site.person.location)}">
${headerHtml(active)}
<main id="inhalt">
${main}
</main>
${footerHtml()}
<script type="module" src="/src/js/main.js"></script>
</body>
</html>
`;
}

function homePage() {
  const bySlug = Object.fromEntries(site.projects.map((project) => [project.slug, project]));
  const featured = site.home.work.featured.map((slug) => bySlug[slug]).filter(Boolean);
  const mosaic = site.explorations
    .slice(0, 4)
    .map((item) => explorationButton(item, "home"))
    .join("");
  const cards = featured.map((project) => projectCard(project)).join("");
  const services = site.services
    .map(
      (service, index) =>
        reveal(
          `<article class="service-card">
            <div>
              <p class="service-no">${esc(service.number)}</p>
              <div class="service-icon">${iconSvg(service.icon)}</div>
            </div>
            <div>
              <h3>${esc(service.title)}</h3>
              <p class="service-sub">${esc(service.subtitle)}</p>
              <p class="service-copy">${esc(service.text)}</p>
            </div>
          </article>`,
          { delay: index * 0.12 },
        ),
    )
    .join("");

  const main = `<section class="hero-section">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      ${letterHeading("h1", "display", site.home.headline)}
      ${reveal(`<p class="lede">${esc(site.home.lede)}</p>`, { mode: "load", delay: 0.12 })}
    </div>
    ${reveal(frameImage(site.home.portrait, { ratio: "3/4" }).replace('style="--ratio:3/4"', 'style="--ratio:3/4" data-portrait'), { mode: "load", delay: 0.18 })}
  </div>
</section>
<section class="wide-section">
  ${reveal(`<div class="wrap">${frameImage({ src: site.home.wideImage.src, alt: site.home.wideImage.alt }, { ratio: "16/9", fit: "cover" })}</div>`)}
</section>
<section class="band">
  <div class="wrap split">
    <p class="label">${esc(site.home.info.label)}</p>
    ${reveal(`<div><p class="prose-md">${esc(site.home.info.text)}</p><a class="quiet-link" href="${esc(site.home.info.moreHref)}">${esc(site.home.info.moreLabel)}</a></div>`)}
  </div>
</section>
<section class="band">
  <div class="wrap">
    <p class="label label-block">${esc(site.home.servicesLabel)}</p>
    <div class="service-grid">${services}</div>
  </div>
</section>
<section class="band">
  <div class="wrap">
    ${reveal(`<div class="split split-tight">
      <p class="label">${esc(site.home.work.label)}</p>
      <div>
        <p class="prose-sm">${esc(site.home.work.text)}</p>
        <a class="quiet-link" href="${esc(site.home.work.moreHref)}">${esc(site.home.work.moreLabel)}</a>
      </div>
    </div>`)}
    <div class="home-work">
      ${cards}
      <div>
        <div class="mosaic">${mosaic}</div>
        <p class="card-title">${esc(site.home.explorationsTitle)}</p>
        <p class="card-meta">${esc(site.home.explorationsMeta)}</p>
      </div>
    </div>
  </div>
</section>
${clientsHtml()}`;

  return pageShell({
    title: site.meta.title,
    active: "/",
    main,
  });
}

function aboutPage() {
  const paragraphs = site.about.paragraphs.map((text) => `<p>${esc(text)}</p>`).join("");
  const jobs = site.about.experience
    .map(
      (job, index) =>
        reveal(
          `<article class="job">
            <div class="job-head">
              <div class="job-id">
                <div class="mark" role="img" aria-label="${esc(job.markLabel)}">${esc(job.mark)}</div>
                <div>
                  <p class="job-org">${esc(job.org)}</p>
                  <p class="card-meta">${esc(job.role)}</p>
                </div>
              </div>
              <p class="job-period">${esc(job.period)}</p>
            </div>
            <div class="job-copy">${job.paragraphs.map((text) => `<p>${esc(text)}</p>`).join("")}</div>
          </article>`,
          { delay: index * 0.12 },
        ),
    )
    .join("");

  const main = `<section class="about-hero">
  ${reveal(`<div class="wrap">${frameImage(site.about.hero, { ratio: "3/4" })}</div>`)}
</section>
<section class="band band-tight">
  <div class="wrap split">
    <p class="label">${esc(site.about.infoLabel)}</p>
    ${reveal(`<div class="stack prose-md">${paragraphs}</div>`)}
  </div>
</section>
<section class="band band-tight">
  <div class="wrap split">
    <p class="label">${esc(site.about.experienceLabel)}</p>
    <div class="jobs">${jobs}</div>
  </div>
</section>
${clientsHtml()}`;

  return pageShell({
    title: site.about.title,
    active: "/ueber-mich",
    main,
  });
}

function workPage() {
  const cards = site.projects
    .map((project, index) => reveal(projectCard(project), { delay: index * 0.08 }))
    .join("");
  const explorations = site.explorations.map((item) => explorationButton(item, "work")).join("");
  const main = `<section class="work-hero">
  <div class="wrap split">
    <div class="desktop-only"></div>
    ${letterHeading("h1", "display display-work", site.workPage.headline)}
  </div>
</section>
<section class="work-list">
  <div class="wrap">
    ${reveal(`<p class="label studies-label">${esc(site.workPage.studiesLabel)}</p>`)}
    <div class="study-grid">${cards}</div>
  </div>
</section>
<section class="band band-tight">
  <div class="wrap">
    ${reveal(`<p class="label label-block">${esc(site.workPage.explorationsLabel)}</p>
    <div class="explore-grid">${explorations}</div>`)}
  </div>
</section>`;

  return pageShell({
    title: site.workPage.title,
    active: "/arbeiten",
    main,
  });
}

function casePage(project, next) {
  const images = project.images;
  const meta = [
    [site.ui.year, project.year, true],
    [site.ui.role, project.role, false],
    [site.ui.type, project.type, false],
    [site.ui.link, project.link ? project.link.label || site.ui.visit : "Platzhalter", !project.link],
  ];
  const metaHtml = meta
    .map(([label, value, isPlaceholder], index) => {
      const valueHtml =
        label === site.ui.link && project.link
          ? `<a class="meta-link" href="${esc(project.link.href)}" target="_blank" rel="noopener noreferrer">${esc(value)}</a>`
          : `<p class="meta-value${isPlaceholder ? " is-placeholder-value" : ""}">${esc(value)}</p>`;
      return reveal(
        `<div><p class="meta-label">${esc(label)}</p>${valueHtml}</div>`,
        { mode: "load", delay: 0.08 + index * 0.06 },
      );
    })
    .join("");

  const hero = images[0];
  const second = images[1];
  const rest = images.slice(2);
  const grid = rest
    .map(
      (image) =>
        `<div class="frame" style="--ratio:16/9"><img src="${esc(image.src)}" alt="${esc(image.alt)}" loading="lazy" class="fit-contain"></div>`,
    )
    .join("");

  const main = `<section class="case-top">
  <div class="wrap split">
    <div class="desktop-only"></div>
    <div>
      ${letterHeading("h1", "display", [{ text: project.title, tone: "ink" }])}
      <div class="meta-row">${metaHtml}</div>
    </div>
  </div>
</section>
${reveal(`<section class="case-media"><div class="wrap">${frameImage(hero, { ratio: "16/9", fit: "contain" })}</div></section>`)}
<section class="case-copy">
  <div class="wrap split">
    <div></div>
    ${reveal(`<div class="stack prose-md">${proseParagraphs(project.intro)}</div>`)}
  </div>
</section>
${
  second
    ? reveal(`<section class="case-media"><div class="wrap">${frameImage(second, { ratio: "16/9", fit: "contain" })}</div></section>`)
    : ""
}
<section class="band band-tight">
  <div class="wrap split">
    <p class="label">${esc(site.ui.goalsLabel)}</p>
    ${reveal(`<div class="stack prose-md">${proseParagraphs(project.goals)}</div>`)}
  </div>
</section>
${
  grid
    ? reveal(`<section class="case-grid-section"><div class="wrap case-grid">${grid}</div></section>`)
    : ""
}
<a class="next-project" href="/arbeiten/${esc(next.slug)}">
  <div class="wrap next-row">
    <div>
      <p class="meta-label">${esc(site.ui.nextProject)}</p>
      <p class="next-title">${esc(next.title)}</p>
    </div>
    <span class="next-view">${esc(site.ui.viewProject)}</span>
  </div>
</a>`;

  return pageShell({
    title: `${project.title} — ${site.person.name}`,
    description: `${project.title}. ${project.role}. ${project.type}.`,
    active: "/arbeiten",
    main,
  });
}

function preparedPage(section) {
  const main = `<section class="work-hero">
  <div class="wrap split">
    <div class="desktop-only"></div>
    <div>
      ${section.kicker ? `<p class="kicker">${esc(section.kicker)}</p>` : ""}
      ${letterHeading("h1", "display", section.headline)}
    </div>
  </div>
</section>
<section class="band">
  <div class="wrap split">
    <p class="label">${esc(section.label)}</p>
    ${reveal(`<div class="stack">
      <div class="frame" style="--ratio:16/9">${placeholder("Platzhalter", section.intro, "ph-fill")}</div>
      <p class="is-placeholder prose-md"><span class="ph-tag">Platzhalter</span> ${esc(section.intro)}</p>
    </div>`)}
  </div>
</section>`;
  return pageShell({
    title: section.title,
    description: section.intro,
    active: section.href,
    main,
  });
}

function impressumPage() {
  const lines = site.impressum.lines.map((line) => `<p>${esc(line)}</p>`).join("");
  const blocks = site.impressum.blocks
    .map(
      (block) =>
        `<section class="legal-block"><h2>${esc(block.heading)}</h2>${block.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}</section>`,
    )
    .join("");
  const main = `<section class="band legal-top">
  <div class="wrap split">
    <p class="label">${esc(site.impressum.label)}</p>
    <div class="stack prose-md">
      <p>${esc(site.impressum.intro)}</p>
      <div class="legal-address">${lines}</div>
      ${blocks}
    </div>
  </div>
</section>`;
  return pageShell({
    title: site.impressum.title,
    description: "Impressum und Angaben gemäß § 5 TMG von Tim Kattenbusch, Hamm.",
    active: "",
    main,
  });
}

export function renderSite() {
  const files = new Map();
  files.set("index.html", homePage());
  files.set("ueber-mich.html", aboutPage());
  files.set("arbeiten.html", workPage());
  files.set("impressum.html", impressumPage());

  site.projects.forEach((project, index) => {
    const next = site.projects[(index + 1) % site.projects.length];
    files.set(`arbeiten/${project.slug}.html`, casePage(project, next));
  });

  for (const section of site.preparedSections) {
    if (!section.enabled) continue;
    const file = `${section.href.replace(/^\//, "")}.html`;
    files.set(file, preparedPage(section));
  }

  const written = [];
  for (const [relativePath, html] of files) {
    const absolute = resolve(root, relativePath);
    mkdirSync(dirname(absolute), { recursive: true });
    writeFileSync(absolute, html);
    written.push(absolute);
  }

  const manifestDir = resolve(root, "generated");
  mkdirSync(manifestDir, { recursive: true });
  writeFileSync(resolve(manifestDir, "manifest.json"), JSON.stringify(written, null, 2));
  return written;
}

const isDirectRun = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  const pages = renderSite();
  console.log(`rendered ${pages.length} pages`);
}

export { site };
