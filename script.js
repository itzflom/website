/**
 * ============================================================
 * CERITA NYATA: interactions
 * ============================================================
 * Nothing in here needs editing to change the site's content.
 *  1. Builds the nav + mobile menu from every <section data-nav>.
 *  2. Splits [data-split] text into letters/words for the reveals,
 *     and builds the artwork for each team panel (.member).
 *  3. Adds the cut-corner outline to every [data-frame].
 *  4. Reveals things (adds .is-in) as they scroll into view.
 *  5. Scroll-linked motion: sky pan, connector lines, CAS journey.
 *  6. Smooth scrolling (Lenis, if it loaded) and anchor links.
 * ============================================================
 */
(function () {
  "use strict";

  window.__cnReady = true;

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SVG_NS = "http://www.w3.org/2000/svg";
  var lenis = null;

  function toArray(list) {
    return Array.prototype.slice.call(list);
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  /* ----------------------------------------------------------
     1. NAV + MENU
     ---------------------------------------------------------- */
  var sections = toArray(document.querySelectorAll("main section[data-nav][id]"));
  var navList = document.querySelector("[data-nav-list]");
  var menuList = document.querySelector("[data-menu-list]");
  var navLinks = [];

  sections.forEach(function (section, index) {
    var label = section.getAttribute("data-nav");
    var href = "#" + section.id;

    var navItem = document.createElement("li");
    var navLink = document.createElement("a");
    navLink.href = href;
    navLink.textContent = label;
    navItem.appendChild(navLink);
    navList.appendChild(navItem);

    var menuItem = document.createElement("li");
    menuItem.style.setProperty("--i", index);
    var menuLink = document.createElement("a");
    menuLink.href = href;
    var num = document.createElement("span");
    num.textContent = String(index + 1).padStart(2, "0");
    menuLink.appendChild(num);
    menuLink.appendChild(document.createTextNode(label));
    menuItem.appendChild(menuLink);
    menuList.appendChild(menuItem);

    navLinks.push({ id: section.id, links: [navLink, menuLink] });
  });

  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("menu");
  var behindMenu = toArray(document.querySelectorAll("main, footer, .nav__brand"));

  function setMenu(open) {
    root.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    /* keep keyboard focus inside the open menu */
    behindMenu.forEach(function (el) {
      el.inert = open;
    });
    if (lenis) {
      if (open) lenis.stop();
      else lenis.start();
    } else {
      root.style.overflow = open ? "hidden" : "";
    }
    if (open) {
      var first = menu.querySelector("a");
      if (first) first.focus({ preventScroll: true });
    }
  }

  toggle.addEventListener("click", function () {
    setMenu(!root.classList.contains("menu-open"));
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && root.classList.contains("menu-open")) {
      setMenu(false);
      toggle.focus();
    }
  });

  window.matchMedia("(min-width: 900px)").addEventListener("change", function (mq) {
    if (mq.matches && root.classList.contains("menu-open")) setMenu(false);
  });

  /* Highlight the nav link of the section crossing the middle of the screen
     (called from the scroll handler below) */
  var activeId = null;
  function updateActive(vh) {
    var id = null;
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= vh * 0.5) id = section.id;
    });
    if (id === activeId) return;
    activeId = id;
    navLinks.forEach(function (item) {
      item.links.forEach(function (link) {
        if (item.id === id) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    });
  }

  /* ----------------------------------------------------------
     2. SPLIT TEXT
     data-split="chars": each letter animates (headings)
     data-split="words": each word slides up (paragraphs)
     ---------------------------------------------------------- */
  function splitText(el, mode) {
    var textNodes = [];
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    var index = 0;
    var maxIndex = mode === "chars" ? 40 : 80;

    textNodes.forEach(function (node) {
      var parts = node.textContent.split(/(\s+)/);
      var fragment = document.createDocumentFragment();

      parts.forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(" "));
          return;
        }
        var word = document.createElement("span");
        word.className = "w";
        if (mode === "chars") {
          word.setAttribute("aria-hidden", "true");
          Array.from(part).forEach(function (char) {
            var span = document.createElement("span");
            span.className = "ch";
            span.textContent = char;
            span.style.setProperty("--i", Math.min(index++, maxIndex));
            word.appendChild(span);
          });
        } else {
          var inner = document.createElement("span");
          inner.textContent = part;
          inner.style.setProperty("--i", Math.min(index++, maxIndex));
          word.appendChild(inner);
        }
        fragment.appendChild(word);
      });

      node.parentNode.replaceChild(fragment, node);
    });

    if (mode === "chars") {
      /* Screen readers read this instead of the split letters */
      var label = document.createElement("span");
      label.className = "sr-only";
      label.textContent = el.textContent.replace(/\s+/g, " ").trim();
      el.insertBefore(label, el.firstChild);
    }
  }

  toArray(document.querySelectorAll("[data-split]")).forEach(function (el) {
    splitText(el, el.getAttribute("data-split") === "chars" ? "chars" : "words");
  });

  /* ----------------------------------------------------------
     2b. TEAM PANELS
     Each <article class="member"> in index.html only holds a name
     (and role). This builds the artwork around it: colour wash,
     big vertical name, swoosh lines, and moving particles.
     ---------------------------------------------------------- */
  function make(tag, className, text) {
    var node = document.createElement(tag);
    node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  /* Small repeatable random generator, so each panel always gets the same swooshes */
  function seeded(seed) {
    var s = seed * 7919;
    return function () {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  }

  var PARTICLE_SIZE = {
    embers: [3, 6],
    bubbles: [6, 16],
    petals: [8, 14],
    leaves: [9, 15],
    sparks: [6, 12]
  };

  toArray(document.querySelectorAll(".member")).forEach(function (member, index) {
    var nameEl = member.querySelector(".member__name");
    var name = nameEl ? nameEl.textContent.trim() : "";
    var empty = member.classList.contains("member--empty");

    if (!member.hasAttribute("data-frame")) member.setAttribute("data-frame", "12");
    member.style.setProperty("--mi", index);

    var info = make("div", "member__info");
    toArray(member.children).forEach(function (child) {
      if (child.classList.contains("member__role") && !child.textContent.trim()) {
        child.remove();
      } else {
        info.appendChild(child);
      }
    });

    var art = make("div", "member__art");
    var scene = make("div", "member__scene");
    art.appendChild(scene);
    var num = make("span", "member__num", String(index + 1).padStart(2, "0"));
    num.setAttribute("aria-hidden", "true");
    member.appendChild(art);
    member.appendChild(num);
    member.appendChild(info);

    if (empty) return;

    var rand = seeded(index + 3);
    var photo = member.getAttribute("data-photo");

    if (photo) {
      var img = document.createElement("img");
      img.className = "member__photo";
      img.src = photo;
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      scene.appendChild(img);
      member.classList.add("member--photo");
    }

    scene.appendChild(make("div", "member__bg"));

    if (!photo && name) {
      var initial = make("span", "member__initial", name.charAt(0));
      initial.setAttribute("aria-hidden", "true");
      scene.appendChild(initial);
    }

    var big = make("span", "member__big", name);
    big.setAttribute("aria-hidden", "true");
    scene.appendChild(big);

    /* Swooshes: sweeping curves from lower left to upper right */
    var svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("class", "member__streaks");
    svg.setAttribute("viewBox", "0 0 200 800");
    svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    for (var j = 0; j < 6; j++) {
      var y0 = 380 + rand() * 440;
      var y1 = y0 - (260 + rand() * 360);
      var d = "M-30 " + y0.toFixed(0) +
        " C60 " + (y0 - 40 - rand() * 180).toFixed(0) +
        " 140 " + (y1 + 40 + rand() * 180).toFixed(0) +
        " 230 " + y1.toFixed(0);
      var weight = j === 0 ? "wide" : j === 1 ? "mid" : "thin";
      var layers = weight === "thin" ? ["streak", "flow"] : ["streak"];
      layers.forEach(function (layer) {
        var path = document.createElementNS(SVG_NS, "path");
        path.setAttribute("d", d);
        path.setAttribute("pathLength", "1");
        path.setAttribute("class", layer + " " + layer + "--" + weight);
        path.style.setProperty("--k", j);
        svg.appendChild(path);
      });
    }
    scene.appendChild(svg);

    /* Particles: embers and bubbles rise, petals and leaves fall, sparks twinkle */
    var kind = member.getAttribute("data-fx") || "embers";
    var size = PARTICLE_SIZE[kind] || PARTICLE_SIZE.embers;
    var fx = make("div", "member__fx");
    fx.setAttribute("data-kind", kind);
    for (var k = 0; k < 12; k++) {
      var p = document.createElement("span");
      var duration = 5 + rand() * 6;
      p.style.setProperty("--x", (rand() * 96).toFixed(1) + "%");
      p.style.setProperty("--y", (8 + rand() * 80).toFixed(1) + "%");
      p.style.setProperty("--s", (size[0] + rand() * (size[1] - size[0])).toFixed(1) + "px");
      p.style.setProperty("--dur", duration.toFixed(2) + "s");
      p.style.setProperty("--delay", (-rand() * duration).toFixed(2) + "s");
      p.style.setProperty("--dx", ((rand() - 0.5) * 60).toFixed(0) + "px");
      p.style.setProperty("--r", (rand() * 360).toFixed(0) + "deg");
      fx.appendChild(p);
    }
    scene.appendChild(fx);

    scene.appendChild(make("div", "member__shade"));
  });

  /* Only animate the particles while the team strip is on screen */
  if ("IntersectionObserver" in window) {
    var teamObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle("is-playing", entry.isIntersecting);
      });
    });
    toArray(document.querySelectorAll("[data-team]")).forEach(function (team) {
      teamObserver.observe(team);
    });
  } else {
    toArray(document.querySelectorAll("[data-team]")).forEach(function (team) {
      team.classList.add("is-playing");
    });
  }

  /* ----------------------------------------------------------
     3. FRAMES: cut-corner outline, drawn from the top centre
     outwards in both directions, meeting at the bottom.
     data-frame="12" sets the corner size in px (default 18).
     ---------------------------------------------------------- */
  function framePaths(w, h, cut) {
    var c = Math.min(cut, w / 4, h / 4);
    var x0 = 0.5;
    var y0 = 0.5;
    var x1 = w - 0.5;
    var y1 = h - 0.5;
    var mid = w / 2;
    return [
      "M" + mid + " " + y0 + "H" + (x0 + c) + "L" + x0 + " " + (y0 + c) +
        "V" + (y1 - c) + "L" + (x0 + c) + " " + y1 + "H" + mid,
      "M" + mid + " " + y0 + "H" + (x1 - c) + "L" + x1 + " " + (y0 + c) +
        "V" + (y1 - c) + "L" + (x1 - c) + " " + y1 + "H" + mid
    ];
  }

  var frameDrawers = new Map();
  var frameResizer = "ResizeObserver" in window
    ? new ResizeObserver(function (entries) {
        entries.forEach(function (entry) {
          var draw = frameDrawers.get(entry.target);
          if (draw) draw();
        });
      })
    : null;

  toArray(document.querySelectorAll("[data-frame]")).forEach(function (el) {
    var cut = parseFloat(el.getAttribute("data-frame")) || 18;
    el.style.setProperty("--cut", cut + "px");

    var svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("class", "frame__line");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    var paths = [0, 1].map(function () {
      var path = document.createElementNS(SVG_NS, "path");
      path.setAttribute("pathLength", "1");
      svg.appendChild(path);
      return path;
    });
    el.appendChild(svg);

    function draw() {
      var w = el.offsetWidth;
      var h = el.offsetHeight;
      if (!w || !h) return;
      svg.setAttribute("viewBox", "0 0 " + w + " " + h);
      framePaths(w, h, cut).forEach(function (d, i) {
        paths[i].setAttribute("d", d);
      });
    }

    draw();
    frameDrawers.set(el, draw);
    if (frameResizer) frameResizer.observe(el);
    else window.addEventListener("resize", draw);
  });

  /* ----------------------------------------------------------
     4. REVEAL ON SCROLL
     Everything that enters the screen together is staggered.
     ---------------------------------------------------------- */
  var revealTargets = toArray(
    document.querySelectorAll("[data-frame], [data-split], [data-reveal], .rule")
  );

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach(function (el) {
      el.classList.add("is-in");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        var batch = 0;
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          el.style.setProperty("--stagger", (batch++ * 0.08).toFixed(2) + "s");
          el.classList.add("is-in");
          revealObserver.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    revealTargets.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ----------------------------------------------------------
     5. SCROLL-LINKED MOTION
     ---------------------------------------------------------- */
  var sky = document.querySelector(".sky");
  var connectors = toArray(document.querySelectorAll(".connector[data-scrub]"));
  var journeys = toArray(document.querySelectorAll("[data-journey]")).map(function (el) {
    return {
      el: el,
      track: el.querySelector(".journey__track"),
      stages: toArray(el.querySelectorAll(".journey__stage")),
      nodes: toArray(el.querySelectorAll(".journey__node")),
      horizontal: false,
      stops: []
    };
  });

  var maxScroll = 1;
  var skyPan = 0;

  /* Stretch each journey's track from its first node to its last */
  function layoutJourney(j) {
    if (j.nodes.length < 2 || !j.track) return;
    var box = j.el.getBoundingClientRect();
    var centres = j.nodes.map(function (node) {
      var r = node.getBoundingClientRect();
      return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
    });
    var a = centres[0];
    var b = centres[centres.length - 1];
    j.horizontal = Math.abs(b.x - a.x) > Math.abs(b.y - a.y);
    j.el.classList.toggle("is-horizontal", j.horizontal);

    var length = j.horizontal ? b.x - a.x : b.y - a.y;
    j.track.style.left = (j.horizontal ? a.x : a.x - 0.5) + "px";
    j.track.style.top = (j.horizontal ? a.y - 0.5 : a.y) + "px";
    j.track.style.width = j.horizontal ? length + "px" : "1px";
    j.track.style.height = j.horizontal ? "1px" : length + "px";
    j.stops = centres.map(function (c) {
      return length ? ((j.horizontal ? c.x - a.x : c.y - a.y) / length) : 0;
    });
  }

  function measure() {
    maxScroll = Math.max(1, root.scrollHeight - window.innerHeight);
    skyPan = sky ? sky.offsetHeight - sky.offsetHeight / 1.4 : 0;
    journeys.forEach(layoutJourney);
  }

  function update() {
    ticking = false;
    var y = window.scrollY || window.pageYOffset;
    var vh = window.innerHeight;

    root.classList.toggle("is-scrolled", y > 24);
    updateActive(vh);

    if (reduceMotion) return;

    if (sky) {
      var pan = clamp(y / maxScroll, 0, 1) * skyPan;
      sky.style.transform = "translate3d(0," + (-pan).toFixed(1) + "px,0)";
    }

    connectors.forEach(function (el) {
      var r = el.getBoundingClientRect();
      var p = clamp((vh * 0.95 - r.top) / (r.height + vh * 0.3), 0, 1);
      el.style.setProperty("--p", p.toFixed(3));
    });

    journeys.forEach(function (j) {
      if (!j.track) return;
      var r = j.track.getBoundingClientRect();
      var p = j.horizontal
        ? (vh * 0.85 - r.top) / (vh * 0.45)
        : (vh * 0.62 - r.top) / Math.max(r.height, 1);
      p = clamp(p, 0, 1);
      j.el.style.setProperty("--p", p.toFixed(3));
      j.stages.forEach(function (stage, i) {
        stage.classList.toggle("is-active", p >= j.stops[i] - 0.001);
      });
    });
  }

  var ticking = false;
  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", function () {
    measure();
    requestUpdate();
  });
  if ("ResizeObserver" in window) {
    new ResizeObserver(function () {
      measure();
      requestUpdate();
    }).observe(document.body);
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      measure();
      requestUpdate();
    });
  }

  if (reduceMotion) {
    journeys.forEach(function (j) {
      j.stages.forEach(function (stage) {
        stage.classList.add("is-active");
      });
    });
  }

  measure();
  update();

  /* ----------------------------------------------------------
     6. SMOOTH SCROLL + ANCHOR LINKS
     ---------------------------------------------------------- */
  function initLenis() {
    if (lenis || reduceMotion || typeof window.Lenis !== "function") return;
    lenis = new window.Lenis({ autoRaf: true });
  }

  if (!reduceMotion) {
    if (typeof window.Lenis === "function") {
      initLenis();
    } else {
      var lenisScript = document.getElementById("lenis-js");
      if (lenisScript) lenisScript.addEventListener("load", initLenis);
    }
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest('a[href^="#"]');
    if (!link) return;
    var id = link.getAttribute("href").slice(1);
    var target = id ? document.getElementById(id) : null;
    if (!target) return;

    event.preventDefault();
    if (root.classList.contains("menu-open")) setMenu(false);

    /* Sections have scroll-margin-top in the CSS so they land below the nav.
       Lenis reads it itself; a plain scrollTo() needs it added by hand. */
    if (lenis) {
      /* sync Lenis to the real position first, in case the page was scrolled natively (e.g. End key) */
      lenis.scrollTo(window.scrollY, { immediate: true });
      lenis.scrollTo(id === "top" ? 0 : target, { duration: 1.6 });
    } else {
      var margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      var top = id === "top" ? 0 : target.getBoundingClientRect().top + window.scrollY - margin;
      window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
    }

    if (history.replaceState) history.replaceState(null, "", "#" + id);
    if (id !== "top") {
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  });

  /* ----------------------------------------------------------
     Footer year
     ---------------------------------------------------------- */
  toArray(document.querySelectorAll("[data-year]")).forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
