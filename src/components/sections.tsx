import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Quote,
  Phone,
  Palmtree,
} from "lucide-react";
import { cn } from "../utils/cn";
import { SITE, TESTIMONIALS, type Destination, type Service } from "../data/site";
import { BookButton, CallButton, Reveal, SafeImg, SectionHeader, ServiceIcon, Stars } from "./ui";

/* ——— Trust marquee strip ——— */
const TRUST_ITEMS = [
  "Long Island, The Bahamas",
  "Taxi & Tour Services",
  "Airport Transfers",
  "Guided Island Tours",
  "Car Rentals",
  "Locally Owned · Since 2021",
];

export function TrustMarquee({ tone = "sand" }: { tone?: "sand" | "ink" }) {
  const row = [...TRUST_ITEMS, ...TRUST_ITEMS];
  return (
    <div
      className={cn(
        "relative overflow-hidden border-y py-4",
        tone === "sand" ? "border-ink-900/8 bg-sand-100" : "border-white/10 bg-ink-950"
      )}
      aria-label="What we offer"
    >
      <div className="marquee-track items-center">
        {row.map((item, i) => (
          <span
            key={i}
            className={cn(
              "flex items-center gap-3 pr-3 text-[0.78rem] font-bold tracking-[0.18em] uppercase whitespace-nowrap",
              tone === "sand" ? "text-ink-700" : "text-sand-200/80"
            )}
          >
            {item}
            <Palmtree className={cn("h-3.5 w-3.5", tone === "sand" ? "text-ocean-600" : "text-ocean-400")} aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ——— Service card ——— */
export function ServiceCard({ service, delay = 0 }: { service: Service; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <Link
        to={service.id === "car-rentals" ? "/car-rentals" : "/services#" + service.id}
        className="card-hover group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-900/8 bg-white shadow-soft"
      >
        <div className="relative">
          <SafeImg
            src={service.image}
            alt={service.imageAlt}
            loading="lazy"
            frameClassName="aspect-[4/3]"
            className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
          <span className="absolute top-4 left-4 flex h-11 w-11 items-center justify-center rounded-full bg-ink-950/85 text-sand-100 backdrop-blur">
            <ServiceIcon name={service.icon} className="h-5 w-5" />
          </span>
          <span className="font-display absolute right-5 bottom-3 text-5xl font-light text-white/85 [text-shadow:0_2px_16px_rgb(12_26_23/0.5)]">
            {service.index}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-xl font-semibold tracking-tight text-ink-900">{service.title}</h3>
          <p className="mt-2.5 flex-1 text-[0.93rem] leading-relaxed text-ink-700/80">{service.description}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-ocean-700">
            <span className="link-line">Explore Service</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

/* ——— Destination card ——— */
export function DestinationCard({ d, delay = 0, tall = false }: { d: Destination; delay?: number; tall?: boolean }) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        to="/contact"
        className="card-hover group relative flex h-full flex-col overflow-hidden rounded-3xl bg-ink-900 shadow-soft"
        aria-label={`${d.name} — arrange a visit`}
      >
        <SafeImg
          src={d.image}
          alt={d.imageAlt}
          loading="lazy"
          frameClassName={cn("w-full", tall ? "aspect-[3/4] sm:aspect-auto sm:absolute sm:inset-0" : "aspect-[4/3]")}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className={cn(
          "flex flex-1 flex-col justify-end bg-gradient-to-t from-ink-950/90 via-ink-950/25 to-transparent p-5",
          tall ? "relative sm:min-h-[22rem] sm:bg-gradient-to-t sm:from-ink-950/85 sm:via-transparent" : "absolute inset-0"
        )}>
          {d.tag && (
            <span className="mb-2 w-fit rounded-full border border-white/25 bg-ink-950/40 px-3 py-1 text-[0.62rem] font-bold tracking-[0.18em] uppercase text-sand-100 backdrop-blur-sm">
              {d.tag}
            </span>
          )}
          <h3 className="font-display text-xl leading-tight font-semibold text-balance text-white">{d.name}</h3>
          {d.blurb && !tall && (
            <p className="mt-1.5 line-clamp-2 max-w-md text-[0.82rem] leading-relaxed text-sand-200/80 opacity-0 transition-all duration-500 group-hover:opacity-100">
              {d.blurb}
            </p>
          )}
          <span className="mt-3 inline-flex items-center gap-1.5 text-[0.78rem] font-bold tracking-[0.14em] uppercase text-ocean-300">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            Long Island
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

/* ——— Testimonials carousel ——— */
export function TestimonialsSection({ tone = "sand" }: { tone?: "sand" | "white" }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + count) % count), [count]);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 7000);
    return () => clearInterval(t);
  }, [paused, count]);

  const current = TESTIMONIALS[index];
  const touch = useRef<{ x: number } | null>(null);

  return (
    <section
      className={cn("py-20 sm:py-28", tone === "sand" ? "bg-sand-100" : "bg-white")}
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Real Tripadvisor reviews"
            title={<>Travelers <span className="italic font-normal text-ocean-700">love</span> riding with Lee</>}
            lead="Every review below is taken verbatim from Lee's Taxi Services #14 on Tripadvisor — unedited, unfiltered, all five stars."
          />
          <Reveal delay={120}>
            <div className="flex items-center gap-3">
              <button
                onClick={() => go(-1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-ink-900/12 text-ink-900 transition-all hover:bg-ink-900 hover:text-sand-50"
                aria-label="Previous review"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => go(1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-ink-900/12 text-ink-900 transition-all hover:bg-ink-900 hover:text-sand-50"
                aria-label="Next review"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100} className="mt-12">
          <figure
            className="relative overflow-hidden rounded-[2rem] border border-ink-900/8 bg-white p-7 shadow-soft sm:p-12"
            onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX })}
            onTouchEnd={(e) => {
              if (!touch.current) return;
              const dx = e.changedTouches[0].clientX - touch.current.x;
              if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
              touch.current = null;
            }}
          >
            <Quote className="absolute -top-4 right-8 h-28 w-28 text-ocean-600/8" aria-hidden />
            <div key={index} className="animate-[fadeSlide_0.7s_var(--ease-out-expo)]">
              <style>{`@keyframes fadeSlide { from { opacity: 0; transform: translateY(14px);} to { opacity:1; transform:none; } }`}</style>
              <Stars />
              <blockquote className="mt-5">
                <p className="font-display text-xl leading-snug font-medium text-balance text-ink-900 sm:text-2xl">
                  “{current.title}”
                </p>
                <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-ink-700/90">{current.text}</p>
              </blockquote>
              <figcaption className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ocean-600 font-display text-lg font-semibold text-white" aria-hidden>
                  {current.name.charAt(0).toUpperCase()}
                </span>
                <span>
                  <span className="block text-sm font-bold text-ink-900">{current.name}</span>
                  <span className="block text-xs text-ink-700/60">Verified review · Posted on Tripadvisor</span>
                </span>
              </figcaption>
            </div>
          </figure>
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-1.5" role="tablist" aria-label="Choose review">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === index}
                aria-label={`Review by ${t.name}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-400",
                  i === index ? "w-8 bg-ocean-600" : "w-3 bg-ink-900/15 hover:bg-ink-900/30"
                )}
              />
            ))}
          </div>
          <a
            href={SITE.tripadvisor}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-bold text-ocean-700 hover:text-ocean-800"
          >
            <span className="link-line">Read all reviews on Tripadvisor</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ——— Final conversion band ——— */
export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 py-20 sm:py-28" aria-labelledby="final-cta-heading">
      <div className="absolute inset-0">
        <SafeImg
          src="https://www.leestaxiservices14.com/wp-content/uploads/2025/01/IMG-20250128-WA0010.jpg"
          alt="Newton's Cay Bridge stretching over turquoise water, Long Island, Bahamas"
          loading="lazy"
          frameClassName="h-full w-full"
          className="opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/55 to-ink-950/90" />
      </div>
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow justify-center flex items-center gap-3 text-ocean-300">
            <span className="inline-block h-px w-8 bg-ocean-300" aria-hidden />
            Let's plan your ride
            <span className="inline-block h-px w-8 bg-ocean-300" aria-hidden />
          </p>
          <h2 id="final-cta-heading" className="font-display mt-5 text-4xl leading-[1.06] font-medium text-balance text-sand-50 sm:text-6xl">
            Planning your trip to <span className="italic font-normal text-ocean-300">Long Island?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-sand-200/85 sm:text-lg">
            Arrange your transportation, explore the island and make your Long Island experience easier from the
            moment you arrive.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <CallButton tone="solid" className="w-full sm:w-auto" />
            <BookButton label="Request a Ride" tone="sand" className="w-full sm:w-auto" />
          </div>
          <p className="mt-6 text-xs tracking-wide text-sand-200/60">
            Prefer to write? Email <a href={`mailto:${SITE.email}`} className="font-semibold text-sand-100 underline underline-offset-4">{SITE.email}</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ——— Airport transfer panel (shared) ——— */
export function AirportPanel() {
  const steps = [
    { icon: "plane", title: "Airport", text: "Land at Stella Maris or Deadman's Cay" },
    { icon: "car", title: "Your ride", text: "A pre-arranged taxi, ready when you are" },
    { icon: "pin", title: "Destination", text: "Resort, rental or anywhere on the island" },
  ];
  return (
    <section className="relative isolate overflow-hidden bg-ink-900 py-20 sm:py-28" aria-labelledby="airport-heading">
      <div className="grain absolute inset-0" />
      <div className="absolute -top-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-ocean-600/15 blur-3xl" aria-hidden />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr]">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-ocean-300">
            <span className="inline-block h-px w-8 bg-ocean-300" aria-hidden />
            Airport transfers
          </p>
          <h2 id="airport-heading" className="font-display mt-4 text-4xl leading-[1.06] font-medium text-balance text-sand-50 sm:text-5xl">
            Arriving on <span className="italic font-normal text-ocean-300">Long Island?</span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-sand-200/85 sm:text-lg">
            Taxis are not regularly stationed at Long Island's airports or docks — so arranging your ride in
            advance is the smoothest way to start your trip. Call, message or email before you travel, and your
            transportation is secured.
          </p>
          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
            <BookButton label="Arrange Airport Pickup" tone="sand" />
            <CallButton tone="outline" className="text-sand-100" />
          </div>
        </Reveal>

        <Reveal delay={140}>
          <ol className="relative space-y-4" aria-label="How airport pickup works">
            <span className="absolute top-8 bottom-8 left-[2.35rem] w-px bg-gradient-to-b from-ocean-400/60 via-ocean-400/25 to-transparent" aria-hidden />
            {steps.map((s, i) => (
              <li key={s.title} className="relative flex items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-colors hover:bg-white/[0.07]">
                <span className="relative z-10 flex h-[4.7rem] w-[4.7rem] shrink-0 flex-col items-center justify-center rounded-2xl bg-ocean-600/20 text-ocean-300">
                  <AirportStepIcon name={s.icon} />
                </span>
                <span>
                  <span className="flex items-baseline gap-2.5">
                    <span className="font-display text-sm italic text-ocean-300">0{i + 1}</span>
                    <span className="font-display text-xl font-semibold text-sand-50">{s.title}</span>
                  </span>
                  <span className="mt-1 block text-sm text-sand-200/75">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

function AirportStepIcon({ name }: { name: string }) {
  if (name === "plane")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-8 w-8" aria-hidden>
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2Z" strokeLinejoin="round" />
      </svg>
    );
  if (name === "car")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-8 w-8" aria-hidden>
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8c-.1.2-.1.4-.1.6v4.7c0 .6.4 1 1 1h2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7" cy="17" r="2" />
        <path d="M9 17h6" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-8 w-8" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/* Phone CTA convenience */
export function PhoneCtaNote({ className }: { className?: string }) {
  return (
    <p className={cn("flex items-center gap-2 text-sm text-ink-700/70", className)}>
      <Phone className="h-4 w-4 text-ocean-600" aria-hidden />
      Prefer to speak directly?{" "}
      <a href={SITE.phoneHref} className="font-bold text-ocean-700 underline underline-offset-4 hover:text-ocean-800">
        Call {SITE.phoneDisplay}
      </a>
    </p>
  );
}
