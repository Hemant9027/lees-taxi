import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock,
  Mail,
  MailPlus,
  MapPin,
  MessageSquareText,
  Phone,
  Star,
  Users,
} from "lucide-react";
import { cn } from "../utils/cn";
import { FAQS, SERVICES, SITE } from "../data/site";
import { Reveal, SectionHeader, usePageMeta } from "../components/ui";
import { TrustMarquee } from "../components/sections";

/* ——— inject FAQ structured data ——— */
function useFaqSchema() {
  useEffect(() => {
    const id = "faq-jsonld";
    if (document.getElementById(id)) return;
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    document.head.appendChild(script);
    return () => {
      document.getElementById(id)?.remove();
    };
  }, []);
}

const inputCls = "field";
const labelCls = "mb-1.5 block text-[0.8rem] font-bold tracking-wide text-ink-800";

export default function Contact() {
  usePageMeta(
    "Contact & Booking — Lee's Taxi Services #14 | Long Island, Bahamas",
    "Arrange transportation with Lee's Taxi Services #14 — call +1 242-464-2495, message or email leestaxi14@gmail.com. Airport pickups, island tours, car rentals and more."
  );
  useFaqSchema();

  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    pickup: "",
    dropoff: "",
    service: "",
    passengers: "",
    message: "",
  });

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const mailBody = useMemo(() => {
    const lines = [
      `Hello Lee,`,
      ``,
      `I'd like to arrange transportation on Long Island.`,
      ``,
      `Name: ${form.name || "—"}`,
      `Email: ${form.email || "—"}`,
      `Phone: ${form.phone || "—"}`,
      `Arrival date: ${form.date || "—"}`,
      `Pick-up location: ${form.pickup || "—"}`,
      `Drop-off location: ${form.dropoff || "—"}`,
      `Service needed: ${form.service || "—"}`,
      `Passengers: ${form.passengers || "—"}`,
      ``,
      `Message:`,
      form.message || "—",
      ``,
      `— Sent from the Lee's Taxi Services #14 website`,
    ];
    return lines.join("\n");
  }, [form]);

  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(
    `Transportation request — ${form.name || "Long Island visitor"}`
  )}&body=${encodeURIComponent(mailBody)}`;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section className="bg-sand-50 pt-32 pb-16 sm:pt-40 sm:pb-24" aria-labelledby="contact-heading">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            {/* Left: contact info */}
            <div>
              <SectionHeader
                eyebrow="Contact & booking"
                title={
                  <span id="contact-heading">
                    Let's arrange your <span className="italic font-normal text-ocean-700">ride</span>
                  </span>
                }
                lead="Have questions or ready to plan? Reach out any way you like — we're here to help and will get back to you as soon as possible."
              />
              <Reveal delay={140}>
                <ul className="mt-10 space-y-4">
                  <li>
                    <a
                      href={SITE.phoneHref}
                      className="card-hover group flex items-center gap-4 rounded-3xl border border-ink-900/8 bg-white p-5 shadow-soft"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ocean-600 text-white transition-colors group-hover:bg-ocean-700">
                        <Phone className="h-5 w-5" aria-hidden />
                      </span>
                      <span>
                        <span className="block text-[0.65rem] font-bold tracking-[0.2em] uppercase text-ink-700/55">Hotline — call or message</span>
                        <span className="font-display block text-xl font-semibold text-ink-900 group-hover:text-ocean-700">
                          {SITE.phoneDisplay}
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="card-hover group flex items-center gap-4 rounded-3xl border border-ink-900/8 bg-white p-5 shadow-soft"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ink-900 text-sand-100 transition-colors group-hover:bg-ink-800">
                        <Mail className="h-5 w-5" aria-hidden />
                      </span>
                      <span>
                        <span className="block text-[0.65rem] font-bold tracking-[0.2em] uppercase text-ink-700/55">Email</span>
                        <span className="font-display block text-xl font-semibold text-ink-900 group-hover:text-ocean-700">
                          {SITE.email}
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <div className="flex items-center gap-4 rounded-3xl border border-ink-900/8 bg-white p-5 shadow-soft">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sand-200 text-ink-900">
                        <MapPin className="h-5 w-5" aria-hidden />
                      </span>
                      <span>
                        <span className="block text-[0.65rem] font-bold tracking-[0.2em] uppercase text-ink-700/55">Based in</span>
                        <span className="font-display block text-xl font-semibold text-ink-900">{SITE.location}</span>
                      </span>
                    </div>
                  </li>
                </ul>
                <a
                  href={SITE.tripadvisor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 inline-flex items-center gap-3 rounded-full border border-ink-900/10 bg-white px-5 py-3 text-sm font-bold text-ink-900 shadow-soft transition-all hover:shadow-lift"
                >
                  <Star className="h-4 w-4 fill-gold-400 text-gold-400" aria-hidden />
                  <span className="link-line">Verified five-star reviews on Tripadvisor</span>
                </a>
                <p className="mt-8 flex items-start gap-3 rounded-2xl bg-ocean-600/8 p-5 text-sm leading-relaxed text-ink-800">
                  <Clock className="mt-0.5 h-4.5 w-4.5 shrink-0 text-ocean-700" aria-hidden />
                  Taxis are not regularly stationed at Long Island's airports or docks — arranging ahead means
                  your ride is secured before you travel.
                </p>
              </Reveal>
            </div>

            {/* Right: inquiry form / confirmation */}
            <Reveal delay={180}>
              {sent ? (
                <div className="rounded-[2rem] border border-ink-900/8 bg-white p-7 shadow-lift sm:p-10" role="status">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ocean-600/12 text-ocean-700">
                    <CheckCircle2 className="h-7 w-7" aria-hidden />
                  </span>
                  <h2 className="font-display mt-6 text-3xl font-semibold tracking-tight text-balance text-ink-900">
                    Your request is ready to send, {form.name.split(" ")[0] || "friend"}
                  </h2>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-700/85">
                    This website doesn't take automatic bookings — so the fastest way to confirm is direct. Send
                    your request straight to Lee by email, or simply call.
                  </p>

                  <dl className="mt-6 space-y-2.5 rounded-2xl bg-sand-100 p-5 text-sm">
                    {[
                      ["Service", form.service],
                      ["Arrival", form.date],
                      ["Pick-up", form.pickup],
                      ["Drop-off", form.dropoff],
                      ["Passengers", form.passengers],
                    ]
                      .filter(([, v]) => v)
                      .map(([k, v]) => (
                        <div key={k} className="flex justify-between gap-4">
                          <dt className="font-bold text-ink-700/60">{k}</dt>
                          <dd className="text-right font-semibold text-ink-900">{v}</dd>
                        </div>
                      ))}
                  </dl>

                  <div className="mt-7 grid gap-3">
                    <a
                      href={mailto}
                      className="group flex min-h-13 items-center justify-center gap-2.5 rounded-full bg-ocean-600 px-6 text-[15px] font-bold text-white shadow-soft transition-all hover:bg-ocean-700 hover:shadow-lift"
                    >
                      <MailPlus className="h-4.5 w-4.5" aria-hidden />
                      Send request by email
                    </a>
                    <a
                      href={SITE.phoneHref}
                      className="flex min-h-13 items-center justify-center gap-2.5 rounded-full bg-ink-900 px-6 text-[15px] font-bold text-sand-50 shadow-soft transition-all hover:bg-ink-800"
                    >
                      <Phone className="h-4.5 w-4.5" aria-hidden />
                      Call {SITE.phoneDisplay}
                    </a>
                    <button
                      onClick={() => setSent(false)}
                      className="mx-auto mt-1 inline-flex items-center gap-2 text-sm font-bold text-ink-700/70 hover:text-ink-900"
                    >
                      <ArrowLeft className="h-4 w-4" aria-hidden />
                      Edit my request
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  className="rounded-[2rem] border border-ink-900/8 bg-white p-7 shadow-lift sm:p-10"
                  aria-label="Transportation inquiry form"
                >
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
                    Request transportation
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700/75">
                    Fill in what you know — fields marked <span aria-hidden className="text-conch-500">*</span> are
                    required.{" "}
                    <span className="font-semibold">Prefer to speak directly? Call {SITE.phoneDisplay}.</span>
                  </p>

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="f-name" className={labelCls}>
                        Name <span aria-hidden className="text-conch-500">*</span>
                      </label>
                      <input id="f-name" required autoComplete="name" className={inputCls} placeholder="Your full name" value={form.name} onChange={set("name")} />
                    </div>
                    <div>
                      <label htmlFor="f-email" className={labelCls}>Email</label>
                      <input id="f-email" type="email" autoComplete="email" className={inputCls} placeholder="you@example.com" value={form.email} onChange={set("email")} />
                    </div>
                    <div>
                      <label htmlFor="f-phone" className={labelCls}>Phone</label>
                      <input id="f-phone" type="tel" autoComplete="tel" className={inputCls} placeholder="+1 …" value={form.phone} onChange={set("phone")} />
                    </div>
                    <div>
                      <label htmlFor="f-date" className={labelCls}>Arrival date</label>
                      <div className="relative">
                        <input id="f-date" type="date" className={cn(inputCls, "pr-10")} value={form.date} onChange={set("date")} />
                        <CalendarDays className="pointer-events-none absolute top-1/2 right-3.5 h-4.5 w-4.5 -translate-y-1/2 text-ink-700/40" aria-hidden />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="f-pickup" className={labelCls}>Pick-up location</label>
                      <input id="f-pickup" className={inputCls} placeholder="e.g. Stella Maris Airport" value={form.pickup} onChange={set("pickup")} />
                    </div>
                    <div>
                      <label htmlFor="f-dropoff" className={labelCls}>Drop-off location</label>
                      <input id="f-dropoff" className={inputCls} placeholder="e.g. Cape Santa Maria Resort" value={form.dropoff} onChange={set("dropoff")} />
                    </div>
                    <div>
                      <label htmlFor="f-service" className={labelCls}>
                        Service needed <span aria-hidden className="text-conch-500">*</span>
                      </label>
                      <div className="relative">
                        <select id="f-service" required className={cn(inputCls, "appearance-none pr-10", !form.service && "text-[#9aa4a0]")} value={form.service} onChange={set("service")}>
                          <option value="" disabled>Choose a service…</option>
                          {SERVICES.map((s) => (
                            <option key={s.id} value={s.title}>{s.title}</option>
                          ))}
                          <option value="Something else">Something else</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 h-4.5 w-4.5 -translate-y-1/2 text-ink-700/40" aria-hidden />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="f-passengers" className={labelCls}>Number of passengers</label>
                      <div className="relative">
                        <input id="f-passengers" type="number" min={1} max={14} inputMode="numeric" className={cn(inputCls, "pr-10")} placeholder="e.g. 2" value={form.passengers} onChange={set("passengers")} />
                        <Users className="pointer-events-none absolute top-1/2 right-3.5 h-4.5 w-4.5 -translate-y-1/2 text-ink-700/40" aria-hidden />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="f-message" className={labelCls}>Message</label>
                      <textarea id="f-message" rows={4} className={cn(inputCls, "resize-none")} placeholder="Flight details, tour ideas, timing — anything that helps us plan." value={form.message} onChange={set("message")} />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="group mt-7 flex min-h-13 w-full items-center justify-center gap-2.5 rounded-full bg-ocean-600 text-[15px] font-bold text-white shadow-soft transition-all hover:bg-ocean-700 hover:shadow-lift"
                  >
                    <MessageSquareText className="h-4.5 w-4.5" aria-hidden />
                    Request Transportation
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </button>
                  <p className="mt-4 text-center text-xs leading-relaxed text-ink-700/55">
                    Your details are used only to respond to your inquiry.
                  </p>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <TrustMarquee tone="ink" />

      {/* FAQ */}
      <section className="bg-sand-50 py-16 sm:py-24" aria-labelledby="faq-heading">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
          <SectionHeader
            align="center"
            eyebrow="Common questions"
            title={
              <span id="faq-heading">
                Good to know, <span className="italic font-normal text-ocean-700">before you go</span>
              </span>
            }
          />
          <div className="mt-12 space-y-3.5">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="group rounded-2xl border border-ink-900/8 bg-white shadow-soft open:shadow-lift">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-display text-lg font-semibold tracking-tight text-ink-900 [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ocean-600/10 text-ocean-700 transition-transform duration-300 group-open:rotate-180">
                      <ChevronDown className="h-4.5 w-4.5" aria-hidden />
                    </span>
                  </summary>
                  <p className="px-6 pb-6 text-[0.95rem] leading-relaxed text-ink-700/85">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
