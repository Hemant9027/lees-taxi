import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, BedDouble } from "lucide-react";
import { cn } from "../utils/cn";
import { SERVICES } from "../data/site";
import { BookButton, CallButton, Reveal, SafeImg, SectionHeader, ServiceIcon, usePageMeta } from "../components/ui";
import { AirportPanel, FinalCta, PhoneCtaNote, TrustMarquee } from "../components/sections";

const DETAILS: Record<string, string[]> = {
  "airport-transfers": [
    "Pre-arranged pick-ups timed to your flight",
    "Serving arrivals across Long Island, including Stella Maris Airport",
    "Store stops available on the way to your stay",
  ],
  "island-tours": [
    "Full-island sightseeing, from one end to the next",
    "Blue holes, caves, monuments, churches, marinas and beaches",
    "Knowledgeable, engaging local guidance throughout",
  ],
  "car-rentals": [
    "Well-maintained, air-conditioned vehicles",
    "Airport delivery at Stella Maris or Deadman's Cay",
    "Door-to-door delivery and pick-up",
  ],
  restaurants: [
    "Rides to Long Island's top restaurants",
    "Beachside favourites like Gordon's Beach and Seaside Village",
    "Evening pick-ups so you can relax and enjoy",
  ],
  "store-pickup": [
    "Grocery and supply runs made easy",
    "Pick-up and drop-off at island stores",
    "Perfect for settling in after arrival",
  ],
  "beaches-attractions": [
    "Transportation to beaches and island attractions",
    "Museum visits and heritage stops",
    "Build a custom day around what you want to see",
  ],
};

export default function Services() {
  usePageMeta(
    "Services — Taxi, Airport Transfers, Tours & More | Lee's Taxi Services #14",
    "Airport transfers, guided Long Island tours, car rentals, restaurant transportation, store pick-up/drop-off and beach transportation — Lee's Taxi Services #14, Long Island, Bahamas."
  );

  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 180);
    }
  }, [hash]);

  return (
    <>
      <section className="bg-sand-50 pt-32 pb-16 sm:pt-40 sm:pb-20" aria-labelledby="services-page-heading">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeader
            eyebrow="Taxi & tour service · Bahamas"
            title={
              <span id="services-page-heading">
                Everything you need to <span className="italic font-normal text-ocean-700">move around</span> Long Island
              </span>
            }
            lead="Lee's Bahamas taxi services offers reliable and affordable transportation with professional drivers — safe, punctual and dependable rides, every time."
            className="max-w-3xl"
          />
          <Reveal delay={150} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BookButton />
            <CallButton tone="sand" />
          </Reveal>
        </div>
      </section>
      <TrustMarquee tone="ink" />

      <section className="bg-white py-16 sm:py-24" aria-label="Service details">
        <div className="mx-auto w-full max-w-7xl space-y-16 px-5 sm:space-y-24 sm:px-8">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id}>
              <article
                id={s.id}
                className={cn(
                  "grid scroll-mt-28 items-center gap-8 lg:grid-cols-2 lg:gap-14",
                  i % 2 === 1 && "lg:[&>*:first-child]:order-2"
                )}
              >
                <div className="relative">
                  <SafeImg
                    src={s.image}
                    alt={s.imageAlt}
                    loading="lazy"
                    frameClassName="aspect-[4/3] rounded-[2rem]"
                    className="rounded-[2rem]"
                  />
                  <span className="absolute top-5 left-5 flex h-12 w-12 items-center justify-center rounded-full bg-ink-950/85 text-sand-100 backdrop-blur">
                    <ServiceIcon name={s.icon} className="h-5.5 w-5.5" />
                  </span>
                </div>
                <div>
                  <p className="font-display text-sm italic text-ocean-600">{s.index} — Service</p>
                  <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight text-balance text-ink-900 sm:text-4xl">
                    {s.title}
                  </h2>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-700/85">{s.description}</p>
                  <ul className="mt-6 space-y-2.5">
                    {DETAILS[s.id].map((d) => (
                      <li key={d} className="flex items-start gap-3 text-[0.93rem] font-semibold text-ink-800">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-ocean-600" aria-hidden />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap items-center gap-5">
                    {s.id === "car-rentals" ? (
                      <Link
                        to="/car-rentals"
                        className="group inline-flex items-center gap-2 text-sm font-bold text-ocean-700 hover:text-ocean-800"
                      >
                        <span className="link-line">See rental cars & rates</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                      </Link>
                    ) : (
                      <BookButton label="Arrange This" />
                    )}
                    <PhoneCtaNote />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Airbnb crossover (real content from the site's Airbnb page) */}
      <section className="bg-sand-100 py-16 sm:py-20" aria-labelledby="airbnb-teaser-heading">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-8 px-5 sm:px-8">
          <Reveal className="max-w-xl">
            <p className="eyebrow flex items-center gap-3 text-ocean-600">
              <BedDouble className="h-4 w-4" aria-hidden />
              Places to stay
            </p>
            <h2 id="airbnb-teaser-heading" className="font-display mt-3 text-3xl font-semibold tracking-tight text-balance text-ink-900 sm:text-4xl">
              Need a place to stay, too?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-700/85">
              Lee's Taxi Services can help you find and book Airbnb and vacation rental units in Long Island for
              care-free travel.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <Link
              to="/airbnb"
              className="group inline-flex min-h-12 items-center gap-2.5 rounded-full bg-ink-900 px-6 text-[15px] font-bold text-sand-50 shadow-soft transition-all hover:bg-ink-800 hover:shadow-lift"
            >
              Airbnb & vacation rentals
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      <AirportPanel />
      <FinalCta />
    </>
  );
}
