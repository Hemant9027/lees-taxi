import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Waves, Gem, Landmark, UtensilsCrossed, Church, Anchor } from "lucide-react";
import { DESTINATIONS, IMAGES } from "../data/site";
import { PageHero, Reveal, SafeImg, SectionHeader, usePageMeta } from "../components/ui";
import { FinalCta } from "../components/sections";

const FACETS = [
  {
    icon: Waves,
    title: "Beaches",
    text: "Powder-white sand and impossibly calm water — from Cape Santa Maria at the north tip to Gordon's Beach further south.",
    image: IMAGES.hero,
    imageAlt: "Cape Santa Maria Beach, Long Island, Bahamas",
  },
  {
    icon: Gem,
    title: "Blue Holes & Nature",
    text: "Long Island is blue hole country — none more famous than Dean's, plunging straight down into sapphire.",
    image: IMAGES.deansTall,
    imageAlt: "Dean's Blue Hole, Long Island, Bahamas",
  },
  {
    icon: Landmark,
    title: "Caves & History",
    text: "Explore Hamilton's Cave system, the Columbus Monument and the island's historic settlements.",
    image: IMAGES.hamiltonsWide,
    imageAlt: "Hamilton's Cave, Long Island, Bahamas",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurants & Local Flavour",
    text: "Fresh conch salad at Seaside Village, beachside bars and harbourfront stops — a real taste of the island.",
    image: DESTINATIONS.find((d) => d.id === "seaside-village")!.image,
    imageAlt: "Seaside Village — Kenneth's Conch Salad, Long Island",
  },
  {
    icon: Church,
    title: "Churches & Heritage",
    text: "Historic churches like St. Peter & Paul tell the story of Long Island's communities.",
    image: DESTINATIONS.find((d) => d.id === "st-peter-paul")!.image,
    imageAlt: "St. Peter & Paul Catholic Church, Long Island, Bahamas",
  },
  {
    icon: Anchor,
    title: "Marinas & Harbours",
    text: "Working marinas, quiet docks and the views at Stella Maris — island life runs on the water.",
    image: DESTINATIONS.find((d) => d.id === "flying-fish-marina")!.image,
    imageAlt: "Flying Fish Marina, Long Island, Bahamas",
  },
];

export default function Destinations() {
  usePageMeta(
    "Long Island, Bahamas Destinations — Beaches, Blue Holes, Caves & More | Lee's Taxi Services #14",
    "See more of Long Island, The Bahamas — beaches, blue holes, caves, churches, marinas and restaurants, all reachable with Lee's Taxi Services #14."
  );

  return (
    <>
      <PageHero
        eyebrow="The destination"
        title={
          <>
            See more of <span className="italic font-normal text-ocean-300">Long Island</span>
          </>
        }
        lead="Eighty miles of quiet roads, hidden beaches and natural wonders. Getting there is half the experience — we'll drive, you explore."
        image={IMAGES.newtonsCayWide}
        imageAlt="Newton's Cay Bridge crossing turquoise flats on Long Island, Bahamas"
      />

      <section className="bg-sand-50 py-16 sm:py-24" aria-labelledby="facets-heading">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeader
            eyebrow="Island highlights"
            title={
              <span id="facets-heading">
                One island, <span className="italic font-normal text-ocean-700">endless sides</span>
              </span>
            }
            lead="Long Island isn't one beach — it's a whole world of places worth the drive. Here's what waits at the end of the road."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {FACETS.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 90} className="h-full">
                <Link to="/tours" className="card-hover group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-900/8 bg-white shadow-soft">
                  <div className="relative">
                    <SafeImg
                      src={f.image}
                      alt={f.imageAlt}
                      loading="lazy"
                      frameClassName="aspect-[16/10]"
                      className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                    <span className="absolute top-4 left-4 flex h-11 w-11 items-center justify-center rounded-full bg-ink-950/85 text-sand-100 backdrop-blur">
                      <f.icon className="h-5 w-5" aria-hidden />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-ink-900">{f.title}</h3>
                    <p className="mt-2 flex-1 text-[0.93rem] leading-relaxed text-ink-700/80">{f.text}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-ocean-700">
                      <span className="link-line">Explore on tour</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Island route band */}
      <section className="relative isolate overflow-hidden bg-ink-950 py-16 sm:py-24" aria-labelledby="route-heading">
        <div className="grain absolute inset-0" />
        <div className="relative mx-auto w-full max-w-5xl px-5 sm:px-8">
          <SectionHeader
            tone="light"
            align="center"
            eyebrow="North to south"
            title={
              <span id="route-heading">
                From Cape Santa Maria to <span className="italic font-normal text-ocean-300">Dean's Blue Hole</span>
              </span>
            }
            lead="Long Island runs roughly 80 miles from tip to tip. Wherever you're staying, every one of these stops can be part of your day with Lee."
          />
          <Reveal delay={140}>
            <ol className="relative mx-auto mt-14 max-w-2xl space-y-0" aria-label="Island route">
              <span className="absolute top-4 bottom-4 left-[1.05rem] w-px bg-gradient-to-b from-ocean-400/70 via-ocean-400/25 to-transparent" aria-hidden />
              {DESTINATIONS.slice(0, 7).map((d, i) => (
                <li key={d.id} className="relative flex items-center gap-5 py-3.5">
                  <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ocean-400/40 bg-ink-900 text-[0.7rem] font-bold text-ocean-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg font-medium text-sand-100 sm:text-xl">{d.name}</span>
                  {d.tag && (
                    <span className="ml-auto hidden rounded-full border border-white/12 px-3 py-1 text-[0.62rem] font-bold tracking-[0.18em] uppercase text-sand-200/60 sm:block">
                      {d.tag}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={180} className="mt-12 text-center">
            <Link
              to="/tours"
              className="group inline-flex min-h-12 items-center gap-2.5 rounded-full bg-sand-100 px-7 text-[15px] font-bold text-ink-900 transition-all hover:bg-white"
            >
              Browse all tour stops
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
