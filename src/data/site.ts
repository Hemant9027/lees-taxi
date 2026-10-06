/* ————————————————————————————————————————————————
   Lee's Taxi Services #14 — real business content
   Source: leestaxiservices14.com (current website)
———————————————————————————————————————————————— */

const U = "https://www.leestaxiservices14.com/wp-content/uploads";

export const SITE = {
  name: "Lee's Taxi Services #14",
  shortName: "Lee's Taxi Services",
  altName: "Lee's Bahamas Taxi Services",
  owner: "Leanthia Knowles",
  location: "Long Island, The Bahamas",
  phoneDisplay: "+1 242-464-2495",
  phoneHref: "tel:+12424642495",
  smsHref: "sms:+12424642495",
  email: "leestaxi14@gmail.com",
  founded: "December 2021",
  since: "2021",
  website: "https://www.leestaxiservices14.com/",
  tripadvisor:
    "https://www.tripadvisor.in/Attraction_Review-g148424-d27494087-Reviews-Lee_s_Taxi_Services_14-Long_Island_Out_Islands_Bahamas.html",
  social: {
    facebook: "https://www.facebook.com/leestaxiservices14",
    instagram: "https://www.instagram.com/leestaxi14/",
    twitter: "https://x.com/leestaxi14",
    tripadvisor:
      "https://www.tripadvisor.in/Attraction_Review-g148424-d27494087-Reviews-Lee_s_Taxi_Services_14-Long_Island_Out_Islands_Bahamas.html",
  },
};

export const IMAGES = {
  hero: `${U}/2025/01/IMG-20250128-WA0007.jpg`, // Cape Santa Maria Beach (1600×1200)
  newtonsCayWide: `${U}/2025/01/IMG-20250128-WA0010.jpg`, // Newton's Cay Bridge (1600×777)
  hamiltonsWide: `${U}/2025/01/IMG-20250128-WA0009.jpg`, // Hamilton's Caves (1600×900)
  deansTall: `${U}/2025/01/IMG-20250128-WA0008.jpg`, // Dean's Blue Hole (720×550)
  aboutMain: `${U}/2025/01/438096700_122135464232231268_8475235941642544691_n.jpg`, // alt: "Bahamas taxi service"
  aboutSecondary: `${U}/2025/01/Lee-61.jpeg`,
  logo: `${U}/2022/12/logo2.png`,
  stella: `${U}/2025/01/stella.jpg`,
};

export type Service = {
  id: string;
  index: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: string;
};

export const SERVICES: Service[] = [
  {
    id: "airport-transfers",
    index: "01",
    title: "Airport Transfers",
    description:
      "Arriving at Stella Maris or Deadman's Cay? Arrange your airport transfer in advance and step off the plane into a smooth, stress-free ride.",
    image: `${U}/2025/01/4.jpeg`,
    imageAlt: "Views at Stella Maris Resort, Long Island, Bahamas",
    icon: "plane",
  },
  {
    id: "island-tours",
    index: "02",
    title: "Guided Island Tours",
    description:
      "Explore Long Island from one end to the next with a knowledgeable, engaging local guide — beaches, blue holes, caves and history.",
    image: `${U}/2023/02/2-2.jpeg`,
    imageAlt: "Columbus Monument, Long Island, Bahamas",
    icon: "compass",
  },
  {
    id: "car-rentals",
    index: "03",
    title: "Car Rentals",
    description:
      "Well-maintained, air-conditioned rentals delivered to the airport or your door — drive your own island adventure.",
    image: `${U}/2026/06/Lees-Car-500x360.jpeg`,
    imageAlt: "Lee's car rental vehicle, Long Island, Bahamas",
    icon: "car",
  },
  {
    id: "restaurants",
    index: "04",
    title: "Restaurant Transportation",
    description:
      "Heading out for dinner or fresh conch salad by the sea? Get picked up and dropped off at Long Island's top restaurants.",
    image: `${U}/2025/01/7.jpeg`,
    imageAlt: "Seaside Village — Kenneth's Conch Salad, Long Island",
    icon: "utensils",
  },
  {
    id: "store-pickup",
    index: "05",
    title: "Store Pick-Up & Drop-Off",
    description:
      "Convenient transportation for grocery runs, shopping and supplies while you settle into island life.",
    image: `${U}/2025/01/12.jpg`,
    imageAlt: "Harbour Club, Long Island, Bahamas",
    icon: "shopping",
  },
  {
    id: "beaches-attractions",
    index: "06",
    title: "Beaches, Museums & Attractions",
    description:
      "Rides to Long Island's beaches, museums and attractions — from Gordon's Beach to Hamilton's Cave.",
    image: `${U}/2025/01/5.jpeg`,
    imageAlt: "Gordon's Beach, Long Island, Bahamas",
    icon: "palmtree",
  },
];

