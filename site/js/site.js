/* ============================================================
   GlanzWerkstatt - behaviour: nav scroll state and the
   mobile overlay menu. Content is fully readable without JavaScript.
   ============================================================ */
(function () {
  "use strict";

  /* ---- Nav scroll state -------------------------------------
     Threshold is read once. Uses a passive listener plus rAF so it
     cannot become an INP problem on a long page. */
  var nav = document.querySelector("[data-nav]");
  if (nav) {
    var ticking = false;
    var apply = function () {
      nav.classList.toggle("nav--scrolled", window.scrollY > 64);
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(apply); }
    }, { passive: true });
    apply();
  }

  /* ---- Mobile booking bar -----------------------------------
     Visible only once the hero has scrolled away and until the closing
     CTA (#kontakt) enters the viewport, so it never duplicates a
     booking button already on screen. CSS limits it to narrow screens;
     without JavaScript it simply stays hidden. */
  var bar = document.querySelector("[data-mbar]");
  var hero = document.querySelector(".hero");
  var end = document.getElementById("kontakt");
  if (bar && hero && end) {
    var barTicking = false;
    var applyBar = function () {
      var show = hero.getBoundingClientRect().bottom < 0 &&
                 end.getBoundingClientRect().top > window.innerHeight;
      bar.setAttribute("data-show", show ? "true" : "false");
      barTicking = false;
    };
    var queueBar = function () {
      if (!barTicking) { barTicking = true; window.requestAnimationFrame(applyBar); }
    };
    window.addEventListener("scroll", queueBar, { passive: true });
    window.addEventListener("resize", queueBar, { passive: true });
    applyBar();
  }

  /* ---- Inquiry form -----------------------------------------
     There is no form backend yet. The submit event only fires once the
     native validation has passed; the entries are then written into the
     booking email and handed to the mail client. For a real endpoint,
     point the form's action at it and remove data-mailto - this handler
     then does nothing and the browser submits normally. */
  var form = document.querySelector("form[data-mailto]");
  if (form) {
    var status = document.querySelector("[data-inq-status]");
    var dateField = form.elements.wunschdatum;
    if (dateField) {
      var now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      dateField.min = now.toISOString().slice(0, 10);
    }

    form.addEventListener("submit", function (e) {
      var to = form.getAttribute("data-mailto");
      if (!to) return;
      e.preventDefault();

      var val = function (name) {
        var el = form.elements[name];
        return el ? el.value.trim() : "";
      };
      var opt = function (v) { return v || "keine Angabe"; };
      var date = val("wunschdatum");
      if (/^\d{4}-\d{2}-\d{2}$/.test(date)) date = date.split("-").reverse().join(".");

      var body = [
        "Hallo GlanzWerkstatt,",
        "",
        "ich möchte gerne einen Termin anfragen.",
        "",
        "Vorname: " + val("vorname"),
        "Telefon / WhatsApp: " + opt(val("telefon")),
        "Fahrzeugmodell: " + val("modell"),
        "Fahrzeugklasse: " + val("klasse"),
        "Leistung: " + val("leistung"),
        "Wunschdatum: " + opt(date),
        "Besonderheiten / Verschmutzung: " + opt(val("nachricht").replace(/\r?\n/g, "\r\n")),
        "",
        "Optional kann ich Fotos des Fahrzeugs anhängen.",
        "",
        "Viele Grüße",
        val("vorname")
      ].join("\r\n");

      window.location.href = "mailto:" + to +
        "?subject=" + encodeURIComponent("Terminanfrage – GlanzWerkstatt") +
        "&body=" + encodeURIComponent(body);

      if (status) {
        status.textContent = "Ihre Anfrage wurde in Ihrem E-Mail-Programm vorbereitet. " +
          "Bitte senden Sie die E-Mail dort ab. Falls sich nichts geöffnet hat, " +
          "schreiben Sie direkt an " + to + ".";
      }
    });
  }

  /* ---- Mobile overlay menu ----------------------------------
     Focus is trapped while open, Escape closes, focus returns to the
     trigger, and body scroll is locked without the iOS position:fixed
     scroll jump. */
  var menu = document.getElementById("m-menu");
  var openBtn = document.querySelector("[data-menu-open]");
  var closeBtn = document.querySelector("[data-menu-close]");

  if (menu && openBtn) {
    var lastFocus = null;
    var FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

    var setOpen = function (open) {
      menu.setAttribute("data-open", open ? "true" : "false");
      openBtn.setAttribute("aria-expanded", open ? "true" : "false");
      document.documentElement.style.overflow = open ? "hidden" : "";

      if (open) {
        lastFocus = document.activeElement;
        /* focus() into a still-hidden subtree is silently dropped. The
           CSS flips visibility with no transition delay on open, but the
           new style has to be committed first - reading offsetHeight
           forces that synchronously. Deliberately not requestAnimationFrame:
           frame callbacks do not fire in a background tab, and focus
           management must not depend on frame scheduling. */
        void menu.offsetHeight;
        var first = menu.querySelector(FOCUSABLE);
        if (first) first.focus();
      } else {
        /* Always return focus to the trigger, not to whatever happened
           to be focused when the menu opened. */
        (openBtn || lastFocus).focus();
      }
    };

    openBtn.addEventListener("click", function () { setOpen(true); });
    if (closeBtn) closeBtn.addEventListener("click", function () { setOpen(false); });

    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (menu.getAttribute("data-open") !== "true") return;

      if (e.key === "Escape") { setOpen(false); return; }

      if (e.key === "Tab") {
        var items = Array.prototype.slice.call(menu.querySelectorAll(FOCUSABLE));
        if (!items.length) return;
        var first = items[0];
        var last = items[items.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    });
  }
})();
