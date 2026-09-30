/**
 * ==========================================================================
 * MAINAKER DOLBOL — MAIN APPLICATION CONTROLLER, ANIMATIONS & INTERACTIONS
 * File: js/main.js
 * ==========================================================================
 */

// REPLACE HERO SLIDESHOW IMAGES BELOW
const heroSlides = [
  "assets/hero/band-1.png",
  "assets/hero/band-2.jpg",
  "assets/hero/band-3.jpg"
];

/**
 * 1. PREMIUM LOADING SCREEN
 */
function initLoader() {
  const loader = document.getElementById("loader");
  const bar = document.getElementById("loaderBar");
  const percentEl = document.getElementById("loaderPercent");
  if (!loader) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 18) + 14;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      if (bar) bar.style.width = "100%";
      if (percentEl) percentEl.textContent = "100%";

      setTimeout(() => {
        loader.classList.add("is-hidden");
        triggerInitialHeroReveals();
      }, 280);
    } else {
      if (bar) bar.style.width = `${progress}%`;
      if (percentEl) percentEl.textContent = `${progress}%`;
    }
  }, 110);
}

function triggerInitialHeroReveals() {
  document
    .querySelectorAll(".hero-section .reveal-up, .hero-section .reveal-fade")
    .forEach((el) => el.classList.add("is-visible"));
}

/**
 * 2. STICKY NAVIGATION, SCROLL-SPY & FULL-SCREEN MOBILE MENU
 */
function initNavigation() {
  const header = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  const updateHeaderScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  };

  window.addEventListener("scroll", updateHeaderScroll, { passive: true });
  updateHeaderScroll();

  // Mobile Menu Toggle
  function closeMobileMenu() {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    menuToggle.classList.remove("is-active");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("is-open");
      mobileMenu.setAttribute("aria-hidden", isOpen ? "false" : "true");
      menuToggle.classList.toggle("is-active", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) {
        closeMobileMenu();
      }
    });
  }

  // Active Section Scroll-Spy
  const sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window && sections.length) {
    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              const match = link.dataset.section === id;
              link.classList.toggle("active", match);
            });
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    sections.forEach((sec) => spyObserver.observe(sec));
  }
}

/**
 * 3. HERO BACKGROUND SLIDESHOW (6-8s Crossfade + Manual Indicators)
 */
function initHeroSlideshow() {
  const slideElements = document.querySelectorAll(".hero-slide");
  const indicators = document.querySelectorAll(".hero-indicator");
  const counterCurrent = document.getElementById("heroSlideCurrent");
  if (!slideElements.length) return;

  // Respect custom image sources in index.html, falling back to heroSlides array
  slideElements.forEach((slideEl, idx) => {
    const img = slideEl.querySelector("img");
    if (img && !img.getAttribute("src") && heroSlides[idx]) {
      img.src = heroSlides[idx];
    }
  });

  let activeIndex = 0;
  let slideTimer = null;

  function goToSlide(index) {
    activeIndex = (index + slideElements.length) % slideElements.length;

    slideElements.forEach((slide, idx) => {
      slide.classList.toggle("active", idx === activeIndex);
    });

    indicators.forEach((ind, idx) => {
      const isAct = idx === activeIndex;
      ind.classList.toggle("active", isAct);
      ind.setAttribute("aria-selected", isAct ? "true" : "false");
    });

    if (counterCurrent) {
      counterCurrent.textContent = String(activeIndex + 1).padStart(2, "0");
    }
  }

  function startAutoSlide() {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => {
      goToSlide(activeIndex + 1);
    }, 7000);
  }

  indicators.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = Number(btn.dataset.slideTo);
      goToSlide(target);
      startAutoSlide();
    });
  });

  startAutoSlide();
}

/**
 * 4. HERO DESKTOP MOUSE PARALLAX & FLOATING LIGHT PARTICLES
 */
function initHeroParallaxAndParticles() {
  const isDesktopPointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const bgWrapper = document.getElementById("heroParallaxBg");
  const contentWrapper = document.getElementById("heroParallaxContent");

  if (isDesktopPointer && bgWrapper && contentWrapper) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener(
      "mousemove",
      (e) => {
        const normX = e.clientX / window.innerWidth - 0.5;
        const normY = e.clientY / window.innerHeight - 0.5;
        targetX = normX;
        targetY = normY;
      },
      { passive: true }
    );

    function animateParallax() {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      // Keep background photo crisp and apply subtle shift to foreground content only
      contentWrapper.style.transform = `translate3d(${(currentX * 3).toFixed(1)}px, ${(currentY * 2).toFixed(1)}px, 0)`;

      requestAnimationFrame(animateParallax);
    }

    requestAnimationFrame(animateParallax);
  }

  // Subtle Floating Particles Canvas inside Hero
  const canvas = document.getElementById("heroParticles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener(
    "resize",
    () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    },
    { passive: true }
  );

  const particleCount = window.innerWidth < 768 ? 14 : 28;
  const particles = Array.from({ length: particleCount }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.8 + 0.6,
    vx: (Math.random() - 0.5) * 0.22,
    vy: -Math.random() * 0.35 - 0.1,
    alpha: Math.random() * 0.45 + 0.12,
    gold: Math.random() > 0.45
  }));

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) p.y = height + 10;
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.gold
        ? `rgba(212, 175, 55, ${p.alpha})`
        : `rgba(225, 29, 72, ${p.alpha})`;
      ctx.fill();
    }
    requestAnimationFrame(drawParticles);
  }

  requestAnimationFrame(drawParticles);
}

