/**
 * ============================================================
 * SITE CONTENT — edit this file to reskin the template.
 * ============================================================
 * Every piece of text, contact info, and image path used by
 * index.html lives here. Nothing is hardcoded in the markup.
 * To launch a new client, copy this file, replace the values,
 * and drop matching images into /images. See README.md.
 * ============================================================
 */
const CONTENT = {
  meta: {
    siteTitle: "Bunga Tole Florist — Fresh Flowers in Cikini, Jakarta",
    description:
      "Bunga Tole Florist — fresh bouquets, wedding florals, and standing arrangements at Pasar Kembang, Cikini, Jakarta Pusat. Order anytime via WhatsApp.",
    // Browser chrome / PWA tint color, kept in sync with --color-bg in theme.css
    themeColor: "#faf8f5"
  },

  business: {
    name: "Bunga Tole Florist",
    shortName: "Bunga Tole",
    tagline: "Fresh flowers, thoughtfully arranged",
    rating: 4.8,
    ratingSource: "Google rating"
  },

  contact: {
    // Shown to visitors
    phoneDisplay: "+62 858-9261-1994",
    // Digits only, country code first, no symbols — required format for wa.me links
    whatsappNumber: "6285892611994",
    // Pre-filled message when a visitor taps an "Order via WhatsApp" button
    whatsappMessage: "Hi Bunga Tole, I'd like to order some flowers!"
  },

  address: {
    line1: "Jl. Pegangsaan Timur Kios 01",
    line2: "Pasar Kembang, Cikini, Kec. Menteng",
    line3: "Kota Jakarta Pusat, DKI Jakarta 10330",
    full: "Jl. Pegangsaan Timur Kios 01, Pasar Kembang, Cikini, Kec. Menteng, Kota Jakarta Pusat, DKI Jakarta 10330",
    // Used to build the Google Maps embed iframe src (no API key required)
    mapsEmbedQuery:
      "Jl. Pegangsaan Timur Kios 01, Pasar Kembang, Cikini, Menteng, Jakarta Pusat 10330",
    // Used for the "Get Directions" link, opens Google Maps directly
    mapsLinkQuery:
      "Jl. Pegangsaan Timur Kios 01, Pasar Kembang, Cikini, Menteng, Jakarta Pusat 10330"
  },

  hours: {
    display: "Open 24 hours",
    note: "Orders taken anytime via WhatsApp — same-day delivery around Menteng & Cikini."
  },

  hero: {
    eyebrow: "Pasar Kembang, Cikini",
    heading: "Bunga Tole Florist",
    subheading: "Fresh flowers, thoughtfully arranged",
    ctaLabel: "Order via WhatsApp",
    image: "images/hero.jpg",
    imageAlt: "Close-up of fresh pink roses in soft natural light"
  },

  about: {
    heading: "Our Story",
    body:
      "Tucked beside the stalls of Pasar Kembang — Jakarta's oldest flower market, trading since 1962 — Bunga Tole has spent years sourcing the freshest blooms Cikini has to offer. Every bouquet is cut, arranged, and wrapped by hand, so no two are quite the same. Whether it's a same-day gift, a wedding centerpiece, or a standing arrangement for a grand opening, we treat each order like it's the only one we're making that day.",
    image: "images/about.jpg",
    imageAlt: "Florist's hands arranging a bouquet of fresh red roses"
  },

  gallery: {
    heading: "What We Make"
  },

  info: {
    heading: "Hours & Location",
    hoursLabel: "Hours",
    addressLabel: "Address",
    whatsappLabel: "WhatsApp",
    directionsLabel: "Get Directions"
  },

  products: [
    {
      name: "Signature Bouquets",
      description: "Hand-tied fresh bouquets for any occasion, made to order same-day.",
      image: "images/gallery-1.jpg",
      imageAlt: "Hand-tied bouquet of fresh red roses"
    },
    {
      name: "Wedding & Event Florals",
      description: "Bridal bouquets, arch and aisle florals, and reception centerpieces.",
      image: "images/gallery-2.jpg",
      imageAlt: "White and green wedding flower bouquet"
    },
    {
      name: "Papan Bunga (Congratulation Stands)",
      description: "Tall standing flower boards for openings, promotions, and celebrations.",
      image: "images/gallery-3.jpg",
      imageAlt: "Tall standing congratulatory flower arrangement"
    },
    {
      name: "Sympathy & Condolence Flowers",
      description: "Respectful wreaths and standing arrangements, delivered with care.",
      image: "images/gallery-4.jpg",
      imageAlt: "White and purple sympathy flower wreath"
    },
    {
      name: "Table & Home Arrangements",
      description: "Fresh arrangements sized for desks, tables, and home entryways.",
      image: "images/gallery-5.jpg",
      imageAlt: "White flowers in a green ceramic vase on a wooden table"
    },
    {
      name: "Custom Orders",
      description: "Tell us the occasion and budget — we'll design something one-of-a-kind.",
      image: "images/gallery-6.jpg",
      imageAlt: "Choosing fresh roses at a flower stand"
    }
  ],

  footer: {
    note: "Made with care in Cikini, Jakarta.",
    contactLabel: "Contact",
    addressLabel: "Address",
    hoursLabel: "Hours"
  }
};
