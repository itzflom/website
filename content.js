/**
 * ============================================================
 * SITE CONTENT — edit this file to reskin the template.
 * ============================================================
 * Every piece of text, contact info, and image path used by
 * index.html lives here. Nothing is hardcoded in the markup.
 * To launch a new client, copy this file, replace the values,
 * and drop matching images into /images. See README.md.
 *
 * Current language: Bahasa Indonesia.
 * ============================================================
 */
const CONTENT = {
  meta: {
    siteTitle: "Bunga Tole Florist — Bunga Segar di Cikini, Jakarta",
    description:
      "Bunga Tole Florist — buket segar, bunga pernikahan, dan papan bunga di Pasar Kembang, Cikini, Jakarta Pusat. Pesan kapan saja lewat WhatsApp.",
    // Browser chrome / PWA tint color, kept in sync with --color-bg in theme.css
    themeColor: "#faf8f5"
  },

  business: {
    name: "Bunga Tole Florist",
    shortName: "Bunga Tole",
    tagline: "Bunga segar, dirangkai dengan penuh perhatian",
    rating: 4.8,
    ratingSource: "Rating Google"
  },

  contact: {
    // Shown to visitors
    phoneDisplay: "+62 858-9261-1994",
    // Digits only, country code first, no symbols — required format for wa.me links
    whatsappNumber: "6285892611994",
    // Pre-filled message when a visitor taps an "Order via WhatsApp" button
    whatsappMessage: "Halo Bunga Tole, saya mau pesan bunga!"
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
    display: "Buka 24 Jam",
    note: "Pesanan diterima kapan saja lewat WhatsApp — pengiriman di hari yang sama untuk area Menteng & Cikini."
  },

  hero: {
    eyebrow: "Pasar Kembang, Cikini",
    heading: "Bunga Tole Florist",
    subheading: "Bunga segar, dirangkai dengan penuh perhatian",
    ctaLabel: "Pesan via WhatsApp",
    image: "images/hero.jpg",
    imageAlt: "Close-up mawar merah muda segar dengan cahaya alami yang lembut"
  },

  about: {
    heading: "Kisah Kami",
    body:
      "Berada di antara kios-kios Pasar Kembang — pasar bunga tertua di Jakarta yang telah beroperasi sejak 1962 — Bunga Tole telah bertahun-tahun memilih bunga-bunga tersegar yang ditawarkan Cikini. Setiap buket dipotong, dirangkai, dan dibungkus dengan tangan, sehingga tidak ada dua yang benar-benar sama. Baik untuk hadiah di hari yang sama, dekorasi pernikahan, maupun papan bunga untuk peresmian, kami mengerjakan setiap pesanan seolah itu satu-satunya yang kami buat hari itu.",
    image: "images/about.jpg",
    imageAlt: "Tangan florist merangkai buket mawar merah segar"
  },

  gallery: {
    heading: "Rangkaian Kami"
  },

  info: {
    heading: "Jam Buka & Lokasi",
    hoursLabel: "Jam Buka",
    addressLabel: "Alamat",
    whatsappLabel: "WhatsApp",
    directionsLabel: "Rute ke Lokasi"
  },

  products: [
    {
      name: "Buket Andalan",
      description: "Buket bunga segar rangkaian tangan untuk berbagai acara, dibuat sesuai pesanan di hari yang sama.",
      image: "images/gallery-1.jpg",
      imageAlt: "Buket mawar merah segar rangkaian tangan"
    },
    {
      name: "Bunga Pernikahan & Acara",
      description: "Buket pengantin, dekorasi altar dan lorong, hingga centerpiece resepsi.",
      image: "images/gallery-2.jpg",
      imageAlt: "Buket bunga pernikahan putih dan hijau"
    },
    {
      name: "Papan Bunga",
      description: "Papan bunga berdiri untuk peresmian, ucapan selamat, dan perayaan.",
      image: "images/gallery-3.jpg",
      imageAlt: "Papan bunga ucapan selamat berdiri tinggi"
    },
    {
      name: "Bunga Duka Cita",
      description: "Karangan bunga dan papan duka cita yang dikirim dengan penuh hormat.",
      image: "images/gallery-4.jpg",
      imageAlt: "Karangan bunga duka cita putih dan ungu"
    },
    {
      name: "Rangkaian Meja & Rumah",
      description: "Rangkaian bunga segar berukuran pas untuk meja kerja, meja makan, dan pintu masuk rumah.",
      image: "images/gallery-5.jpg",
      imageAlt: "Bunga putih dalam vas keramik hijau di atas meja kayu"
    },
    {
      name: "Pesanan Custom",
      description: "Ceritakan acara dan budget Anda — kami rancang sesuatu yang unik khusus untuk Anda.",
      image: "images/gallery-6.jpg",
      imageAlt: "Memilih mawar segar di kios bunga"
    }
  ],

  footer: {
    note: "Dibuat dengan sepenuh hati di Cikini, Jakarta.",
    contactLabel: "Kontak",
    addressLabel: "Alamat",
    hoursLabel: "Jam Buka"
  }
};
