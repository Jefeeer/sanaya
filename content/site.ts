/**
 * Every word, link, price and photo on the site lives here.
 * Search for "TODO(owner)" to find details still waiting on Sanaya's management.
 * Leave a value as `null` and the page shows a graceful "on request" fallback instead.
 */

export type EventTypeId = "wedding" | "debut" | "corporate" | "intimate";

export type Photo = { src: string; alt: string };

// Placeholder photography (Unsplash). TODO(owner): replace with Sanaya's own photos in /public/images.
const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

export const photos = {
  heroArch: { src: u("photo-1529636798458-92182e662485"), alt: "Floral ceremony arch with white drapes overlooking green highland hills" },
  greeneryTable: { src: u("photo-1522413452208-996ff3f3e740"), alt: "Wooden banquet table dressed with eucalyptus garland, white plates and glassware" },
  coupleDusk: { src: u("photo-1532712938310-34cb3982ef74"), alt: "Couple walking hand in hand across a misty hilltop at dusk" },
  stringLights: { src: u("photo-1517457373958-b7bdd4587205"), alt: "Guests mingling under warm string lights at an evening party" },
  dessertTable: { src: u("photo-1478146059778-26028b07395a"), alt: "Celebration dessert table with cake, candles and fresh flowers" },
  drapedHall: { src: u("photo-1510076857177-7470076d4098"), alt: "Reception hall with draped ceiling fabric and warm fairy lights" },
  gardenGazebo: { src: u("photo-1523438885200-e635ba2c371e"), alt: "White garden gazebo with flower garlands set for a ceremony" },
  holdingHands: { src: u("photo-1520854221256-17451cc331bf"), alt: "Bride and groom holding hands on the lawn" },
  longTable: { src: u("photo-1519225421980-715cb0215aed"), alt: "Long reception table with linen, flowers and wooden chairs" },
  floralTable: { src: u("photo-1511795409834-ef04bbd61622"), alt: "Table set with wine glasses and a colorful floral centerpiece" },
  balloons: { src: u("photo-1530103862676-de8c9debad1d"), alt: "Bunch of pastel balloons floating for a birthday celebration" },
  gardenAisle: { src: u("photo-1469371670807-013ccf25f16a"), alt: "Garden ceremony aisle lined with rose arrangements and white chairs" },
  platedDinner: { src: u("photo-1414235077428-338989a2e8c0"), alt: "Plated dinner course served at a candlelit table" },
  buffet: { src: u("photo-1555244162-803834f70033"), alt: "Catered buffet spread in chafing dishes with garnishes" },
  sharedDishes: { src: u("photo-1504674900247-0877df9cc836"), alt: "Overhead view of grilled meat and fresh salad dishes" },
  seminar: { src: u("photo-1540575467063-178a50c2df87"), alt: "Audience seated for a company talk in a darkened hall" },
  functionRoom: { src: u("photo-1511578314322-379afb476865"), alt: "Function room with round tables and projector screens set for a company event" },
  bouquet: { src: u("photo-1519741497674-611481863552"), alt: "Bride holding a white bouquet in soft golden light" },
  friendsDining: { src: u("photo-1528605248644-14dd04022da1"), alt: "Friends laughing and sharing food around a long table" },
  cocktail: { src: u("photo-1470337458703-46ad1756a187"), alt: "Bartender pouring a drink over a large ice cube" },
} satisfies Record<string, Photo>;

export const business = {
  name: "Sanaya Events Place",
  shortName: "Sanaya",
  tagline: "Your special event starts with the perfect menu.",
  description:
    "An events place in Tagaytay for weddings, debuts, corporate gatherings and private celebrations — where the food is the highlight.",
  address: {
    street: "582 Maitim 2nd East",
    city: "Tagaytay City",
    region: "Cavite",
    postalCode: "4120",
    country: "PH",
    full: "582 Maitim 2nd East, Tagaytay City, 4120 Cavite, Philippines",
  },
  geo: { lat: 14.1307004, lng: 120.9570701 },
  phoneDisplay: "0993 119 7056",
  phoneHref: "tel:+639931197056",
  viberHref: "viber://chat?number=%2B639931197056",
  email: "sanaya.eventplace@gmail.com",
  facebook: "https://www.facebook.com/sanayaeventsplacetagaytay",
  messenger: "https://m.me/sanayaeventsplacetagaytay",
  instagram: "https://www.instagram.com/sanaya.eventplace/",
  instagramHandle: "@sanaya.eventplace",
  mapsUrl: "https://maps.google.com/?q=14.1307004,120.9570701",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=14.1307004,120.9570701",
  listedOn: "Weddings and Beyond",
  // TODO(owner): typical reply time you can commit to, e.g. "within 2 hours". Leave null to hide.
  replyPromise: null as string | null,
};

