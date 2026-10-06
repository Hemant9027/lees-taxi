import { ArrowRight, HeartHandshake, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { GALLERY, IMAGES, SITE } from "../data/site";
import { BookButton, CallButton, Reveal, SafeImg, usePageMeta } from "../components/ui";
import { FinalCta, TestimonialsSection, TrustMarquee } from "../components/sections";

export default function About() {
  usePageMeta(
    "About Leanthia Knowles — Lee's Taxi Services #14, Long Island, Bahamas",
    "Lee's Taxi, owned by Leanthia Knowles, originated in December 2021 on Long Island, The Bahamas — professional, reliable taxi and tour services with true local knowledge."
  );

  return (
    <>
      {/* Editorial opening */}
      <section className="bg-sand-50 pt-32 pb-16 sm:pt-40 sm:pb-24" aria-labelledby="about-heading">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-ocean-600">
                <span className="inline-block h-px w-8 bg-ocean-600" aria-hidden />
                About Lee's Taxi Services #14
              </p>
              <h1 id="about-heading" className="font-display mt-4 text-4xl leading-[1.05] font-medium text-balance text-ink-900 sm:text-6xl">
                Local knowledge. <span className="italic font-normal text-ocean-700">Personal service.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-700/85 sm:text-lg">
                Lee's Taxi, owned by <strong className="font-bold text-ink-900">{SITE.owner}</strong>, originated in{" "}
                {SITE.founded} on Long Island, The Bahamas. Since then it has become the top choice for taxi and
                tour guide services on the island.
              </p>
              <blockquote className="font-display mt-8 border-l-2 border-ocean-600 pl-6 text-xl leading-snug font-medium text-balance text-ink-900 italic sm:text-2xl">
                “It is my sole intent to make anyone who enters my taxi happy, comfortable and always eager to
                return to Long Island.”
                <cite className="mt-4 block text-sm font-sans not-italic font-bold tracking-wide text-ocean-700">
                  — {SITE.owner}, owner
                </cite>
              </blockquote>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CallButton />
                <BookButton label="Plan a Ride with Lee" />
              </div>
            </Reveal>
          </div>
          <Reveal delay={150} className="relative">
            <SafeImg
              src={IMAGES.aboutMain}
              alt="Lee's Bahamas taxi service — ready for island transportation"
              loading="eager"
              fetchPriority="high"
              frameClassName="aspect-[4/4.6] rounded-[2rem]"
              className="rounded-[2rem]"
            />
            <span className="absolute top-5 left-5 rounded-full bg-ink-950/75 px-4 py-2 text-[0.65rem] font-bold tracking-[0.2em] uppercase text-sand-100 backdrop-blur">
              {SITE.location}
            </span>
            <span className="absolute right-5 bottom-5 rounded-2xl bg-white/95 px-5 py-4 shadow-lift backdrop-blur">
              <span className="font-display block text-3xl font-semibold text-ocean-700">2021</span>
              <span className="block text-[0.65rem] font-bold tracking-[0.18em] uppercase text-ink-700/60">
                Serving since December
              </span>
            </span>
          </Reveal>
        </div>
      </section>
      <TrustMarquee />

      {/* Story */}
      <section className="bg-white py-16 sm:py-24" aria-labelledby="story-heading">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal className="relative order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <SafeImg
                src={IMAGES.aboutSecondary}
                alt="Touring Long Island with Lee's Taxi Services"
                loading="lazy"
                frameClassName="aspect-[3/4] rounded-3xl"
                className="rounded-3xl"
              />
              <div className="flex flex-col gap-4 sm:gap-5">
                <SafeImg
                  src={GALLERY[2].src}
                  alt={GALLERY[2].alt}
                  loading="lazy"
                  frameClassName="aspect-square rounded-3xl"
                  className="rounded-3xl"
                />
                <SafeImg
                  src={GALLERY[5].src}
                  alt={GALLERY[5].alt}
                  loading="lazy"
                  frameClassName="aspect-square rounded-3xl"
                  className="rounded-3xl"
                />
              </div>
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-ocean-600">
                <span className="inline-block h-px w-8 bg-ocean-600" aria-hidden />
                The story began in 2021
              </p>
              <h2 id="story-heading" className="font-display mt-4 text-3xl leading-[1.1] font-medium text-balance text-ink-900 sm:text-5xl">
                People don't take trips — <span className="italic font-normal text-ocean-700">trips take people</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ink-700/85 sm:text-lg">
                Lee's main goal is to provide accurate knowledge while offering professional and reliable services
                to her guests — especially the tourists visiting her hometown.
              </p>
              <ul className="mt-8 space-y-5">
                {[
                  {
                    icon: MapPin,
                    t: "Hometown expertise",
                    d: "Long Island is home. Every shortcut, secret beach and local story comes with the ride.",
                  },
                  {
                    icon: ShieldCheck,
                    t: "Safety & punctuality first",
                    d: "Consistent, dependable rides with a focus on safety and being on time — every trip.",
                  },
                  {
                    icon: Sparkles,
                    t: "Knowledgeable & engaging",
                    d: "As the island's top choice in taxi services, Lee takes pride in making every journey interesting.",
                  },
                  {
                    icon: HeartHandshake,
                    t: "Guests who return",
                    d: "Many riders leave with a new friend on the island — and come back on their next trip.",
                  },
                ].map((v) => (
                  <li key={v.t} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ocean-600/10 text-ocean-700">
                      <v.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold tracking-tight text-ink-900">{v.t}</h3>
                      <p className="mt-1 text-[0.93rem] leading-relaxed text-ink-700/80">{v.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                to="/gallery"
                className="group mt-9 inline-flex items-center gap-2 text-sm font-bold text-ocean-700 hover:text-ocean-800"
              >
                <span className="link-line">See island life in the gallery</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <FinalCta />
    </>
  );
}
