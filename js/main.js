(function () {
  "use strict";

  const root = document.documentElement;

  const themeBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  function renderThemeIcon() {
    themeIcon.textContent = root.getAttribute("data-theme") === "dark" ? "☀️" : "🌙";
  }

  themeBtn.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    renderThemeIcon();
  });
  renderThemeIcon();

  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  function setMenu(open) {
    navMenu.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  }

  navToggle.addEventListener("click", function () {
    setMenu(!navMenu.classList.contains("is-open"));
  });
  navMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
  });

  const typingEl = document.getElementById("typing");
  const words = ["Full Stack", "Web", "de Software", "Autodidacta"]; // TODO: editá a gusto
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    typingEl.textContent = words[0];
  } else {
    let wordIdx = 0;
    let charIdx = 0;
    let deleting = false;

    (function tick() {
      const word = words[wordIdx];
      charIdx += deleting ? -1 : 1;
      typingEl.textContent = word.slice(0, charIdx);

      let delay = deleting ? 50 : 100;
      if (!deleting && charIdx === word.length) {
        delay = 1500;
        deleting = true;
      } else if (deleting && charIdx === 0) {
        deleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        delay = 400;
      }
      setTimeout(tick, delay);
    })();
  }

  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();