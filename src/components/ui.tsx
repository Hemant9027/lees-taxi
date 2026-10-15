import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ImgHTMLAttributes,
} from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  ArrowRight,
  ArrowUpRight,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  Plane,
  Compass,
  Car,
  UtensilsCrossed,
  ShoppingBag,
  Palmtree,
  MapPin,
} from "lucide-react";
import { cn } from "../utils/cn";
import { SITE } from "../data/site";

/* ——— Page meta (title + description per route) ——— */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [title, description]);
}

/* ——— Scroll reveal wrapper ——— */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "figure" | "li" | "span";
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-visible");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={cn("reveal", className)} style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </Tag>
  );
}

/* ——— Safe image: fades in, keeps a sand-toned frame if the source fails ——— */
type SafeImgProps = ImgHTMLAttributes<HTMLImageElement> & {
  frameClassName?: string;
};

export function SafeImg({ className, frameClassName, alt = "", ...props }: SafeImgProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <span className={cn("img-frame relative block overflow-hidden", frameClassName)}>
      {!failed ? (
        <img
          {...props}
          alt={alt}
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn("img-fade h-full w-full object-cover", loaded && "is-loaded", className)}
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center bg-sand-200 text-sand-400" role="img" aria-label={alt}>
          <MapPin className="h-8 w-8" aria-hidden />
        </span>
      )}
    </span>
  );
}

/* ——— Section header ——— */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  lead?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        tone === "light" ? "text-sand-50" : "text-ink-900",
        className
      )}
    >
      <p className={cn("eyebrow flex items-center gap-3", align === "center" && "justify-center", tone === "light" ? "text-ocean-300" : "text-ocean-600")}>
        <span className={cn("inline-block h-px w-8", tone === "light" ? "bg-ocean-300" : "bg-ocean-600")} aria-hidden />
        {eyebrow}
      </p>
      <h2 className="font-display mt-4 text-4xl leading-[1.08] font-medium text-balance sm:text-5xl">
        {title}
      </h2>
      {lead && (
        <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", tone === "light" ? "text-sand-200/90" : "text-ink-700/85")}>
          {lead}
        </p>
      )}
    </Reveal>
  );
}

/* ——— Buttons ——— */
export function CallButton({ className, tone = "solid", label }: { className?: string; tone?: "solid" | "outline" | "sand"; label?: string }) {
  return (
    <a
      href={SITE.phoneHref}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[15px] font-bold tracking-tight transition-all duration-300",
        tone === "solid" && "bg-ocean-600 text-white shadow-soft hover:bg-ocean-700 hover:shadow-lift",
        tone === "sand" && "bg-sand-100 text-ink-900 hover:bg-sand-200",
        tone === "outline" && "border border-current/40 text-inherit hover:bg-white/10",
        className
      )}
    >
      <Phone className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12" aria-hidden />
      {label ?? `Call ${SITE.phoneDisplay}`}
    </a>
  );
}

export function BookButton({
  className,
  label = "Book Your Ride",
  icon = true,
  tone = "ink",
}: {
  className?: string;
  label?: string;
  icon?: boolean;
  tone?: "ink" | "ocean" | "sand";
}) {
  return (
    <Link
      to="/booking-demo"
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[15px] font-bold tracking-tight shadow-soft transition-all duration-300 hover:shadow-lift",
        tone === "ink" && "bg-ink-900 text-sand-50 hover:bg-ink-800",
        tone === "ocean" && "bg-ocean-600 text-white hover:bg-ocean-500",
        tone === "sand" && "bg-sand-100 text-ink-900 hover:bg-white",
        className
      )}
    >
      {label}
      {icon && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />}
    </Link>
  );
}

export function GhostLink({ to, children, className }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex items-center gap-2 text-[15px] font-bold text-ocean-700 transition-colors hover:text-ocean-800",
        className
      )}
    >
      <span className="link-line">{children}</span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
    </Link>
  );
}

/* ——— Service icon mapping ——— */
const ICONS = {
  plane: Plane,
  compass: Compass,
  car: Car,
  utensils: UtensilsCrossed,
  shopping: ShoppingBag,
  palmtree: Palmtree,
};
export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name as keyof typeof ICONS] ?? Compass;
  return <Icon className={className} aria-hidden />;
}

/* ——— Tripadvisor-style star row (all published reviews are 5★) ——— */
export function Stars({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-label="5 out of 5 stars on Tripadvisor">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" aria-hidden />
      ))}
    </span>
  );
}

/* ——— Lightbox ——— */
export function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: { src: string; alt: string }[];
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % items.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + items.length) % items.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, items.length, onClose, onNavigate]);

  if (index === null) return null;
  const item = items[index];

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink-950/95 p-4 backdrop-blur-sm sm:p-10"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        onClick={onClose}
        aria-label="Close viewer"
      >
        <X className="h-5 w-5" />
      </button>
      <button
        className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
        onClick={(e) => { e.stopPropagation(); onNavigate((index - 1 + items.length) % items.length); }}
        aria-label="Previous image"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <img
          src={item.src}
          alt={item.alt}
          referrerPolicy="no-referrer"
          className="max-h-[78vh] w-auto max-w-full rounded-xl object-contain shadow-lift"
        />
        <figcaption className="mt-4 text-center text-sm text-sand-200/80">{item.alt}</figcaption>
      </figure>
      <button
        className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
        onClick={(e) => { e.stopPropagation(); onNavigate((index + 1) % items.length); }}
        aria-label="Next image"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

/* ——— Inner page hero band ——— */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <header className="relative isolate overflow-hidden bg-ink-950">
      <div className="absolute inset-0">
        <SafeImg
          src={image}
          alt={imageAlt}
          frameClassName="h-full w-full"
          className="kenburns"
          fetchPriority="high"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/30" />
      </div>
      <div className="relative mx-auto flex min-h-[52vh] w-full max-w-6xl flex-col justify-end px-5 pt-36 pb-14 sm:min-h-[56vh] sm:px-8 sm:pb-20">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-ocean-300">
            <span className="inline-block h-px w-8 bg-ocean-300" aria-hidden />
            {eyebrow}
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.05] font-medium text-balance text-sand-50 sm:text-6xl">
            {title}
          </h1>
          {lead && <p className="mt-5 max-w-xl text-base leading-relaxed text-sand-200/90 sm:text-lg">{lead}</p>}
        </Reveal>
      </div>
    </header>
  );
}
