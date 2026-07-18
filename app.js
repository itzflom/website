/**
 * ============================================================
 * APP — renders CONTENT into the DOM. No business copy lives
 * in this file; it only knows how to place values from
 * content.js into the markup and wire up interactions.
 * ============================================================
 */
(function () {
  "use strict";

  function buildWhatsAppUrl(number, message) {
    var base = "https://wa.me/" + number;
    return message ? base + "?text=" + encodeURIComponent(message) : base;
  }

  function buildMapsEmbedUrl(query) {
    return "https://www.google.com/maps?q=" + encodeURIComponent(query) + "&output=embed";
  }

  function buildMapsDirectionsUrl(query) {
    return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(query);
  }

  function setText(hook, value) {
    document.querySelectorAll('[data-hook="' + hook + '"]').forEach(function (el) {
      el.textContent = value;
    });
  }

  function renderMeta() {
    document.title = CONTENT.meta.siteTitle;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", CONTENT.meta.description);
    var theme = document.querySelector('meta[name="theme-color"]');
    if (theme) theme.setAttribute("content", CONTENT.meta.themeColor);
  }

  function renderHero(waUrl) {
    var img = document.getElementById("hero-image");
    img.src = CONTENT.hero.image;
    img.alt = CONTENT.hero.imageAlt;

    setText("hero-eyebrow", CONTENT.hero.eyebrow);
    setText("hero-heading", CONTENT.hero.heading);
    setText("hero-subheading", CONTENT.hero.subheading);
    setText("hero-cta-label", CONTENT.hero.ctaLabel);
    setText("hero-rating", "★ " + CONTENT.business.rating + " " + CONTENT.business.ratingSource);

    document.getElementById("hero-cta").href = waUrl;
  }

  function renderAbout() {
    var img = document.getElementById("about-image");
    img.src = CONTENT.about.image;
    img.alt = CONTENT.about.imageAlt;

    setText("about-heading", CONTENT.about.heading);
    setText("about-body", CONTENT.about.body);
  }

  function renderGallery() {
    setText("gallery-heading", CONTENT.gallery.heading);

    var grid = document.getElementById("gallery-grid");
    var fragment = document.createDocumentFragment();

    CONTENT.products.forEach(function (product, index) {
      var item = document.createElement("div");
      item.className = "gallery__item fade-in";
      item.style.transitionDelay = (index % 3) * 90 + "ms";

      var imageWrap = document.createElement("div");
      imageWrap.className = "gallery__image-wrap";

      var img = document.createElement("img");
      img.className = "gallery__image";
      img.src = product.image;
      img.alt = product.imageAlt;
      img.loading = "lazy";
      img.width = 800;
      img.height = 800;
      imageWrap.appendChild(img);

      var caption = document.createElement("div");
      caption.className = "gallery__caption";

      var name = document.createElement("h3");
      name.className = "gallery__name";
      name.textContent = product.name;

      var description = document.createElement("p");
      description.className = "gallery__description";
      description.textContent = product.description;

      caption.appendChild(name);
      caption.appendChild(description);
      item.appendChild(imageWrap);
      item.appendChild(caption);
      fragment.appendChild(item);
    });

    grid.appendChild(fragment);
  }

  function renderInfo(waUrl) {
    setText("info-heading", CONTENT.info.heading);
    setText("info-hours-label", CONTENT.info.hoursLabel);
    setText("info-address-label", CONTENT.info.addressLabel);
    setText("info-whatsapp-label", CONTENT.info.whatsappLabel);
    setText("info-cta-label", CONTENT.hero.ctaLabel);
    setText("info-directions-label", CONTENT.info.directionsLabel);

    setText("info-hours", CONTENT.hours.display);
    setText("info-hours-note", CONTENT.hours.note);
    setText("info-address", CONTENT.address.full);
    setText("info-phone-label", CONTENT.contact.phoneDisplay);

    document.getElementById("info-phone-link").href = waUrl;
    document.getElementById("info-cta").href = waUrl;
    document.getElementById("directions-cta").href = buildMapsDirectionsUrl(CONTENT.address.mapsLinkQuery);
    document.getElementById("map-iframe").src = buildMapsEmbedUrl(CONTENT.address.mapsEmbedQuery);
  }

  function renderFooter(waUrl) {
    setText("footer-brand", CONTENT.business.name);
    setText("footer-tagline", CONTENT.business.tagline);
    setText("footer-contact-label", CONTENT.footer.contactLabel);
    setText("footer-address-label", CONTENT.footer.addressLabel);
    setText("footer-hours-label", CONTENT.footer.hoursLabel);
    setText("footer-phone-label", CONTENT.contact.phoneDisplay);
    setText("footer-address", CONTENT.address.full);
    setText("footer-hours", CONTENT.hours.display);
    setText(
      "footer-bottom",
      "© " + new Date().getFullYear() + " " + CONTENT.business.name + ". " + CONTENT.footer.note
    );

    document.getElementById("footer-phone-link").href = waUrl;
  }

  function renderStickyButton(waUrl) {
    document.getElementById("sticky-whatsapp").href = waUrl;
  }

  function initStickyVisibility() {
    var hero = document.getElementById("hero");
    var stickyBtn = document.getElementById("sticky-whatsapp");
    if (!hero || !stickyBtn || !("IntersectionObserver" in window)) {
      if (stickyBtn) stickyBtn.classList.add("is-visible");
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          stickyBtn.classList.toggle("is-visible", !entry.isIntersecting);
        });
      },
      { rootMargin: "-10% 0px 0px 0px" }
    );

    observer.observe(hero);
  }

  function initFadeIns() {
    var targets = document.querySelectorAll(".fade-in");
    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  function init() {
    var waUrl = buildWhatsAppUrl(CONTENT.contact.whatsappNumber, CONTENT.contact.whatsappMessage);

    renderMeta();
    renderHero(waUrl);
    renderAbout();
    renderGallery();
    renderInfo(waUrl);
    renderFooter(waUrl);
    renderStickyButton(waUrl);

    initStickyVisibility();
    initFadeIns();
  }

  init();
})();
