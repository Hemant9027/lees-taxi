import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, MapPin, Phone, ChevronDown, ShieldCheck, Clock, Sparkles, Compass } from "lucide-react";
import { DESTINATIONS, GALLERY, IMAGES, SERVICES, SITE } from "../data/site";
import { BookButton, CallButton, GhostLink, Reveal, SafeImg, SectionHeader, usePageMeta } from "../components/ui";
import {
  AirportPanel,
  DestinationCard,
  FinalCta,
  ServiceCard,
  TestimonialsSection,
  TrustMarquee,
} from "../components/sections";

/* ——— Hero ——— */
function Hero() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setOffset(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink-950" aria-label="Welcome">
      {/* Real photo: Cape Santa Maria Beach, from the business website */}
      <div className="absolute inset-0" style={{ transform: `translateY(${offset * 0.22}px)` }}>
        <SafeImg
          src={IMAGES.hero}
          alt="Cape Santa Maria Beach — powder-white sand and calm turquoise water on Long Island, The Bahamas"
          frameClassName="h-[112%] w-full"
          className="kenburns"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-ink-950/20 to-ink-950/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/45 via-transparent to-transparent" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pt-32 pb-14 sm:px-8 sm:pb-20">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-ink-950/35 px-4 py-2 text-[0.7rem] font-bold tracking-[0.22em] uppercase text-sand-100 backdrop-blur-md">
            <MapPin className="h-3.5 w-3.5 text-ocean-300" aria-hidden />
            Long Island · The Bahamas
          </p>
        </Reveal>

        <Reveal delay={110}>
          <h1 className="font-display mt-6 max-w-4xl text-[2.65rem] leading-[1.02] font-medium text-balance text-white sm:text-6xl lg:text-[4.6rem]">
            Explore Long Island with a <span className="italic font-normal text-ocean-300">local</span> you can trust
          </h1>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-sand-100/90 sm:text-lg">
            Reliable taxi service, airport transfers, guided tours and island transportation across Long Island,
            The Bahamas — from one end of the island to the next.
          </p>
        </Reveal>

        <Reveal delay={330}>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BookButton tone="ocean" className="w-full sm:w-auto" label="Book Your Ride" />
            <Link
              to="/tours"
              className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-white/35 px-6 text-[15px] font-bold tracking-tight text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/12"
            >
              Explore Island Tours
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </Link>
            <a
              href={SITE.phoneHref}
              className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-2 text-[15px] font-bold tracking-tight text-sand-100 transition-colors hover:text-white sm:px-4"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/12 backdrop-blur transition-colors group-hover:bg-white/25">
                <Phone className="h-4 w-4" aria-hidden />
              </span>
              {SITE.phoneDisplay}
            </a>
          </div>
        </Reveal>

        <Reveal delay={430}>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/15 pt-6 text-[0.8rem] font-semibold text-sand-100/85">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-ocean-300" aria-hidden /> Locally owned · since {SITE.since}</span>
            <span className="inline-flex items-center gap-2"><Compass className="h-4 w-4 text-ocean-300" aria-hidden /> Guided island tours</span>
            <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-ocean-300" aria-hidden /> Pre-arranged airport pickups</span>
          </div>
        </Reveal>
      </div>

      <button
        type="button"
        onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-[0.62rem] font-bold tracking-[0.3em] uppercase text-white/60 transition-colors hover:text-white md:flex"
        aria-label="Scroll to services"
      >
        Scroll
        <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden />
      </button>
    </section>
  );
}