export type Destination = {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  blurb?: string;
  tag?: string;
};

/* Real tour/destination list from the current website (duplicates merged) */
export const DESTINATIONS: Destination[] = [
  {
    id: "deans-blue-hole",
    name: "Dean's Blue Hole",
    image: `${U}/2025/01/10.jpeg`,
    imageAlt: "Dean's Blue Hole, Long Island, Bahamas",
    blurb: "One of the deepest blue holes on Earth — a world-famous natural wonder on Long Island's shore.",
    tag: "Natural Wonder",
  },
  {
    id: "columbus-monument",
    name: "Columbus Monument",
    image: `${U}/2023/02/2-2.jpeg`,
    imageAlt: "Columbus Monument, Long Island, Bahamas",
    blurb: "A historic hilltop monument with sweeping views over the island Columbus is said to have visited.",
    tag: "History",
  },
  {
    id: "newtons-cay-bridge",
    name: "Newton's Cay Bridge",
    image: `${U}/2023/02/newton.jpg`,
    imageAlt: "Newton's Cay Bridge, Long Island, Bahamas",
    blurb: "A scenic causeway crossing brilliant turquoise flats — a favourite photo stop on the island.",
    tag: "Scenic Stop",
  },
  {
    id: "hamiltons-cave",
    name: "Hamilton's Cave",
    image: `${U}/2025/01/9.jpeg`,
    imageAlt: "Hamilton's Cave, Long Island, Bahamas",
    blurb: "An extensive cave system of stalactites, Arawak artifacts and underground springs.",
    tag: "Caves",
  },
  {
    id: "stella-maris-views",
    name: "Views @ Stella Maris Resort",
    image: `${U}/2025/01/4.jpeg`,
    imageAlt: "Views at Stella Maris Resort, Long Island, Bahamas",
    blurb: "Elevated ocean views from one of Long Island's best-known resorts.",
    tag: "Ocean Views",
  },
  {
    id: "gordons-beach",
    name: "Gordon's Beach",
    image: `${U}/2025/01/5.jpeg`,
    imageAlt: "Gordon's Beach, Long Island, Bahamas",
    blurb: "A gorgeous stretch of sand with a loved beachside restaurant and bar.",
    tag: "Beach",
  },
  {
    id: "shrimp-hole",
    name: "Shrimp Hole",
    image: `${U}/2025/01/6.jpeg`,
    imageAlt: "Shrimp Hole, Long Island, Bahamas",
    blurb: "A curious local landmark and a regular stop on island tours.",
    tag: "Local Landmark",
  },
  {
    id: "seaside-village",
    name: "Seaside Village — Kenneth's Conch Salad",
    image: `${U}/2025/01/8.jpeg`,
    imageAlt: "Seaside Village and Kenneth's Conch Salad, Long Island, Bahamas",
    blurb: "Homemade conch salad, made right on the beach — a true taste of Long Island.",
    tag: "Food & Drink",
  },
  {
    id: "flying-fish-marina",
    name: "Flying Fish Marina",
    image: `${U}/2025/01/11.jpeg`,
    imageAlt: "Flying Fish Marina, Long Island, Bahamas",
    blurb: "A working marina and a relaxed stop along the island's western shore.",
    tag: "Marina",
  },
  {
    id: "harbour-club",
    name: "Harbour Club",
    image: `${U}/2025/01/12.jpg`,
    imageAlt: "Harbour Club, Long Island, Bahamas",
    blurb: "A friendly harbourfront stop on the island tour route.",
    tag: "Harbourfront",
  },
  {
    id: "st-peter-paul",
    name: "St. Peter & Paul Catholic Church",
    image: `${U}/2025/01/13.jpeg`,
    imageAlt: "St. Peter & Paul Catholic Church, Long Island, Bahamas",
    blurb: "One of Long Island's historic churches, rich with local heritage.",
    tag: "Heritage",
  },
  {
    id: "cape-santa-maria",
    name: "Cape Santa Maria Beach",
    image: `${U}/2025/01/IMG-20250128-WA0007.jpg`,
    imageAlt: "Cape Santa Maria Beach, Long Island, Bahamas",
    blurb: "Miles of powder-white sand and calm, luminous water at the island's northern tip.",
    tag: "Beach",
  },
];

export type CarRental = {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  dayRate: string;
  weekRate: string | null;
  seats: string;
  luggage: string;
};