/**
 * 5. CUSTOM DESKTOP CURSOR ("VIEW" / "PLAY") & MAGNETIC BUTTONS
 */
function initCustomCursor() {
  const isDesktopPointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!isDesktopPointer) return;

  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  const label = document.getElementById("cursorLabel");
  const spotlight = document.getElementById("cursorSpotlight");

  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener(
    "mousemove",
    (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
      if (spotlight) {
        spotlight.style.left = `${mouseX}px`;
        spotlight.style.top = `${mouseY}px`;
      }
    },
    { passive: true }
  );

  function renderCursorRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(renderCursorRing);
  }
  requestAnimationFrame(renderCursorRing);

  // Contextual Hover Detection ("VIEW", "PLAY", or standard interactive expand)
  document.addEventListener("mouseover", (e) => {
    const customTarget = e.target.closest("[data-cursor]");
    if (customTarget) {
      const mode = customTarget.dataset.cursor;
      document.body.classList.remove("cursor-hover", "cursor-mode-view", "cursor-mode-play");
      if (mode === "view") {
        document.body.classList.add("cursor-mode-view");
        if (label) label.textContent = "VIEW";
      } else if (mode === "play") {
        document.body.classList.add("cursor-mode-play");
        if (label) label.textContent = "PLAY";
      }
      return;
    }

    const interactive = e.target.closest("a, button, input, select, textarea, [role='button']");
    if (interactive) {
      document.body.classList.remove("cursor-mode-view", "cursor-mode-play");
      document.body.classList.add("cursor-hover");
      if (label) label.textContent = "";
    } else {
      document.body.classList.remove("cursor-hover", "cursor-mode-view", "cursor-mode-play");
      if (label) label.textContent = "";
    }
  });

  // Subtle Magnetic Button Interaction
  document.querySelectorAll(".magnetic-btn").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.16}px, ${y * 0.22}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
}

/**
 * 6. SCROLL REVEAL ANIMATIONS & BAND STATISTICS COUNTERS
 */
function initScrollRevealAndCounters() {
  const revealItems = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right, .reveal-fade"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach((el) => revealObserver.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add("is-visible"));
  }

  // Animated Number Counters in #stats
  const counters = document.querySelectorAll(".stat-counter");
  if (!counters.length) return;

  function animateCounter(el) {
    const target = Number(el.dataset.target) || 0;
    const suffix = el.dataset.suffix || "";
    const duration = 1800;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(target * eased);
      el.textContent = `${currentVal}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${target}${suffix}`;
      }
    }

    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );

    counters.forEach((c) => counterObserver.observe(c));
  } else {
    counters.forEach(animateCounter);
  }
}

/**
 * 7. DIALOG MODALS CLOSE HANDLERS & LIGHT-DISMISS FALLBACK
 */
function initDialogsAndFallbacks() {
  // Close button handler for all modals with [data-close-modal]
  document.addEventListener("click", (e) => {
    const closeBtn = e.target.closest("[data-close-modal]");
    if (!closeBtn) return;
    const modalId = closeBtn.dataset.closeModal;
    const modal = document.getElementById(modalId);
    if (modal && typeof modal.close === "function") {
      modal.close();
    }
  });

  // Fallback for browsers without native <dialog closedby="any"> support
  const dialogs = document.querySelectorAll("dialog.modal-dialog");
  if (typeof HTMLDialogElement !== "undefined" && !("closedBy" in HTMLDialogElement.prototype)) {
    dialogs.forEach((dialog) => {
      dialog.addEventListener("click", (event) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;

        if (isDialogContent) return;
        dialog.close();
      });
    });
  }

  // Legal Links (Privacy Policy / Terms) quick view using Artist Modal shell
  document.querySelectorAll("[data-legal-modal]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const type = link.dataset.legalModal;
      const modal = document.getElementById("artistModal");
      const container = document.getElementById("artistModalContent");
      if (!modal || !container) return;

      const isPrivacy = type === "privacy";
      container.innerHTML = `
        <div class="modal-header">
          <div>
            <span class="modal-eyebrow">LEGAL INFORMATION</span>
            <h2 class="modal-title">${isPrivacy ? "PRIVACY POLICY" : "TERMS & CONDITIONS"}</h2>
          </div>
          <button type="button" class="modal-close-btn" data-close-modal="artistModal" aria-label="Close legal modal">
            <span>ESC</span> &times;
          </button>
        </div>
        <div style="color: var(--text-secondary); display: flex; flex-direction: column; gap: 1rem;">
          <p><strong>MAINAKER DOLBOL Official Collective (${new Date().getFullYear()})</strong></p>
          <p>${
            isPrivacy
              ? "We respect your privacy. Contact details submitted through our Booking Desk are used exclusively by MAINAKER DOLBOL management to coordinate live performances, technical riders, and event contracts. We never sell or distribute client data to third parties."
              : "All audio recordings, stage photography, visual branding, and concert films featured on this portfolio are the exclusive intellectual property of MAINAKER DOLBOL. Live performance bookings are subject to formal contract execution and technical rider approval."
          }</p>
        </div>
      `;
      modal.showModal();
    });
  });
}

// Initialize all systems once DOM and deferred scripts have executed
document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initNavigation();
  initHeroSlideshow();
  initHeroParallaxAndParticles();
  initCustomCursor();
  initScrollRevealAndCounters();
  initDialogsAndFallbacks();
});

