import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone, Palmtree } from "lucide-react";
import { cn } from "../utils/cn";
import { NAV_LINKS, SITE } from "../data/site";

function Logo({ onClick, tone = "dark" }: { onClick?: () => void; tone?: "dark" | "light" }) {
  return (
    <Link to="/" onClick={onClick} className="group flex items-center gap-2.5" aria-label="Lee's Taxi Services #14 — home">
      <span
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
          tone === "dark" ? "bg-ink-900 text-sand-100" : "bg-sand-100 text-ink-900"
        )}
      >
        <Palmtree className="h-5 w-5" aria-hidden />
      </span>
      <span className="leading-none">
        <span className={cn("font-display block text-[1.15rem] font-semibold tracking-tight", tone === "dark" ? "text-ink-900" : "text-sand-50")}>
          Lee's <span className="italic font-normal">Taxi Services</span>
        </span>
        <span className={cn("mt-1 block text-[0.6rem] font-bold tracking-[0.28em] uppercase", tone === "dark" ? "text-ocean-700" : "text-ocean-300")}>
          #14 · Long Island, Bahamas
        </span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const DARK_HERO_PATHS = new Set(["/", "/tours", "/car-rentals", "/destinations", "/airbnb"]);
  const onDarkHero = !scrolled && !open && DARK_HERO_PATHS.has(location.pathname);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-ink-900/8 bg-sand-50/90 shadow-[0_1px_24px_-12px_rgb(12_26_23/0.18)] backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-[4.5rem] w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <div className={cn("transition-opacity", open && "opacity-0")}>
            <Logo tone={onDarkHero ? "light" : "dark"} />
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-full px-3.5 py-2 text-[13.5px] font-semibold tracking-tight transition-colors",
                    onDarkHero
                      ? isActive
                        ? "bg-white/15 text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                      : isActive
                        ? "bg-ink-900/8 text-ink-900"
                        : "text-ink-700/80 hover:bg-ink-900/5 hover:text-ink-900"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={SITE.phoneHref}
              className={cn(
                "flex items-center gap-2 text-[13.5px] font-bold tracking-tight transition-colors",
                onDarkHero ? "text-white hover:text-sand-200" : "text-ink-900 hover:text-ocean-700"
              )}
            >
              <Phone className="h-4 w-4" aria-hidden />
              {SITE.phoneDisplay}
            </a>
            <Link
              to="/contact"
              className="inline-flex min-h-11 items-center rounded-full bg-ocean-600 px-5 text-[13.5px] font-bold tracking-tight text-white shadow-soft transition-all hover:bg-ocean-700 hover:shadow-lift"
            >
              Book a Ride
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden",
              open
                ? "bg-sand-100 text-ink-900"
                : onDarkHero
                  ? "bg-white/15 text-white backdrop-blur"
                  : "bg-ink-900/6 text-ink-900"
            )}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-ink-950 transition-all duration-500 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="grain absolute inset-0" />
        <div className="relative flex h-full flex-col overflow-y-auto px-6 pt-28 pb-10">
          <nav aria-label="Mobile">
            <ul className="space-y-1">
              {NAV_LINKS.map((l, i) => (
                <li
                  key={l.to}
                  style={{ transitionDelay: open ? `${80 + i * 40}ms` : "0ms" }}
                  className={cn(
                    "transition-all duration-500",
                    open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  )}
                >
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      cn(
                        "font-display flex items-baseline gap-4 border-b border-white/8 py-3.5 text-3xl font-medium tracking-tight transition-colors",
                        isActive ? "text-sand-50" : "text-sand-200/60 hover:text-sand-50"
                      )
                    }
                  >
                    <span className="text-xs font-bold tracking-[0.2em] text-ocean-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className={cn(
              "mt-auto space-y-3 pt-10 transition-all delay-300 duration-500",
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <a
              href={SITE.phoneHref}
              className="flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-ocean-600 text-base font-bold text-white"
            >
              <Phone className="h-5 w-5" aria-hidden />
              Call {SITE.phoneDisplay}
            </a>
            <Link
              to="/contact"
              className="flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-sand-100 text-base font-bold text-ink-900"
            >
              Book a Ride
            </Link>
            <p className="pt-2 text-center text-xs tracking-wide text-sand-200/50">
              {SITE.location} · Since {SITE.since}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
