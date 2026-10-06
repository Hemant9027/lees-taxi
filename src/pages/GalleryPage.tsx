import { useMemo, useState } from "react";
import { Camera } from "lucide-react";
import { cn } from "../utils/cn";
import { DESTINATIONS, GALLERY, SITE } from "../data/site";
import { Lightbox, Reveal, SafeImg, SectionHeader, usePageMeta } from "../components/ui";
import { FinalCta } from "../components/sections";

type Filter = "all" | "island" | "destinations";

export default function GalleryPage() {
  usePageMeta(
    "Gallery — Long Island, Bahamas in Photos | Lee's Taxi Services #14",
    "Real photographs from Lee's Taxi Services #14 — island tours, beaches, and destinations across Long Island, The Bahamas."
  );

  const [filter, setFilter] = useState<Filter>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = useMemo(() => {
    const island = GALLERY.map((g) => ({ src: g.src, full: g.full, alt: g.alt, kind: "island" as const, tall: g.tall }));
    const dests = DESTINATIONS.map((d) => ({ src: d.image, full: d.image, alt: d.imageAlt, kind: "destinations" as const, tall: false }));
    const all = [...island.slice(0, 9), ...dests.slice(0, 6), ...island.slice(9)];
    if (filter === "island") return island;
    if (filter === "destinations") return dests;
    return all;
  }, [filter]);

  return (
    <>
      <section className="bg-sand-50 pt-32 pb-14 sm:pt-40 sm:pb-16" aria-labelledby="gallery-heading">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeader
            eyebrow="Photo gallery"
            title={
              <span id="gallery-heading">
                Long Island, through <span className="italic font-normal text-ocean-700">Lee's lens</span>
              </span>
            }
            lead={`Real photographs from the ${SITE.name} archive — tours, beaches, and everyday island beauty.`}
            className="max-w-3xl"
          />
          <Reveal delay={150} className="mt-8">
            <div className="inline-flex flex-wrap gap-1.5 rounded-full border border-ink-900/10 bg-white p-1.5" role="tablist" aria-label="Filter gallery">
              {(
                [
                  ["all", "All photos"],
                  ["island", "Around the island"],
                  ["destinations", "Tour stops"],
                ] as [Filter, string][]
              ).map(([key, label]) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={filter === key}
                  onClick={() => setFilter(key)}
                  className={cn(
                    "min-h-10 rounded-full px-5 text-sm font-bold transition-all",
                    filter === key ? "bg-ink-900 text-sand-50 shadow-soft" : "text-ink-700/70 hover:bg-ink-900/5 hover:text-ink-900"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand-50 pb-20 sm:pb-28" aria-label="Photographs">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="columns-2 gap-4 sm:gap-5 lg:columns-3 [&>*]:mb-4 sm:[&>*]:mb-5">
            {items.map((item, i) => (
              <Reveal key={item.src + i} delay={(i % 3) * 60}>
                <button
                  onClick={() => setLightbox(i)}
                  className="group relative block w-full overflow-hidden rounded-2xl text-left focus-visible:outline-2"
                  aria-label={`View photo: ${item.alt}`}
                >
                  <SafeImg
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    frameClassName={cn("w-full", item.tall ? "aspect-[3/3.6]" : "aspect-[4/3]")}
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-ink-950/55 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                    <span className="max-w-[75%] text-xs font-semibold text-white">{item.alt}</span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur">
                      <Camera className="h-4 w-4" aria-hidden />
                    </span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        items={items.map((i) => ({ src: i.full, alt: i.alt }))}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onNavigate={setLightbox}
      />

      <FinalCta />
    </>
  );
}
