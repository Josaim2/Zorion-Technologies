(function () {
  "use strict";

  var STORAGE_KEY = "zorion-lang";
  var DEFAULT_LANG = "en";

  function getStoredLang() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* ignore */
    }
  }

  function resolveKey(dict, path) {
    var parts = path.split(".");
    var node = dict;
    for (var i = 0; i < parts.length; i++) {
      if (node == null) return null;
      node = node[parts[i]];
    }
    return node;
  }

  function applyLang(lang) {
    var dict = window.ZORION_I18N[lang];
    if (!dict) return;

    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var value = resolveKey(dict, el.getAttribute("data-i18n"));
      if (value == null) return;

      var attr = el.getAttribute("data-i18n-attr");
      if (attr) {
        el.setAttribute(attr, value);
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    storeLang(lang);
  }

  function initLangSwitch() {
    var initial = getStoredLang() || DEFAULT_LANG;
    applyLang(initial);

    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLang(btn.getAttribute("data-lang"));
      });
    });
  }

  function initNavToggle() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var emailEl = document.querySelector('[data-i18n="contact.detailEmailValue"]');
      var to = emailEl ? emailEl.textContent.trim() : "";
      var name = form.querySelector("#name").value.trim();
      var company = form.querySelector("#company").value.trim();
      var email = form.querySelector("#email").value.trim();
      var message = form.querySelector("#message").value.trim();

      var subject = "Website inquiry — " + name + (company ? " (" + company + ")" : "");
      var body = message + "\n\n—\n" + name + (company ? "\n" + company : "") + "\n" + email;

      window.location.href = "mailto:" + to +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
    });
  }

  function initReveal() {
    // Auto-tag common blocks so each page gets scroll-reveal without extra markup
    var selectors = [
      ".hero-inner > *",
      ".card-grid .card",
      ".ind-teaser-grid .ind-tile",
      ".ind-grid .ind-card",
      ".svc-grid .svc-card",
      ".step-row .step-card",
      ".mission-grid > div",
      ".feature-row > div",
      ".cta-band",
      ".page-hero .container > *",
      ".contact-grid > div"
    ];
    var els = document.querySelectorAll(selectors.join(", "));

    els.forEach(function (el) {
      el.classList.add("reveal");
      // Stagger siblings inside the same parent
      var siblings = el.parentElement ? el.parentElement.children : [];
      var index = Array.prototype.indexOf.call(siblings, el);
      el.style.setProperty("--reveal-delay", Math.min(index, 5) * 90 + "ms");
    });

    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    els.forEach(function (el) { io.observe(el); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLangSwitch();
    initNavToggle();
    initContactForm();
    initReveal();
  });
})();
