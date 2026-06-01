/**
 * VisioClinical AI — site interactions (vanilla JS)
 */

(function () {
  "use strict";

  const header = document.getElementById("site-header");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  /* ----- Sticky / transparent navbar ----- */
  function updateHeader() {
    if (!header) return;
    const scrolled = window.scrollY > 24;
    const isHome = Boolean(document.querySelector(".hero-zone"));
    if (isHome) {
      header.classList.toggle("is-scrolled", scrolled);
      header.classList.toggle("is-transparent", !scrolled);
    } else {
      header.classList.add("is-scrolled");
      header.classList.remove("is-transparent");
    }
    header.classList.remove("header--hero-image");
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* ----- Mobile menu ----- */
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      navMenu.classList.toggle("is-open", !open);
      document.body.style.overflow = open ? "" : "hidden";
    });

    navMenu.querySelectorAll(".nav__link").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ----- Scroll reveal ----- */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ----- Animated stat counters ----- */
  function animateCounter(el, target, duration) {
    const start = performance.now();
    const isZeroSpecial = target === 0;

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (isZeroSpecial) {
        el.textContent = progress >= 1 ? "0" : "";
      } else {
        el.textContent = String(Math.round(eased * target));
      }
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const statNumbers = document.querySelectorAll(".stat-card__number[data-count]");
  if (statNumbers.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.getAttribute("data-count"), 10);
          animateCounter(el, target, 1200);
          statObserver.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    statNumbers.forEach((el) => statObserver.observe(el));
  } else {
    statNumbers.forEach((el) => {
      el.textContent = el.getAttribute("data-count");
    });
  }

  /* ----- Value proposition tabs ----- */
  const tabsRoot = document.querySelector("[data-tabs]");
  if (tabsRoot) {
    const buttons = tabsRoot.querySelectorAll(".tabs__btn");
    const panels = tabsRoot.querySelectorAll(".tabs__panel");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const panelId = btn.getAttribute("aria-controls");
        buttons.forEach((b) => {
          b.classList.remove("tabs__btn--active");
          b.setAttribute("aria-selected", "false");
        });
        panels.forEach((p) => {
          p.classList.remove("tabs__panel--active");
          p.hidden = true;
        });
        btn.classList.add("tabs__btn--active");
        btn.setAttribute("aria-selected", "true");
        const panel = document.getElementById(panelId);
        if (panel) {
          panel.classList.add("tabs__panel--active");
          panel.hidden = false;
        }
      });
    });
  }

  /* ----- FAQ accordion ----- */
  const accordion = document.querySelector("[data-accordion]");
  if (accordion) {
    accordion.querySelectorAll(".faq-item__trigger").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const item = trigger.closest(".faq-item");
        const panel = item.querySelector(".faq-item__panel");
        const isOpen = item.classList.contains("is-open");

        accordion.querySelectorAll(".faq-item").forEach((other) => {
          if (other === item) return;
          other.classList.remove("is-open");
          const otherTrigger = other.querySelector(".faq-item__trigger");
          const otherPanel = other.querySelector(".faq-item__panel");
          otherTrigger.setAttribute("aria-expanded", "false");
          otherPanel.hidden = true;
        });

        item.classList.toggle("is-open", !isOpen);
        trigger.setAttribute("aria-expanded", String(!isOpen));
        panel.hidden = isOpen;
      });
    });
  }

})();