/* Real rental fleet + real published rates from the current website */
export const CAR_RENTALS: CarRental[] = [
  {
    id: "toyota-passo",
    name: "Toyota Passo",
    image: `${U}/2025/06/Ford-Escape-2-2-500x360.jpg`,
    imageAlt: "Toyota Passo rental car — Long Island, Bahamas",
    dayRate: "$75",
    weekRate: "$450",
    seats: "5 seats",
    luggage: "2 suitcases",
  },
  {
    id: "nissan-xtrail",
    name: "Nissan X-Trail · 2016",
    image: `${U}/2026/05/image-500x360.png`,
    imageAlt: "Nissan X-Trail 2016 rental SUV — Long Island, Bahamas",
    dayRate: "$85",
    weekRate: "$525",
    seats: "5 seats",
    luggage: "5 suitcases",
  },
  {
    id: "nissan-serena",
    name: "Nissan Serena · 2017",
    image: `${U}/2026/06/Lees-Car-500x360.jpeg`,
    imageAlt: "Nissan Serena 2017 rental van — Long Island, Bahamas",
    dayRate: "$120",
    weekRate: null,
    seats: "7 seats",
    luggage: "5 suitcases",
  },
];

export const RENTAL_NOTES = [
  "$100 refundable security deposit",
  "Valid driver's license required",
  "2-day minimum rental",
  "Airport delivery at Stella Maris or Deadman's Cay",
  "Door-to-door delivery & pick-up available",
];

export type Testimonial = {
  name: string;
  title: string;
  text: string;
};

/* Real Tripadvisor reviews as displayed on the current website (all 5★, verified).
   Text preserved verbatim — no invented reviews, names or ratings. */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah W",
    title: "Adorable and Reliable",
    text: "Cape Santa Maria Beach Resort assigned Lee to pick me up at the Stella Maris Airport. Her friendly, efficient manner won me over and I knew I wanted her to be my driver while on the island. On my way to the resort she gave me lots of helpful information and pulled into MGS grocery, in case I needed to pick something up. By the end of the ride, I felt I had made my first friend on Long Island. I plan on returning and will always circle back to her! We have even communicated on WhatsApp since I've returned. In fact, she asked me how my plane ride home was!",
  },
  {
    name: "Tom W",
    title: "Great guide and knowledge",
    text: "Lee was outstanding! Her friendly personality is contagious, and her knowledge of the island was remarkable. She went out of her way to transport us and even took us to a private beach, blue hole and fantastic seaside lunch. If you come to Long Island, I wouldn't recommend anyone else. Thank you, Lee, for a wonderful time.",
  },
  {
    name: "James B",
    title: "More than just a taxi ride!",
    text: "Travelling with Lee was a fantastic experience. So knowledgeable and friendly about the island. Her car was spacious and comfortable and we felt very safe with her driving. I would absolutely recommend hiring her for a day or two to take you to all the amazing spots to see in Long Island, some of which can be hard to find without a guide.",
  },
  {
    name: "mikesabirder",
    title: "Help above and beyond",
    text: "Lee was super helpful to us. We missed a flight and Lee helped get us over to Exuma so we could get back to the States. Couldn't have made it without her! Thank you Lee!",
  },
  {
    name: "111beachgirl",
    title: "Best taxi service ever",
    text: "Leanthia is amazing! If you need a taxi on Long Island Bahamas, she is the best! Super knowledgeable about everything Long Island, punctual and reliable — this was our second trip to the island, and she connected us to secret beaches, helped us find the elusive pink flamingos, and got us to Gordon's beach restaurant and bar. Thanks for all, Leanthia!",
  },
  {
    name: "Voyager08171748839",
    title: "A great tour guide",
    text: "Lee and her friend were great tour guide showed us all over the island took us to the shrimp hole, a couple of the churches, Dean's Blue hole, a great restaurant at lighthouse point and the seaside village for homemade conch salad right on the beach. And don't forget Hamilton caves!",
  },
  {
    name: "Margarita B",
    title: "Best Taxi in Long Island",
    text: "Excellent service and a very good person, we stopped to help and take a family to the airport so they would not miss their flight. Your kindness and professionalism of great value.",
  },
  {
    name: "Inspire780746",
    title: "Lee's Taxi — simply the best!",
    text: "If you're traveling to Long Island/Stella Maris and in need of transportation or the best guide on the island — you'll find no finer professional than Lee!",
  },
  {
    name: "Barry W",
    title: "Best person in Long Island for a great time!",
    text: "Lee is the best, went way above in helping us. She is the best if you are on Long Island and want a great experience! Look her up!",
  },
  {
    name: "Just M",
    title: "Great taxi service and tour guide!",
    text: "Lee was the greatest. She showed us everything on the island and helped us anytime. She was always very kind and made us feel welcomed.",
  },
];

const L = (n: string) => `${U}/2025/01/${n}`;

