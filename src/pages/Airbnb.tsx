import { BedDouble } from "lucide-react";
import { AIRBNB_IMAGES, IMAGES } from "../data/site";
import { BookButton, CallButton, PageHero, Reveal, SafeImg, SectionHeader, usePageMeta } from "../components/ui";
import { FinalCta, PhoneCtaNote } from "../components/sections";

export default function Airbnb() {
  usePageMeta(
    "Airbnb & Vacation Rentals in Long Island, Bahamas | Lee's Taxi Services #14",
    "Lee's Taxi Services #14 can help you find and book the best Airbnb and vacation rental units in Long Island for care-free travel."
  );

  return (
    <>
      <PageHero
        eyebrow="Places to stay"
        title={
          <>
            Airbnb & <span className="italic font-normal text-ocean-300">vacation rentals</span>
          </>
        }
        lead="Looking for the perfect place to stay? We can help you find and book the best Airbnb and vacation rental units in Long Island for care-free travel."
        image={IMAGES.hero}
        imageAlt="Beachfront accommodation territory — Cape Santa Maria, Long Island, Bahamas"
      />

      <section className="bg-sand-50 py-16 sm:py-24" aria-labelledby="airbnb-heading">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
            <div className="lg:sticky lg:top-28">
              <SectionHeader
                eyebrow={
                  <>
                    <BedDouble className="mr-2 inline h-4 w-4" aria-hidden /> Booking places to stay
                  </>
                }
                title={
                  <span id="airbnb-heading">
                    Stay somewhere <span className="italic font-normal text-ocean-700">you'll love</span>
                  </span>
                }
                lead="Airbnb rental accommodations in specific locales across Long Island — matched to your plans, then paired with transportation from airport to doorstep."
              />
              <Reveal delay={140}>
                <ul className="mt-8 space-y-3.5 text-[0.95rem] font-semibold text-ink-800">
                  {[
                    "Help finding and booking the right rental unit",
                    "Airport pick-up timed to your arrival",
                    "Store stops on the way to settle in",
                    "Island tours and rides throughout your stay",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-ocean-600" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <BookButton label="Ask About Stays" />
                  <CallButton tone="sand" />
                </div>
                <PhoneCtaNote className="mt-5" />
              </Reveal>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {AIRBNB_IMAGES.map((img, i) => (
                <Reveal key={img.src} delay={(i % 2) * 80} className={i % 3 === 0 ? "sm:row-span-2" : ""}>
                  <SafeImg
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    frameClassName={`rounded-2xl ${i % 3 === 0 ? "aspect-[3/3.2] sm:h-full sm:aspect-auto" : "aspect-[4/3.3]"}`}
                    className="rounded-2xl transition-transform duration-700 ease-out hover:scale-[1.04]"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
