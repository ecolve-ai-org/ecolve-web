/* ==========================================================
   main.js — interactions. Vanilla JS, no dependencies.
   ========================================================== */
(function () {
  var S = window.SITE || {};
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---- hero product showcase (home) ---- */
  (function () {
    var sc = $("#showcase");
    if (!sc) return;
    var tabs = $$(".sc-tab", sc), slides = $$(".sc-slide", sc), prog = $(".sc-progress", sc), bar = $("span", prog), stage = $(".sc-stage", sc), copies = $$("#hero-copy .hc");
    var idx = 0, hover = false, offscreen = false;
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

    function syncPause() {
      var stop = hover || offscreen || document.hidden;
      prog.classList.toggle("paused", stop);
      sc.classList.toggle("paused", stop);
    }
    function restart() {
      prog.classList.remove("run");
      void prog.offsetWidth;
      if (!reduce) prog.classList.add("run");
      syncPause();
    }
    function go(i, focus) {
      idx = (i + tabs.length) % tabs.length;
      tabs.forEach(function (t, n) {
        t.setAttribute("aria-selected", String(n === idx));
        t.setAttribute("tabindex", n === idx ? "0" : "-1");
      });
      slides.forEach(function (s, n) {
        s.classList.toggle("active", n === idx);
        s.setAttribute("aria-hidden", String(n !== idx));
      });
      copies.forEach(function (c, n) {
        var on = n === idx;
        c.classList.toggle("active", on);
        c.setAttribute("aria-hidden", String(!on));
        $$("a", c).forEach(function (a) { a.tabIndex = on ? 0 : -1; });
      });
      if (focus) tabs[idx].focus();
      restart();
    }
    bar.addEventListener("animationend", function () { go(idx + 1); });
    tabs.forEach(function (t, n) {
      t.addEventListener("click", function () { go(n); });
      t.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") { e.preventDefault(); go(idx + 1, true); }
        else if (e.key === "ArrowLeft") { e.preventDefault(); go(idx - 1, true); }
        else if (e.key === "Home") { e.preventDefault(); go(0, true); }
        else if (e.key === "End") { e.preventDefault(); go(tabs.length - 1, true); }
      });
    });
    var canHover = window.matchMedia && matchMedia("(hover: hover)").matches;
    sc.addEventListener("mouseenter", function () { if (canHover) { hover = true; syncPause(); } });
    sc.addEventListener("mouseleave", function () { hover = false; syncPause(); });
    document.addEventListener("visibilitychange", syncPause);
    if ("IntersectionObserver" in window) {
      /* watch the whole hero (copy + carousel), not just the carousel: on phones they stack, so either part on screen keeps both rotating */
      new IntersectionObserver(function (es) { offscreen = !es[0].isIntersecting; syncPause(); }, { threshold: 0 }).observe(sc.closest(".hero") || sc);
    }
    /* subtle mouse parallax on the stage */
    if (!reduce && window.matchMedia("(hover:hover)").matches) {
      sc.addEventListener("mousemove", function (e) {
        var r = stage.getBoundingClientRect();
        stage.style.setProperty("--px", (((e.clientX - r.left) / r.width - .5) * 2).toFixed(3));
        stage.style.setProperty("--py", (((e.clientY - r.top) / r.height - .5) * 2).toFixed(3));
      });
      sc.addEventListener("mouseleave", function () { stage.style.setProperty("--px", 0); stage.style.setProperty("--py", 0); });
    }
    var x0 = null;
    sc.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    sc.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) go(idx + (dx < 0 ? 1 : -1));
    });
    go(0);
  })();

  /* ---- mobile menu ---- */
  var toggle = $("#menu-toggle"), menu = $("#nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.documentElement.style.overflow = open ? "hidden" : "";
    });
    function closeMenu() { menu.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); document.documentElement.style.overflow = ""; }
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) closeMenu(); });
    window.addEventListener("resize", function () { if (window.innerWidth > 1100) closeMenu(); });
    var nb = $(".navbar");
    if (nb) { var onS = function () { nb.classList.toggle("scrolled", window.scrollY > 8); }; onS(); window.addEventListener("scroll", onS, { passive: true }); }
    $$(".dropdown > .nav-link").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var dd = btn.parentNode, open = dd.classList.toggle("open");
        btn.setAttribute("aria-expanded", open);
      });
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".dropdown")) $$(".dropdown.open").forEach(function (d) { d.classList.remove("open"); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { menu.classList.remove("open"); $$(".dropdown.open").forEach(function (d) { d.classList.remove("open"); }); }
    });
  }

  /* ---- scroll reveal ---- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    $$(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- accordion ---- */
  $$(".acc-q").forEach(function (q) {
    q.addEventListener("click", function () {
      var open = q.getAttribute("aria-expanded") === "true";
      q.setAttribute("aria-expanded", String(!open));
    });
  });

  /* ---- pricing toggle ---- */
  var tog = $$(".toggle button");
  if (tog.length) {
    tog.forEach(function (b) {
      b.addEventListener("click", function () {
        var yearly = b.getAttribute("data-period") === "yearly";
        tog.forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        $$("[data-monthly]").forEach(function (el) {
          el.textContent = "$" + (yearly ? el.getAttribute("data-yearly") : el.getAttribute("data-monthly"));
        });
        $$("[data-per]").forEach(function (el) { el.textContent = yearly ? "/yr" : "/mo"; });
      });
    });
  }

  /* ---- testimonial slider ---- */
  $$("[data-slider]").forEach(function (root) {
    var track = $(".slider-track", root), slides = $$(".slide", track), dotsBox = $(".slider-dots", root);
    var idx = 0;
    function perView() { return window.innerWidth <= 767 ? 1 : window.innerWidth <= 991 ? 2 : 3; }
    function max() { return Math.max(0, slides.length - perView()); }
    function render() {
      idx = Math.min(idx, max());
      track.style.transform = "translateX(-" + idx * (100 / perView()) + "%)";
      $$(".slider-dot", dotsBox).forEach(function (d, i) { d.setAttribute("aria-current", String(i === idx)); d.style.display = i > max() ? "none" : ""; });
    }
    slides.forEach(function (s, i) {
      var d = document.createElement("button");
      d.className = "slider-dot"; d.setAttribute("aria-label", "Go to slide " + (i + 1));
      d.addEventListener("click", function () { idx = i; render(); });
      dotsBox.appendChild(d);
    });
    $(".slider-prev", root).addEventListener("click", function () { idx = idx <= 0 ? max() : idx - 1; render(); });
    $(".slider-next", root).addEventListener("click", function () { idx = idx >= max() ? 0 : idx + 1; render(); });
    window.addEventListener("resize", render);
    render();
  });

  /* ---- blog category filter ---- */
  $$("[data-filters]").forEach(function (box) {
    var cards = $$("[data-tag]");
    box.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-filter]");
      if (!b) return;
      $$("button", box).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      var f = b.getAttribute("data-filter");
      cards.forEach(function (c) { c.hidden = f !== "all" && c.getAttribute("data-tag") !== f; });
    });
  });

  /* ---- contact form: preselect topic from ?interest=... ---- */
  (function () {
    var sel = $("select[name=topic]");
    var m = /[?&]interest=([^&]+)/.exec(location.search);
    if (!sel || !m) return;
    var want = decodeURIComponent(m[1].replace(/\+/g, " "));
    Array.prototype.forEach.call(sel.options, function (o) { if (o.value === want) sel.value = want; });
  })();

  /* ---- forms (newsletter + contact) ---- */
  function validEmail(v) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v); }
  $$("form[data-form]").forEach(function (form) {
    var msg = $(".form-msg", form);
    function show(ok, text) {
      msg.className = "form-msg show " + (ok ? "ok" : "err");
      msg.textContent = text;
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.website && form.website.value) return;            // honeypot: bots only
      var bad = false;
      $$("[required]", form).forEach(function (f) {
        var v = f.value.trim();
        var invalid = !v || (f.type === "email" && !validEmail(v));
        f.classList.toggle("invalid", invalid);
        if (invalid) bad = true;
      });
      if (bad) return show(false, "Please fill in the highlighted fields with valid details.");

      // Opened straight from disk (file://) there is no server to receive the form.
      if (location.protocol === "file:") {
        return show(false, "Forms need a web server with PHP. They will work once the site is uploaded to your hosting.");
      }

      var data = new FormData(form);
      data.append("form", form.getAttribute("data-form"));
      data.append("page", location.pathname);
      var root = document.documentElement.getAttribute("data-root") || "";
      var endpoint = S.formEndpoint || root + (S.formHandler || "api/send-mail.php");
      var btn = $("button[type=submit]", form);
      if (btn) btn.disabled = true;

      fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (r) {
          return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok && j.ok !== false, msg: j.message }; });
        })
        .then(function (res) {
          if (!res.ok) throw new Error(res.msg || "");
          form.reset();
          show(true, form.getAttribute("data-form") === "newsletter"
            ? "Thank you! You are subscribed."
            : "Thank you! We have received your message and will reply soon.");
        })
        .catch(function (err) {
          show(false, (err && err.message) || "Oops! Something went wrong. Please try again or email us at " + S.email + ".");
        })
        .then(function () { if (btn) btn.disabled = false; });
    });
    form.addEventListener("input", function (e) { e.target.classList && e.target.classList.remove("invalid"); });
  });

  /* ---- smooth in-page anchor offset for fixed nav is handled by CSS scroll-margin ---- */
})();