/* ——— Services ——— */
function Services() {
  return (
    <section id="services" className="bg-sand-50 py-20 sm:py-28" aria-labelledby="services-heading">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Our services"
            title={<>How can we <span className="italic font-normal text-ocean-700">help you</span> today?</>}
            lead="Taxi and tour services across Long Island — reliable, affordable transportation with a professional local driver."
          />
          <Reveal delay={140}>
            <GhostLink to="/services">All services</GhostLink>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} delay={(i % 3) * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ——— Tours preview ——— */
function ToursPreview() {
  const featured = DESTINATIONS.slice(0, 6);
  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="tours-heading">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Long Island tours"
            title={<>From one end of the island <span className="italic font-normal text-ocean-700">to the next</span></>}
            lead="Blue holes, caves, monuments, marinas and beaches — see the real Long Island with a guide who knows every turn."
          />
          <Reveal delay={140}>
            <GhostLink to="/tours">All destinations</GhostLink>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {featured.map((d, i) => (
            <DestinationCard key={d.id} d={d} delay={(i % 3) * 90} />
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link
            to="/tours"
            className="group inline-flex min-h-12 items-center gap-2.5 rounded-full border border-ink-900/15 px-7 text-[15px] font-bold text-ink-900 transition-all hover:border-ink-900 hover:bg-ink-900 hover:text-sand-50"
          >
            Browse all {DESTINATIONS.length} tour stops
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ——— Featured experience: Dean's Blue Hole ——— */
function FeaturedExperience() {
  return (
    <section className="overflow-hidden bg-sand-100" aria-labelledby="featured-heading">
      <div className="mx-auto grid w-full max-w-7xl items-stretch gap-0 px-0 sm:px-8 lg:grid-cols-2 lg:py-24">
        <Reveal className="relative min-h-[22rem] lg:min-h-[36rem]">
          <SafeImg
            src={IMAGES.deansTall}
            alt="Dean's Blue Hole — the world-famous blue hole on Long Island, The Bahamas"
            loading="lazy"
            frameClassName="absolute inset-0 lg:rounded-[2rem]"
            className="lg:rounded-[2rem]"
          />
          <span className="absolute bottom-5 left-5 rounded-full bg-ink-950/70 px-4 py-2 text-[0.65rem] font-bold tracking-[0.2em] uppercase text-sand-100 backdrop-blur">
            Featured experience
          </span>
        </Reveal>
        <div className="flex flex-col justify-center px-5 py-14 sm:px-10 lg:py-24 lg:pl-16 lg:pr-0">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-ocean-600">
              <span className="inline-block h-px w-8 bg-ocean-600" aria-hidden />
              Dean's Blue Hole
            </p>
            <h2 id="featured-heading" className="font-display mt-4 text-4xl leading-[1.06] font-medium text-balance text-ink-900 sm:text-5xl">
              One of the deepest blue holes <span className="italic font-normal text-ocean-700">on Earth</span>
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-700/85 sm:text-lg">
              A vertical drop into sapphire — Dean's Blue Hole is Long Island's most famous natural wonder and a
              must-see stop on any island tour. Swim, snorkel, or simply stand at the edge and take it in.
            </p>
            <ul className="mt-7 space-y-3 text-[0.95rem] font-semibold text-ink-800">
              <li className="flex items-center gap-3"><Sparkles className="h-4.5 w-4.5 text-ocean-600" aria-hidden /> A signature stop on our guided island tours</li>
              <li className="flex items-center gap-3"><MapPin className="h-4.5 w-4.5 text-ocean-600" aria-hidden /> Easy to reach when your ride is arranged</li>
            </ul>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <BookButton label="Plan This Tour" />
              <GhostLink to="/tours" className="min-h-12 items-center flex">See all tour stops</GhostLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ——— Why choose Lee ——— */
const WHY = [
  {
    icon: Compass,
    title: "Local Knowledge",
    text: "Discover Long Island with someone who knows the island — secret beaches, landmarks and stories included.",
  },
  {
    icon: Clock,
    title: "Reliable Transportation",
    text: "Safe, punctual and dependable rides, planned around your arrival and your itinerary.",
  },
  {
    icon: Sparkles,
    title: "More Than a Ride",
    text: "Combine transportation with sightseeing, store stops and local experiences along the way.",
  },
  {
    icon: ShieldCheck,
    title: "Professional & Affordable",
    text: "Reliable, affordable transportation with a professional driver — the top choice on the island.",
  },
];

function WhyChoose() {
  return (
    <section className="bg-sand-50 py-20 sm:py-28" aria-labelledby="why-heading">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeader
          align="center"
          eyebrow="Why choose Lee's"
          title={<>The island's <span className="italic font-normal text-ocean-700">top choice</span> for a reason</>}
          lead="Being the top choice in taxi services on the island, Lee takes pride in being knowledgeable and engaging."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 90}>
              <div className="card-hover group h-full rounded-3xl border border-ink-900/8 bg-white p-7 shadow-soft">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ocean-600/10 text-ocean-700 transition-colors duration-300 group-hover:bg-ocean-600 group-hover:text-white">
                  <w.icon className="h-5.5 w-5.5" aria-hidden />
                </span>
                <h3 className="font-display mt-5 text-xl font-semibold tracking-tight text-ink-900">{w.title}</h3>
                <p className="mt-2.5 text-[0.93rem] leading-relaxed text-ink-700/80">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ——— About teaser ——— */
function AboutTeaser() {
  return (
    <section className="overflow-hidden bg-white py-20 sm:py-28" aria-labelledby="about-teaser-heading">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative">
            <SafeImg
              src={IMAGES.aboutMain}
              alt="Lee's Bahamas taxi service vehicle, Long Island"
              loading="lazy"
              frameClassName="aspect-[4/5] rounded-[2rem] sm:aspect-[5/5.4]"
              className="rounded-[2rem]"
            />
            <SafeImg
              src={IMAGES.aboutSecondary}
              alt="On tour with Lee's Taxi Services, Long Island, Bahamas"
              loading="lazy"
              frameClassName="absolute -right-3 -bottom-8 hidden w-[46%] rounded-3xl border-[6px] border-white shadow-lift sm:block"
              className="rounded-3xl"
            />
            <span className="absolute top-5 left-5 rounded-full bg-ink-950/75 px-4 py-2 text-[0.65rem] font-bold tracking-[0.2em] uppercase text-sand-100 backdrop-blur">
              Since December 2021
            </span>
          </div>
        </Reveal>
        <div className="order-1 lg:order-2">
          <SectionHeader
            eyebrow="Meet your driver"
            title={<>Local knowledge. <span className="italic font-normal text-ocean-700">Personal service.</span></>}
          />
          <Reveal delay={120}>
            <p className="mt-6 text-base leading-relaxed text-ink-700/85 sm:text-lg">
              Lee's Taxi, owned by <strong className="font-bold text-ink-900">{SITE.owner}</strong>, originated in{" "}
              {SITE.founded} on Long Island, The Bahamas.
            </p>
            <blockquote className="font-display mt-6 border-l-2 border-ocean-600 pl-6 text-xl leading-snug font-medium text-balance text-ink-900 italic sm:text-2xl">
              “It is my sole intent to make anyone who enters my taxi happy, comfortable and always eager to
              return to Long Island.”
            </blockquote>
            <p className="mt-6 text-base leading-relaxed text-ink-700/85">
              The goal is simple: accurate local knowledge and professional, reliable service for every guest —
              especially the tourists visiting her hometown.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <GhostLink to="/about">Read Lee's story</GhostLink>
              <CallButton tone="sand" label={SITE.phoneDisplay} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ——— Gallery strip ——— */
function GalleryStrip() {
  return (
    <section className="bg-sand-100 py-20 sm:py-28" aria-labelledby="gallery-strip-heading">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Island gallery"
            title={<>Moments from <span className="italic font-normal text-ocean-700">the island</span></>}
            lead="Real photographs from the Lee's Taxi Services archive — tours, beaches and everyday island beauty."
          />
          <Reveal delay={140}>
            <GhostLink to="/gallery">View full gallery</GhostLink>
          </Reveal>
        </div>
      </div>
      <Reveal delay={100}>
        <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:gap-5 sm:px-8">
          {GALLERY.slice(0, 8).map((g) => (
            <Link
              key={g.src}
              to="/gallery"
              className="group w-[70vw] shrink-0 snap-start overflow-hidden rounded-3xl sm:w-[24rem]"
              aria-label={g.alt}
            >
              <SafeImg
                src={g.src}
                alt={g.alt}
                loading="lazy"
                frameClassName="aspect-[4/3] w-full"
                className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
            </Link>
          ))}
          <Link
            to="/gallery"
            className="group flex w-[60vw] shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-3xl bg-ink-900 text-sand-50 transition-colors hover:bg-ink-800 sm:w-[18rem]"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 transition-transform duration-300 group-hover:scale-110">
              <ArrowUpRight className="h-6 w-6" aria-hidden />
            </span>
            <span className="text-sm font-bold tracking-wide">See the full gallery</span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

export default function Home() {
  usePageMeta(
    "Lee's Taxi Services #14 — Long Island, Bahamas Taxi, Tours & Car Rentals",
    "Reliable taxi service, airport transfers, guided island tours and car rentals across Long Island, The Bahamas. Locally owned by Leanthia Knowles. Call +1 242-464-2495."
  );
  return (
    <>
      <Hero />
      <TrustMarquee />
      <Services />
      <AirportPanel />
      <ToursPreview />
      <FeaturedExperience />
      <WhyChoose />
      <AboutTeaser />
      <TestimonialsSection />
      <GalleryStrip />
      <FinalCta />
    </>
  );
}
