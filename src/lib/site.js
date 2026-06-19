// Single source of truth for Grand Prairie Tow Truck. Schema, nav, and contact all build from here.

export const SITE = {
  brand: "Grand Prairie Tow Truck",
  domain: "https://grandprairietowtruck.com",
  phoneDisplay: "(469) 916-5341",
  phoneTel: "+14699165341",
  email: "dispatch@grandprairietowtruck.com",
  city: "Grand Prairie",
  region: "TX",
  zip: "75050",
  // Grand Prairie, TX city point (real area centroid, not a fake doorstep)
  geo: { lat: 32.7459, lng: -96.9978 },
  priceRange: "$$",
  sameAs: [],
};

// Cities served. Mirrored in copy and in areaServed.
export const AREAS = [
  { name: "Grand Prairie", url: "/grand-prairie-tx/" },
  { name: "Arlington", url: "/arlington-tx/" },
  { name: "Irving", url: "/irving-tx/" },
  { name: "Mansfield", url: "/mansfield-tx/" },
  { name: "Cedar Hill", url: "/cedar-hill-tx/" },
];

// Freight corridors that thread Grand Prairie. Powers the dispatch-coverage board.
export const CORRIDORS = [
  { road: "I-20", note: "Southern freight run" },
  { road: "I-30", note: "Dallas–Fort Worth spine" },
  { road: "SH-360", note: "Mid-cities north–south" },
  { road: "SH-161 / PGBT", note: "President George Bush Tpke" },
  { road: "SH-303 / Pioneer", note: "Pioneer Pkwy cross-town" },
];

// Services. `klass` is the weight/situation tag used on cards and the class lineup.
export const SERVICES = [
  { name: "Emergency Towing", serviceType: "Emergency towing", url: "/emergency-towing-in-grand-prairie/", klass: "Emergency", icon: "i-crash", blurb: "A breakdown or wreck on I-20, I-30, or SH-360 gets the nearest truck moving fast." },
  { name: "Flatbed Towing", serviceType: "Flatbed towing", url: "/flatbed-towing-in-grand-prairie/", klass: "Specialty", icon: "i-flatbed", blurb: "Lowered, AWD, classic, and non-running vehicles ride flat with no road contact." },
  { name: "Roadside Assistance", serviceType: "Roadside assistance", url: "/roadside-assistance-in-grand-prairie/", klass: "Roadside", icon: "i-battery", blurb: "Jump starts, lockouts, flat-tire changes, and fuel delivery wherever you are stuck." },
  { name: "Light-Duty Towing", serviceType: "Light-duty towing", url: "/light-duty-towing-in-grand-prairie/", klass: "Light", icon: "i-car", blurb: "Cars, SUVs, and pickups towed on a wheel-lift or flatbed, careful and quick." },
  { name: "Heavy-Duty Towing", serviceType: "Heavy-duty towing", url: "/heavy-duty-towing-in-grand-prairie/", klass: "Heavy", icon: "i-truck", blurb: "Box trucks, buses, and loaded rigs recovered with the right heavy wrecker." },
  { name: "Accident Recovery", serviceType: "Accident recovery towing", url: "/accident-recovery-in-grand-prairie/", klass: "Recovery", icon: "i-shield", blurb: "Collision cleanup, careful loading, and a tow to the body shop you choose." },
  { name: "Long-Distance Towing", serviceType: "Long-distance towing", url: "/long-distance-towing-in-grand-prairie/", klass: "Long-Haul", icon: "i-route", blurb: "Out-of-town hauls across Texas, quoted upfront and secured the whole way." },
];

const ORG_ID = SITE.domain + "/#org";
const SITE_ID = SITE.domain + "/#website";

function geoCircle(radius = 24000) {
  return {
    "@type": "GeoCircle",
    geoMidpoint: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    geoRadius: radius,
  };
}

export function orgNode() {
  const node = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": ORG_ID,
    additionalType: "https://en.wikipedia.org/wiki/Towing",
    name: SITE.brand,
    description:
      "24/7 light, heavy, flatbed, and recovery towing plus roadside assistance across Grand Prairie, TX and the surrounding 75050, 75051, and 75052 area.",
    url: SITE.domain + "/",
    logo: SITE.domain + "/favicon.svg",
    image: [SITE.domain + "/images/hero-home.webp", SITE.domain + "/images/hero-heavy-duty.webp"],
    telephone: SITE.phoneTel,
    priceRange: SITE.priceRange,
    areaServed: [
      ...AREAS.map((a) => ({ "@type": "City", name: a.name, addressRegion: "TX" })),
      geoCircle(),
    ],
    geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phoneTel,
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "English",
    },
  };
  if (SITE.sameAs.length) node.sameAs = SITE.sameAs;
  return node;
}

export function websiteNode() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE.domain + "/",
    name: SITE.brand,
    publisher: { "@id": ORG_ID },
  };
}

export function serviceNode({ name, serviceType, description, url, cities }) {
  const area = cities
    ? cities.map((c) => ({ "@type": "City", name: c, addressRegion: "TX" }))
    : [...AREAS.map((a) => ({ "@type": "City", name: a.name, addressRegion: "TX" }))];
  area.push(geoCircle());
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name, serviceType, description,
    url: SITE.domain + url,
    provider: { "@id": ORG_ID },
    areaServed: area,
  };
}

export function breadcrumb(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem", position: i + 1, name: it.name, item: SITE.domain + it.url,
    })),
  };
}

export function itemListNode(services) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem", position: i + 1, name: s.name, url: SITE.domain + s.url,
    })),
  };
}

export function faqNode(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question", name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleNode({ headline, description, url, datePublished, dateModified }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline, description,
    url: SITE.domain + url,
    datePublished, dateModified,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: SITE.domain + url,
  };
}
