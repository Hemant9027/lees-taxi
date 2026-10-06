import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Palmtree, Star, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, SITE } from "../data/site";

/* Inline brand marks (lucide no longer ships brand icons) */
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 21v-7.2h2.42l.36-2.8H13.5V9.2c0-.81.23-1.36 1.39-1.36h1.49V5.35c-.26-.03-1.14-.11-2.17-.11-2.15 0-3.62 1.31-3.62 3.72V11H8.16v2.8h2.43V21h2.91Z" />
    </svg>
  );
}
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.6 4h2.72l-5.95 6.8L21.5 20h-5.48l-4.29-5.61L6.82 20H4.09l6.36-7.27L4 4h5.62l3.88 5.13L17.6 4Zm-.96 14.36h1.51L8.85 5.56H7.23l9.41 12.8Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-ink-950 text-sand-200">
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pt-16 pb-32 sm:px-8 sm:pt-20 lg:pb-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sand-100 text-ink-900">
                <Palmtree className="h-5 w-5" aria-hidden />
              </span>
              <div className="leading-none">
                <p className="font-display text-lg font-semibold tracking-tight text-sand-50">
                  Lee's <span className="italic font-normal">Taxi Services</span>
                </p>
                <p className="mt-1 text-[0.6rem] font-bold tracking-[0.28em] uppercase text-ocean-400">
                  #14 · Long Island, Bahamas
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-sand-200/70">
              Reliable taxi service, airport transfers, guided island tours and car rentals across Long Island,
              The Bahamas — locally owned by {SITE.owner} since {SITE.founded}.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[
                { href: SITE.social.facebook, label: "Facebook", Icon: FacebookIcon },
                { href: SITE.social.instagram, label: "Instagram", Icon: InstagramIcon },
                { href: SITE.social.twitter, label: "X (Twitter)", Icon: XIcon },
                { href: SITE.social.tripadvisor, label: "Tripadvisor reviews", Icon: Star },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-sand-200/80 transition-all hover:border-ocean-400 hover:bg-ocean-600 hover:text-white"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer — explore">
            <h3 className="eyebrow text-ocean-400">Explore</h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="link-line text-sand-200/75 transition-colors hover:text-sand-50">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* More */}
          <nav aria-label="Footer — more">
            <h3 className="eyebrow text-ocean-400">More</h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <Link to="/airbnb" className="link-line text-sand-200/75 transition-colors hover:text-sand-50">
                  Airbnb & Vacation Rentals
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="link-line text-sand-200/75 transition-colors hover:text-sand-50">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href={SITE.tripadvisor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sand-200/75 transition-colors hover:text-sand-50"
                >
                  <span className="link-line">Tripadvisor Reviews</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="eyebrow text-ocean-400">Contact</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a href={SITE.phoneHref} className="group flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-ocean-400" aria-hidden />
                  <span>
                    <span className="block text-[0.65rem] font-bold tracking-[0.2em] uppercase text-sand-200/50">Drop a line</span>
                    <span className="font-semibold text-sand-50 transition-colors group-hover:text-ocean-300">
                      {SITE.phoneDisplay}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="group flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-ocean-400" aria-hidden />
                  <span>
                    <span className="block text-[0.65rem] font-bold tracking-[0.2em] uppercase text-sand-200/50">Email</span>
                    <span className="font-semibold text-sand-50 transition-colors group-hover:text-ocean-300">{SITE.email}</span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ocean-400" aria-hidden />
                <span>
                  <span className="block text-[0.65rem] font-bold tracking-[0.2em] uppercase text-sand-200/50">Address</span>
                  <span className="font-semibold text-sand-50">{SITE.location}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 text-xs text-sand-200/45 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>
            Taxi · Tours · Airport Transfers · Car Rentals — {SITE.location}
          </p>
        </div>
      </div>
    </footer>
  );
}

/* Sticky thumb-friendly action bar on mobile */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-900/10 bg-sand-50/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3 px-4 py-3">
        <a
          href={SITE.phoneHref}
          className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-ocean-600 text-[15px] font-bold text-white shadow-soft active:scale-[0.98]"
        >
          <Phone className="h-4 w-4" aria-hidden />
          Call Now
        </a>
        <Link
          to="/contact"
          className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink-900 text-[15px] font-bold text-sand-50 shadow-soft active:scale-[0.98]"
        >
          Book / Inquire
        </Link>
      </div>
    </div>
  );
}
