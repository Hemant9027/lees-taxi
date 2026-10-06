import { ShieldCheck } from "lucide-react";
import { SITE } from "../data/site";
import { Reveal, SectionHeader, usePageMeta } from "../components/ui";
import { PhoneCtaNote } from "../components/sections";

const SECTIONS = [
  {
    title: "Information we collect",
    body: `When you contact ${SITE.name} — by phone, message, email or through this website — we may collect your name, contact details, travel dates, pick-up and drop-off locations, and any trip details you choose to share. We collect only what is needed to arrange your transportation, tour or rental.`,
  },
  {
    title: "How we use your information",
    body: "Your information is used solely to respond to your inquiry, arrange and deliver the services you request, and communicate with you about your trip. We do not sell, rent or trade your personal information to third parties.",
  },
  {
    title: "Communication preferences",
    body: `By contacting us at ${SITE.phoneDisplay} or ${SITE.email}, you consent to us replying by the same or similar channel — including phone, message or email — regarding your booking and trip.`,
  },
  {
    title: "Data retention & security",
    body: "Trip details are kept only as long as needed to deliver your service and handle any follow-up. Reasonable measures are taken to protect the information you share with us.",
  },
  {
    title: "Third-party services",
    body: "Reviews referenced on this website are published on Tripadvisor and governed by Tripadvisor's own policies. External links (such as social media and Airbnb platforms) operate under their respective privacy policies.",
  },
  {
    title: "Contact",
    body: `Questions about this policy or your information? Contact us at ${SITE.phoneDisplay} or ${SITE.email}. ${SITE.name} is based in ${SITE.location}.`,
  },
];

export default function PrivacyPolicy() {
  usePageMeta(
    "Privacy Policy | Lee's Taxi Services #14 — Long Island, Bahamas",
    "How Lee's Taxi Services #14 handles your personal information when you arrange transportation, tours and rentals on Long Island, The Bahamas."
  );

  return (
    <>
      <section className="bg-sand-50 pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
          <SectionHeader
            eyebrow={
              <>
                <ShieldCheck className="mr-2 inline h-4 w-4" aria-hidden /> Privacy
              </>
            }
            title="Privacy Policy"
            lead={`How ${SITE.name} handles your information when you arrange transportation, tours and rentals on Long Island, The Bahamas.`}
          />
        </div>
      </section>
      <section className="bg-sand-50 pb-20 sm:pb-28" aria-label="Privacy policy details">
        <div className="mx-auto w-full max-w-3xl space-y-5 px-5 sm:px-8">
          {SECTIONS.map((s, i) => (
            <Reveal key={s.title} delay={i * 50}>
              <article className="rounded-3xl border border-ink-900/8 bg-white p-7 shadow-soft sm:p-9">
                <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900 sm:text-2xl">{s.title}</h2>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-700/85">{s.body}</p>
              </article>
            </Reveal>
          ))}
          <Reveal delay={100}>
            <PhoneCtaNote className="justify-center pt-4" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