/* Real photos from the business gallery page (subjects kept generic on purpose) */
export const GALLERY: { src: string; full: string; alt: string; tall?: boolean }[] = [
  { src: L("Lee-61-600x540.jpeg"), full: L("Lee-61.jpeg"), alt: "Lee's Taxi Services — around Long Island, Bahamas" },
  { src: L("Lee-3-600x540.jpeg"), full: L("Lee-3.jpeg"), alt: "Island touring with Lee's Taxi Services", tall: true },
  { src: L("Lee-8-600x540.jpeg"), full: L("Lee-8.jpeg"), alt: "Long Island, Bahamas — guest excursion" },
  { src: L("Lee-17-600x540.jpeg"), full: L("Lee-17.jpeg"), alt: "Exploring Long Island with a local guide", tall: true },
  { src: L("Lee-24-600x540.jpeg"), full: L("Lee-24.jpeg"), alt: "On the road in Long Island, Bahamas" },
  { src: L("Lee-33-600x540.jpeg"), full: L("Lee-33.jpeg"), alt: "Island views, Long Island, Bahamas", tall: true },
  { src: L("Lee-40-600x540.jpeg"), full: L("Lee-40.jpeg"), alt: "Out and about on Long Island" },
  { src: L("Lee-50-600x540.jpeg"), full: L("Lee-50.jpeg"), alt: "Beach day on Long Island, Bahamas", tall: true },
  { src: L("Lee-56-600x540.jpeg"), full: L("Lee-56.jpeg"), alt: "Touring the island with Lee's Taxi" },
  { src: L("Lee-67-600x540.jpeg"), full: L("Lee-67.jpeg"), alt: "Long Island scenery, The Bahamas", tall: true },
  { src: L("Lee-70-600x540.jpeg"), full: L("Lee-70.jpeg"), alt: "Island sights with Lee's Taxi Services" },
  { src: L("Lee-73-600x540.jpeg"), full: L("Lee-73.jpeg"), alt: "Discovering Long Island, Bahamas", tall: true },
];

/* Real Airbnb / vacation rental photos from the current website's Airbnb page */
export const AIRBNB_IMAGES: { src: string; alt: string }[] = [
  { src: L("b31654dc-0ee9-4ac8-af51-8a90f4ed3b57-600x540.jpg"), alt: "Vacation rental accommodation, Long Island, Bahamas" },
  { src: L("cc3c5969-ccd7-4b6f-bb2f-1bad9551c381-600x540.jpg"), alt: "Long Island vacation rental interior" },
  { src: L("b6e1e274-264c-4fc1-913f-a1f108cb8ac4-600x540.jpg"), alt: "Airbnb accommodation, Long Island, Bahamas" },
  { src: L("1e33c0d5-ba31-4985-bc71-4e846bd98703-600x540.jpg"), alt: "Vacation rental living space, Long Island" },
  { src: L("e855ade7-40bf-45ba-930b-7fdd955bcb0c-600x540.jpg"), alt: "Long Island rental bedroom" },
  { src: L("a9435834-43b8-4ce9-85c7-58c578968974-600x540.jpg"), alt: "Vacation rental exterior, Long Island, Bahamas" },
];

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/tours", label: "Tours" },
  { to: "/car-rentals", label: "Car Rentals" },
  { to: "/destinations", label: "Destinations" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export const FAQS = [
  {
    q: "Do taxis wait at the airport on Long Island?",
    a: "No — taxis are not regularly stationed at airports or docks on Long Island. It's highly recommended to arrange your ride in advance so your transportation is secured before you travel. You can make a reservation by calling, messaging or emailing Lee's Taxi Services #14.",
  },
  {
    q: "How do I arrange transportation with Lee's Taxi Services?",
    a: "You can easily make your reservation by calling or messaging +1 242-464-2495, or by emailing leestaxi14@gmail.com. Booking ahead ensures a smooth, stress-free journey from the moment you arrive.",
  },
  {
    q: "Which airports do you serve on Long Island?",
    a: "Lee's Taxi Services arranges airport transfers across Long Island — including pick-ups at Stella Maris Airport — and rental cars can be delivered directly to Stella Maris or Deadman's Cay airport, or right to your door.",
  },
  {
    q: "What do I need to rent a car?",
    a: "Car rentals require a $100 refundable security deposit, a valid driver's license and a 2-day minimum rental. Vehicles are well-maintained and air-conditioned, with airport or door-to-door delivery available.",
  },
  {
    q: "Do you offer guided tours of Long Island?",
    a: "Yes — guided tours run from one end of the island to the next, covering highlights like Dean's Blue Hole, Columbus Monument, Hamilton's Cave, Newton's Cay Bridge and more, with a knowledgeable local guide.",
  },
  {
    q: "Can you help us find a place to stay?",
    a: "Yes — Lee's Taxi Services can help you find and book Airbnb and vacation rental units in Long Island for care-free travel. Just ask when you call.",
  },
];

export const SERVICE_ICONS: Record<string, string> = {
  plane: "plane",
  compass: "compass",
  car: "car",
  utensils: "utensils",
  shopping: "shopping",
  palmtree: "palmtree",
};
