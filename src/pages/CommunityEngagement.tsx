import { useState } from "react";
import Container from "../components/ui/Container";
import { Users, GraduationCap, HeartHandshake, Handshake, ImageOff } from "lucide-react";

const GREEN = "#1B6B1B";
const ORANGE = "#F9A826";
const DARK = "#0B3D2E";

const pillars = [
  {
    icon: Users,
    title: "Community Clean-Up Drives",
    desc: "We organize collection days with residents and estates, clearing waste and modeling proper sorting on the spot.",
  },
  {
    icon: GraduationCap,
    title: "School & Youth Education",
    desc: "Workshops in local schools teach source separation and basic recycling, building habits early.",
  },
  {
    icon: HeartHandshake,
    title: "Supporting Waste Pickers",
    desc: "We work to bring informal waste pickers into the formal collection and sorting chain, with fair pay and proper safety gear.",
  },
  {
    icon: Handshake,
    title: "Local Partnerships",
    desc: "We partner with county offices, estates, and community organizations on practical, sustainable waste pilots.",
  },
];

// ✅ Add these files to /public/assets/community/ — filenames are fixed so the
// grid below renders as soon as they exist. Missing files fall back to a
// placeholder box instead of a broken image icon.
const photoFilenames = [
  "/community/community-1.jpeg",
  "/community/community-2.jpeg",
  "/community/community-3.jpeg",
  "/community/community-4.jpeg",
  "/community/community-5.jpeg",
  "/community/community-6.jpeg",
];

/** Faint hex/grid texture, same motif family used across the rest of the site */
function CommunityBackdrop() {
  return (
    <svg
      className="absolute inset-0 h-full w-full pointer-events-none"
      viewBox="0 0 1440 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="communityGrid" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M 56 0 L 0 0 0 56" fill="none" stroke="rgba(11,61,46,0.035)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1440" height="700" fill="url(#communityGrid)" />

      <polygon
        points="1300,60 1348,87 1348,140 1300,167 1252,140 1252,87"
        fill="none"
        stroke="rgba(249,168,38,0.18)"
        strokeWidth="2"
      />
      <circle
        cx="140"
        cy="560"
        r="130"
        fill="none"
        stroke="rgba(27,107,27,0.1)"
        strokeWidth="1"
      />
    </svg>
  );
}

function PhotoGrid() {
  const [errored, setErrored] = useState<Record<number, boolean>>({});

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
      {photoFilenames.map((src, i) => (
        <div
          key={src}
          className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200"
        >
          {errored[i] ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-400">
              <ImageOff size={22} />
              <span className="text-[10px] font-medium px-2 text-center">Photo coming soon</span>
            </div>
          ) : (
            <img
              src={src}
              alt="Community engagement activity"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
              onError={() => setErrored((prev) => ({ ...prev, [i]: true }))}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function CommunityEngagement() {
  return (
    <section className="relative bg-white overflow-hidden">
      <CommunityBackdrop />

      <Container className="relative py-16 md:py-24">
        <div className="text-center">
          <div className="text-[11px] font-semibold tracking-wide" style={{ color: GREEN }}>
            Beyond Collection And Recovery
          </div>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold" style={{ color: DARK }}>
            Community Engagement
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-sm leading-relaxed" style={{ color: ORANGE }}>
            Recovering waste at scale only works alongside the communities that generate and sort
            it. These are the programs we run to make that partnership real.
          </p>
        </div>

        {/* Pillars */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-xl border border-slate-100 bg-white shadow-[0_18px_45px_rgba(0,0,0,0.08)] p-6"
              >
                <div
                  className="h-11 w-11 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "rgba(27,107,27,0.1)" }}
                >
                  <Icon size={20} style={{ color: GREEN }} />
                </div>
                <h3 className="mt-4 text-sm font-extrabold" style={{ color: DARK }}>
                  {p.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{p.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Photo gallery */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-extrabold" style={{ color: DARK }}>
              From The Field
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Moments from clean-up drives, school visits, and community partnerships.
            </p>
          </div>

          <PhotoGrid />
        </div>
      </Container>
    </section>
  );
}