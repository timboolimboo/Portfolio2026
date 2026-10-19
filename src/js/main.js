import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function cubicBezier(x1, y1, x2, y2) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t) => ((ay * t + by) * t + cy) * t;
  const sampleDX = (t) => (3 * ax * t + 2 * bx) * t + cx;
  const solveX = (x) => {
    let t = x;
    for (let i = 0; i < 6; i += 1) {
      const delta = sampleX(t) - x;
      const slope = sampleDX(t);
      if (Math.abs(delta) < 1e-5 || slope === 0) break;
      t -= delta / slope;
    }
    return t;
  };
  return (x) => sampleY(solveX(x));
}

const rise = cubicBezier(0.25, 0.1, 0.25, 1);

function animateIn() {
  if (reduced) return;

  const letters = document.querySelectorAll("[data-letters] .char");
  if (letters.length) {
    gsap.to(letters, {
      y: 0,
      opacity: 1,
      duration: 0.45,
      delay: 0.05,
      stagger: 0.018,
      ease: rise,
    });
  }

  document.querySelectorAll("[data-reveal]").forEach((element) => {
    const delay = Number.parseFloat(getComputedStyle(element).getPropertyValue("--d")) || 0;
    const vars = { y: 0, opacity: 1, duration: 0.6, delay, ease: rise };
    if (element.dataset.reveal === "load") {
      gsap.to(element, vars);
      return;
    }
    gsap.to(element, {
      ...vars,
      scrollTrigger: {
        trigger: element,
        start: "top bottom-=40",
        once: true,
      },
    });
  });
}

function stickyHeader() {
  const header = document.getElementById("sticky-header");
  if (!header) return;
  let last = 0;
  const onScroll = () => {
    const y = window.scrollY;
    const show = y >= 80 && y < last;
    header.classList.toggle("is-in", show);
    header.setAttribute("aria-hidden", show ? "false" : "true");
    last = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
}

function localClock() {
  const node = document.getElementById("local-clock");
  if (!node) return;
  const { timezone, locale, location } = document.body.dataset;
  const render = () => {
    const now = new Date();
    const date = new Intl.DateTimeFormat(locale || "de-DE", {
      day: "2-digit",
      month: "short",
      timeZone: timezone || "Europe/Berlin",
    }).format(now);
    const time = new Intl.DateTimeFormat(locale || "de-DE", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: timezone || "Europe/Berlin",
    }).format(now);
    node.textContent = `${date} — ${time} ${location || ""}`.trim();
  };
  render();
  window.setInterval(render, 30000);
}

function smoothHashLinks() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY;
      if (reduced) {
        window.scrollTo(0, top);
        return;
      }
      const start = window.scrollY;
      const change = top - start;
      let stamp = null;
      const step = (now) => {
        if (stamp === null) stamp = now;
        const t = Math.min((now - stamp) / 900, 1);
        const eased = 1 - (1 - t) ** 3;
        window.scrollTo(0, start + change * eased);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  });
}

function lightbox() {
  const triggers = [...document.querySelectorAll("[data-lightbox]")];
  if (!triggers.length) return;

  const root = document.createElement("div");
  root.className = "lightbox";
  root.hidden = true;
  root.innerHTML = `
    <button class="lightbox-ui lightbox-close" type="button" aria-label="Schließen">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M1 1l14 14M15 1L1 15" stroke="white" stroke-width="1.8" stroke-linecap="round"/></svg>
    </button>
    <button class="lightbox-ui lightbox-prev" type="button" aria-label="Vorheriges Bild">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 2L4 8l6 6" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
    <button class="lightbox-ui lightbox-next" type="button" aria-label="Nächstes Bild">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 2l6 6-6 6" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
    <div class="lightbox-figure"></div>
    <p class="lightbox-count"></p>
  `;
  document.body.appendChild(root);

  const figure = root.querySelector(".lightbox-figure");
  const count = root.querySelector(".lightbox-count");
  let items = [];
  let index = 0;

  const paint = () => {
    const item = items[index];
    figure.innerHTML = "";
    if (item.src) {
      const image = document.createElement("img");
      image.src = item.src;
      image.alt = item.alt;
      figure.appendChild(image);
    } else {
      const block = document.createElement("div");
      block.className = "ph";
      block.setAttribute("role", "img");
      block.setAttribute("aria-label", item.alt);
      const label = document.createElement("span");
      label.textContent = item.label;
      block.appendChild(label);
      figure.appendChild(block);
    }
    count.textContent = `${index + 1} / ${items.length}`;
  };

  const open = (group, start) => {
    items = triggers
      .filter((node) => node.dataset.group === group)
      .map((node) => ({
        src: node.dataset.src || "",
        alt: node.dataset.label || node.getAttribute("aria-label") || "",
        label: node.dataset.label || "",
      }));
    index = start;
    paint();
    root.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    root.hidden = true;
    document.body.style.overflow = "";
  };

  const shift = (direction) => {
    index = (index + direction + items.length) % items.length;
    paint();
  };

  triggers.forEach((node, nodeIndex) => {
    node.addEventListener("click", () => {
      const group = node.dataset.group;
      const start = triggers.filter((item) => item.dataset.group === group).indexOf(node);
      open(group, start === -1 ? nodeIndex : start);
    });
  });

  root.querySelector(".lightbox-close").addEventListener("click", close);
  root.querySelector(".lightbox-prev").addEventListener("click", (event) => {
    event.stopPropagation();
    shift(-1);
  });
  root.querySelector(".lightbox-next").addEventListener("click", (event) => {
    event.stopPropagation();
    shift(1);
  });
  root.addEventListener("click", (event) => {
    if (event.target === root) close();
  });
  window.addEventListener("keydown", (event) => {
    if (root.hidden) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowRight") shift(1);
    if (event.key === "ArrowLeft") shift(-1);
  });
}

animateIn();
stickyHeader();
localClock();
smoothHashLinks();
lightbox();
