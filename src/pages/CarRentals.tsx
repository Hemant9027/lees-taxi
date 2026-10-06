import { Link } from "react-router-dom";
import { ArrowRight, BadgeDollarSign, CalendarCheck, CarFront, IdCard, Luggage, MapPin, Users } from "lucide-react";
import { CAR_RENTALS, RENTAL_NOTES } from "../data/site";
import { BookButton, CallButton, PageHero, Reveal, SafeImg, SectionHeader, usePageMeta } from "../components/ui";
import { FinalCta, PhoneCtaNote } from "../components/sections";

const NOTE_ICONS = [BadgeDollarSign, IdCard, CalendarCheck, MapPin, CarFront];

export default function CarRentals() {
  usePageMeta(
    "Car Rentals in Long Island, Bahamas — From $75/Day | Lee's Taxi Services #14",
    "Rent a well-maintained, air-conditioned car in Long Island, Bahamas. Airport delivery at Stella Maris or Deadman's Cay, or delivered to your door. From $75/day."
  );

  return (
    <>
      <PageHero
        eyebrow="Cars for rent in Long Island"
        title={
          <>
            Take the wheel with Lee's — <span className="italic font-normal text-ocean-300">your island, your ride</span>
          </>
        }
        lead="Why just ride when you can drive your own island adventure? Easy, breezy car rentals to help you explore Long Island like a local."
        image={"https://www.leestaxiservices14.com/wp-content/uploads/2025/01/Lee-24.jpeg"}
        imageAlt="On the road in Long Island, The Bahamas — explore with a Lee's rental car"
      />

      {/* Rental notes strip */}
      <section className="border-b border-ink-900/8 bg-sand-100 py-10" aria-label="What you need to know">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <Reveal>
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {RENTAL_NOTES.map((n, i) => {
                const Icon = NOTE_ICONS[i % NOTE_ICONS.length];
                return (
                  <li key={n} className="flex items-center gap-2.5 text-[0.85rem] font-bold text-ink-800">
                    <Icon className="h-4.5 w-4.5 text-ocean-600" aria-hidden />
                    {n}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Fleet */}
      <section className="bg-sand-50 py-16 sm:py-24" aria-labelledby="fleet-heading">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeader
            eyebrow="The rental fleet"
            title={
              <span id="fleet-heading">
                Well-maintained & <span className="italic font-normal text-ocean-700">air-conditioned</span>
              </span>
            }
            lead="Perfect for beach runs, sightseeing or spontaneous island escapes. We'll deliver your rental directly to the airport — Stella Maris or Deadman's Cay — or right to your door, and pick it up when you're done."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {CAR_RENTALS.map((car, i) => (
              <Reveal key={car.id} delay={i * 100}>
                <article className="card-hover group flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-ink-900/8 bg-white shadow-soft">
                  <SafeImg
                    src={car.image}
                    alt={car.imageAlt}
                    loading="lazy"
                    frameClassName="aspect-[500/360] w-full"
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-ink-900">{car.name}</h3>
                    <div className="mt-3 flex items-center gap-4 text-[0.85rem] font-semibold text-ink-700/75">
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-ocean-600" aria-hidden /> {car.seats}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Luggage className="h-4 w-4 text-ocean-600" aria-hidden /> {car.luggage}
                      </span>
                    </div>
                    <div className="mt-5 flex items-end gap-2 border-t border-ink-900/8 pt-5">
                      <p className="font-display text-4xl font-semibold text-ocean-700">{car.dayRate}</p>
                      <p className="pb-1.5 text-sm font-semibold text-ink-700/70">/ day</p>
                      {car.weekRate && (
                        <p className="ml-auto pb-1.5 text-sm font-semibold text-ink-700/70">
                          {car.weekRate} <span className="text-ink-700/50">/ week</span>
                        </p>
                      )}
                    </div>
                    <p className="text-xs text-ink-700/55">Starting from · 2-day minimum</p>
                    <Link
                      to="/contact"
                      className="group/btn mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-ink-900 px-5 text-sm font-bold text-sand-50 transition-all hover:bg-ocean-700"
                      aria-label={`Ask about renting the ${car.name}`}
                    >
                      Ask about this rental
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" aria-hidden />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-ink-700/65">
              Rates shown are the published starting rates. Steer into the adventure — left side, best ride! Call to
              confirm availability for your dates.
            </p>
          </Reveal>
        </div>
      </section>

      {/* How renting works */}
      <section className="bg-white py-16 sm:py-24" aria-labelledby="how-rental-heading">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="How it works"
              title={
                <span id="how-rental-heading">
                  Flying in? Your car can be <span className="italic font-normal text-ocean-700">waiting</span>
                </span>
              }
            />
            <Reveal delay={120}>
              <ol className="mt-8 space-y-5">
                {[
                  { n: "01", t: "Call or message", d: `Tell us your dates and arrival airport — Stella Maris or Deadman's Cay.` },
                  { n: "02", t: "We deliver", d: "Your rental is delivered to the airport or straight to your door, ready to roll." },
                  { n: "03", t: "Explore freely", d: "Beach runs, sightseeing and spontaneous island escapes — the island is yours." },
                  { n: "04", t: "We pick it up", d: "When you're done, we collect the car. Just pack your shades and go." },
                ].map((s) => (
                  <li key={s.n} className="flex gap-5">
                    <span className="font-display text-2xl font-medium text-ocean-600 italic">{s.n}</span>
                    <div>
                      <h3 className="font-display text-lg font-semibold tracking-tight text-ink-900">{s.t}</h3>
                      <p className="mt-1 text-[0.93rem] leading-relaxed text-ink-700/80">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <BookButton label="Ask About Car Rentals" />
                <CallButton tone="sand" />
              </div>
              <PhoneCtaNote className="mt-5" />
            </Reveal>
          </div>
          <Reveal delay={140} className="relative">
            <SafeImg
              src={CAR_RENTALS[1].image}
              alt="Nissan X-Trail rental SUV available in Long Island, Bahamas"
              loading="lazy"
              frameClassName="aspect-[4/3.4] rounded-[2rem]"
              className="rounded-[2rem]"
            />
            <div className="absolute right-5 bottom-5 max-w-[16rem] rounded-2xl bg-white/95 p-5 shadow-lift backdrop-blur">
              <p className="text-[0.68rem] font-bold tracking-[0.2em] uppercase text-ocean-600">Good to know</p>
              <p className="mt-2 text-sm leading-relaxed font-semibold text-ink-900">
                $100 refundable security deposit · valid driver's license · 2-day minimum rental
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
