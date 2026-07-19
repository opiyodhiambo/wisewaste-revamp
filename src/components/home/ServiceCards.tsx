import { Link } from "react-router-dom";
import { services } from "../../data/services";
import { ArrowUpRight } from "lucide-react";
import Container from "../ui/Container";

const GREEN = "#1B6B1B";
const ORANGE = "#F9A826";
const GOLD = "#B38C00"; // close to screenshot gold

// top icon row (placeholder icons; replace with your SVGs later if you want)
const valueIcons = [
  { label: "Reliable &\nTrustworthy", icon: "🧑‍💼" },
  { label: "Efficient\n& Low Cost", icon: "💸" },
  { label: "Ensure\nSatisfaction", icon: "✅" },
  { label: "Green\nEconomy", icon: "🌿" },
  { label: "Certified\nGarbage\nCollectors", icon: "🗑️" },
  { label: "Sustainable\nManagement", icon: "♻️" },
];

const imagePlaceholders = [
  // replace these later with your own images
  "https://images.unsplash.com/photo-1612459303155-5b4b1d3e0b8a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80",
];

export default function ServiceCards() {
  const featured = services.slice(0, 3);

  return (
    <section className="relative overflow-hidden">
      {/* GOLD background */}
      <div className="absolute inset-0" style={{ backgroundColor: GOLD }} />

      {/* subtle overlay to soften */}
      <div className="absolute inset-0 bg-black/5" />

      {/* White curve at the bottom (like screenshot) */}
      <div className="absolute left-0 right-0 bottom-[-1px]">
        <svg viewBox="0 0 1440 160" className="w-full h-[120px] md:h-[150px]">
          <path
            fill="white"
            d="M0,96 C240,160 480,160 720,120 C960,80 1200,80 1440,120 L1440,160 L0,160 Z"
          />
        </svg>
      </div>

      <Container className="relative pt-10 md:pt-14 pb-16 md:pb-24">
        {/* Top icon row */}
        <div className="flex flex-wrap items-start justify-center lg:justify-between gap-x-10 gap-y-6 text-white">
          {valueIcons.map((v) => (
            <div key={v.label} className="flex items-start gap-3 min-w-[140px]">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-xl">
                <span aria-hidden>{v.icon}</span>
              </div>
              <div className="font-semibold leading-tight whitespace-pre-line">{v.label}</div>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="mt-10 md:mt-14 grid gap-6 lg:grid-cols-3">
          {featured.map((s, idx) => (
            <div
              key={s.slug}
              className="bg-white rounded-2xl shadow-soft border border-black/5 overflow-hidden"
            >
              {/* Card content layout:
                  - Mobile/tablet: image on top
                  - Desktop: image on left */}
              <div className="grid grid-cols-1 md:grid-cols-[170px_1fr]">
                {/* Image */}
                <div className="md:h-full h-48 md:h-auto bg-slate-200">
                  <img
                    src={imagePlaceholders[idx] ?? imagePlaceholders[0]}
                    alt={s.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Text */}
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-extrabold text-[#0B3D2E]">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-slate-600 leading-relaxed">
                    {s.excerpt}
                  </p>

                  <div className="mt-6">
                    <Link
                      to={`/services/${s.slug}`}
                      className="inline-flex items-center gap-2 font-bold transition-colors"
                      style={{ color: GREEN }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = ORANGE)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = GREEN)}
                    >
                      Explore More <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom paragraph + link */}
        <div className="relative mt-10 md:mt-14 max-w-3xl mx-auto text-center text-white/90 lg:text-white">
          <p className="text-sm md:text-base font-semibold leading-relaxed">
            We have a range of operations from waste disposal services, washroom hygiene services, recycling services,
            cleaning services to pest control & fumigation services. Our services are tailored for both commercial and
            residential.
          </p>

          <div className="mt-4">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 font-extrabold underline underline-offset-8"
              style={{ color: "#0B3D2E" }}
            >
              <span style={{ color: GREEN }}>Our Specialty Areas</span>
              <ArrowUpRight size={18} style={{ color: GREEN }} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}