export const nav = [
  { label: "Events", href: "#events" },
  { label: "Spaces", href: "#spaces" },
  { label: "Menu", href: "#menu" },
  { label: "Packages", href: "#packages" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Location", href: "#location" },
];

export const hero = {
  eyebrow: "Events place · Tagaytay City",
  title: "Celebrate in Tagaytay, where every gathering begins at the table.",
  subtitle:
    "Weddings, debuts and company events in Maitim 2nd East — cool highland air, warm Filipino hospitality, and a menu your guests will talk about long after the last dance.",
  image: photos.heroArch,
  trust: ["Weddings", "Debuts", "Corporate", "Private parties"],
};

export const eventTypes: {
  id: EventTypeId;
  label: string;
  promise: string;
  image: Photo;
  // Suggested package to preselect when a visitor clicks "See packages".
  packageId: string;
}[] = [
  {
    id: "wedding",
    label: "Weddings",
    promise: "Ceremony, dinner and dancing in one unhurried highland evening.",
    image: photos.gardenAisle,
    packageId: "classic",
  },
  {
    id: "debut",
    label: "Debuts & Birthdays",
    promise: "Eighteen roses, a grand entrance, and a buffet the titas will approve.",
    image: photos.dessertTable,
    packageId: "classic",
  },
  {
    id: "corporate",
    label: "Corporate & Team Events",
    promise: "Christmas parties, seminars and team days, an easy drive from Manila.",
    image: photos.functionRoom,
    packageId: "grand",
  },
  {
    id: "intimate",
    label: "Intimate Celebrations",
    promise: "Anniversaries, baptisms and reunions with family-style warmth.",
    image: photos.friendsDining,
    packageId: "intimate",
  },
];

export type Space = {
  name: string;
  setting: "Indoor" | "Outdoor" | "Indoor & outdoor" | null;
  capacity: string | null;
  description: string;
  features: string[];
  image: Photo;
};

// TODO(owner): confirm the real spaces, their names, indoor/outdoor, capacity and features.
export const spaces: Space[] = [
  {
    name: "The Garden",
    setting: null,
    capacity: null,
    description:
      "Say your vows in the cool Tagaytay air, then let the evening unfold under warm lights as dinner is served.",
    features: [], // TODO(owner) e.g. "Ceremony arch", "String lights", "Lawn for cocktails"
    image: photos.gardenGazebo,
  },
  {
    name: "The Hall",
    setting: null,
    capacity: null,
    description:
      "A sheltered space for receptions, debuts and company programs — styled to your theme, whatever the weather.",
    features: [], // TODO(owner) e.g. "Air-conditioned", "Stage", "Sound system & projector"
    image: photos.drapedHall,
  },
  {
    name: "The Table",
    setting: null,
    capacity: null,
    description:
      "Every Sanaya celebration is planned around the meal — from cocktail hour bites to the last plate of dessert.",
    features: [], // TODO(owner) e.g. "In-house catering", "Food tasting", "Buffet or plated"
    image: photos.longTable,
  },
];

export const menuStory = {
  eyebrow: "The Sanaya table",
  title: "Your special event starts with the perfect menu.",
  body: [
    "Ask anyone what they remember about a celebration and they will tell you about the food. At Sanaya, the menu is not an add-on — it is where planning begins.",
    "Sit down with us for a food tasting, choose dishes that feel like your family, and we will build the whole evening around them.",
  ],
  // TODO(owner): cuisine style and how the menu works (buffet / plated / family style, number of courses).
  // Rendered as a menu card. Courses are a sample format, labelled as such on the page.
  sampleMenu: [
    { course: "To start", detail: "Soup & fresh salad" },
    { course: "From the kitchen", detail: "Choice of beef, pork, chicken & fish" },
    { course: "Alongside", detail: "Pasta or noodles, steamed rice" },
    { course: "To finish", detail: "Dessert & bottomless iced tea" },
  ],
  images: [photos.platedDinner, photos.buffet, photos.sharedDishes, photos.greeneryTable],
};

export type Package = {
  id: string;
  name: string;
  forWho: string;
  startingPrice: number | null; // ₱, TODO(owner)
  pax: number | null; // guests included, TODO(owner)
  inclusions: string[]; // TODO(owner): only list confirmed inclusions
  featured?: boolean;
};

export const packages: Package[] = [
  {
    id: "intimate",
    name: "Intimate",
    forWho: "Small gatherings, anniversaries & family milestones",
    startingPrice: null,
    pax: null,
    inclusions: ["Venue use", "Catered menu", "Tables, chairs & linens"], // TODO(owner): confirm
  },
  {
    id: "classic",
    name: "Classic",
    forWho: "Weddings & debuts with the full celebration",
    startingPrice: null,
    pax: null,
    inclusions: ["Venue use", "Catered menu with food tasting", "Tables, chairs & linens", "Basic styling"], // TODO(owner): confirm
    featured: true,
  },
  {
    id: "grand",
    name: "Grand",
    forWho: "Large weddings & company events",
    startingPrice: null,
    pax: null,
    inclusions: ["Venue use", "Catered menu with food tasting", "Tables, chairs & linens", "Event coordination"], // TODO(owner): confirm
  },
];

export const packagesNote = "Prices are subject to date and guest count. Every package can be adjusted to your plans.";

// Only confirmed points. TODO(owner): confirm or add parking, backup power, styling support, etc.
export const whySanaya: { title: string; body: string; icon: "utensils" | "mountain" | "map" | "heart" | "car" | "zap" }[] = [
  { title: "Catering-first", body: "Your menu is planned with you from the very first visit — the food is the highlight, not an afterthought.", icon: "utensils" },
  { title: "Cool highland setting", body: "Tagaytay's breezy climate makes long celebrations comfortable for guests of every age.", icon: "mountain" },
  { title: "Easy to reach", body: "In Maitim 2nd East, Tagaytay — a straightforward drive from Manila and the rest of Cavite.", icon: "map" },
  { title: "Personal & warm", body: "Talk to real people who answer your messages and walk you through every detail.", icon: "heart" },
];

export type GalleryCategory = "Weddings" | "Debuts" | "Corporate" | "Venue" | "Food";

// TODO(owner): replace with real Sanaya events.
export const gallery: (Photo & { category: GalleryCategory; tall?: boolean })[] = [
  { ...photos.bouquet, category: "Weddings", tall: true },
  { ...photos.greeneryTable, category: "Food" },
  { ...photos.balloons, category: "Debuts" },
  { ...photos.drapedHall, category: "Venue", tall: true },
  { ...photos.holdingHands, category: "Weddings" },
  { ...photos.seminar, category: "Corporate" },
  { ...photos.floralTable, category: "Food", tall: true },
  { ...photos.stringLights, category: "Venue" },
  { ...photos.dessertTable, category: "Debuts" },
  { ...photos.coupleDusk, category: "Weddings", tall: true },
  { ...photos.functionRoom, category: "Corporate" },
  { ...photos.cocktail, category: "Food" },
];

// TODO(owner): real reviews with names and permission only. The section stays hidden while empty.
export const testimonials: { quote: string; name: string; event: string }[] = [];

export const bookingSteps = [
  { title: "Inquire", body: "Send your date, guest count and event type. We reply with availability and a quote." },
  { title: "Visit & taste", body: "Tour the venue on an ocular visit and sample the menu at a food tasting." },
  { title: "Reserve", body: "Secure your date with a reservation fee. Your date is locked once confirmed." },
  { title: "Celebrate", body: "We handle the setup, the kitchen and the timeline. You enjoy the day." },
];

const ask = "Message us for details and we will walk you through it.";

// TODO(owner): replace each `null` with the real answer. Unfilled answers show a friendly fallback.
export const faqs: { q: string; a: string | null }[] = [
  { q: "How many guests can Sanaya accommodate?", a: null },
  { q: "Can we hold the ceremony and reception in one place?", a: null },
  { q: "What is included in your packages?", a: null },
  { q: "Can we bring an outside caterer or suppliers? Is there a corkage fee?", a: null },
  { q: "What are the ingress, egress and event hours?", a: null },
  { q: "Is there parking for guests?", a: null },
  { q: "Do you have a bridal room or accommodations?", a: null },
  { q: "What happens if it rains?", a: null },
  { q: "How much is the reservation fee and what are the payment terms?", a: null },
  { q: "When can we schedule an ocular visit or food tasting?", a: null },
].map((f) => ({ ...f, a: f.a ?? ask }));

export const location = {
  // TODO(owner): confirm landmarks and typical travel times.
  directions: [
    "Located at 582 Maitim 2nd East, Tagaytay City.",
    "From Manila, take SLEX or CAVITEX–CALAX toward Tagaytay, then follow your map app to the pin.",
  ],
};

export const budgetRanges = ["Below ₱100k", "₱100k – ₱200k", "₱200k – ₱350k", "₱350k and up", "Not sure yet"];
export const contactMethods = ["Call", "Viber", "Messenger", "Email"];

export const formatPeso = (n: number) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(n);
