import { Link } from "react-router-dom";
import { ArrowRight, Clock, Route, Info, Ticket } from "lucide-react";
import { DESTINATIONS, IMAGES } from "../data/site";
import { BookButton, PageHero, Reveal, SafeImg, SectionHeader, usePageMeta } from "../components/ui";
import { DestinationCard, FinalCta, PhoneCtaNote } from "../components/sections";

const TOUR_STYLES = [
  {
    icon: Route,
    title: "Full-Island Guided Tour",
    time: "Full day · 6–7 hours",
    text: "The complete Long Island experience — key highlights like Dean's Blue Hole, Columbus Point, beach stops and historic sites, with a certified local guide in an air-conditioned vehicle.",
  },
  {
    icon: Clock,
    title: "Short Guided Land Tours",
    time: "Around 3 hours",
    text: "Regional tours covering North, Central or South Long Island highlights — a perfect way to see a lot when time is short.",
  },
  {
    icon: Ticket,
    title: "Build-Your-Own Day",
    time: "Flexible",
    text: "Pick the stops that interest you most — beaches, caves, restaurants, marinas — and Lee will shape the day around your plans.",
  },
];

export default function Tours() {
  usePageMeta(
    "Long Island Bahamas Tours — Dean's Blue Hole, Columbus Monument & More | Lee's Taxi Services #14",
    "Guided Long Island, Bahamas tours from one end of the island to the next — Dean's Blue Hole, Columbus Monument, Hamilton's Cave, Newton's Cay Bridge, beaches, marinas and more."
  );

  const [deans, ...rest] = DESTINATIONS;

  return (
    <>
      <PageHero
        eyebrow="Guided island tours"
        title={
          <>
            From one end of the island <span className="italic font-normal text-ocean-300">to the next</span>
          </>
        }
        lead="Long Island rewards the curious — blue holes, caves, monuments, hidden beaches and harbourfront stops. Explore it all with a knowledgeable local guide."
        image={IMAGES.hamiltonsWide}
        imageAlt="Hamilton's Cave — a guided stop on Long Island, Bahamas tours"
      />

      {/* Tour styles */}
      <section className="bg-sand-50 py-16 sm:py-24" aria-labelledby="tour-styles-heading">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeader
            eyebrow="Ways to tour"
            title={<>Choose your <span className="italic font-normal text-ocean-700">island day</span></>}
            lead="Straightforward tour options, planned around your arrival, your stay and your pace. Call or message to plan."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3 sm:gap-6">
            {TOUR_STYLES.map((t, i) => (
              <Reveal key={t.title} delay={i * 100}>
                <div className="card-hover h-full rounded-3xl border border-ink-900/8 bg-white p-7 shadow-soft">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ocean-600/10 text-ocean-700">
                    <t.icon className="h-5.5 w-5.5" aria-hidden />
                  </span>
                  <p className="mt-5 text-[0.7rem] font-bold tracking-[0.2em] uppercase text-ocean-600">{t.time}</p>
                  <h3 className="font-display mt-1.5 text-xl font-semibold tracking-tight text-ink-900">{t.title}</h3>
                  <p className="mt-2.5 text-[0.93rem] leading-relaxed text-ink-700/80">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Destination grid */}
      <section className="bg-white py-16 sm:py-24" aria-labelledby="destinations-grid-heading">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeader
            eyebrow="Tour stops"
            title={
              <span id="destinations-grid-heading">
                Where would you like to <span className="italic font-normal text-ocean-700">go?</span>
              </span>
            }
            lead="Every stop below is part of the Lee's Taxi Services tour map. Tap any destination to start planning your ride."
          />

          {/* Featured: Dean's Blue Hole */}
          <Reveal className="mt-12">
            <Link
              to="/contact"
              className="card-hover group relative block overflow-hidden rounded-[2rem] shadow-soft"
              aria-label="Dean's Blue Hole — plan your visit"
            >
              <SafeImg
                src={deans.image}
                alt={deans.imageAlt}
                loading="lazy"
                frameClassName="aspect-[16/11] w-full sm:aspect-[21/9]"
                className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent p-6 sm:p-10">
                <span className="mb-3 w-fit rounded-full border border-white/25 bg-ink-950/40 px-3.5 py-1.5 text-[0.62rem] font-bold tracking-[0.2em] uppercase text-sand-100 backdrop-blur-sm">
                  {deans.tag} · Most requested
                </span>
                <h3 className="font-display max-w-xl text-3xl leading-tight font-semibold text-balance text-white sm:text-4xl">
                  {deans.name}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-sand-200/85 sm:text-base">{deans.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[0.8rem] font-bold tracking-[0.16em] uppercase text-ocean-300">
                  Plan your visit
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {rest.map((d, i) => (
              <DestinationCard key={d.id} d={d} delay={(i % 3) * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* Good to know — real facts published on leestaxiservices14.com */}
      <section className="bg-sand-100 py-16 sm:py-20" aria-labelledby="good-to-know-heading">
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
          <Reveal>
            <div className="rounded-[2rem] border border-ink-900/8 bg-white p-7 shadow-soft sm:p-10">
              <p className="eyebrow flex items-center gap-3 text-ocean-600">
                <Info className="h-4 w-4" aria-hidden />
                Good to know
              </p>
              <h2 id="good-to-know-heading" className="font-display mt-3 text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
                Planning notes for island explorers
              </h2>
              <ul className="mt-6 grid gap-x-10 gap-y-4 text-[0.95rem] leading-relaxed text-ink-700/90 sm:grid-cols-2">
                <li className="flex gap-3">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-ocean-600" aria-hidden />
                  Entry to Dean's Blue Hole is free — snorkelling gear can be rented on-site for around $15–20.
                </li>
                <li className="flex gap-3">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-ocean-600" aria-hidden />
                  Hamilton's Cave admission is about $15 per adult and $8 per child.
                </li>
                <li className="flex gap-3">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-ocean-600" aria-hidden />
                  Taxis are not stationed at airports or docks — arrange your tour pick-up in advance.
                </li>
                <li className="flex gap-3">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-ocean-600" aria-hidden />
                  Some of Long Island's best spots are hard to find without a local guide — that's the point of touring with Lee.
                </li>
              </ul>
              <div className="mt-8 flex flex-col gap-3 border-t border-ink-900/8 pt-7 sm:flex-row sm:items-center sm:justify-between">
                <PhoneCtaNote />
                <BookButton label="Plan My Tour" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
