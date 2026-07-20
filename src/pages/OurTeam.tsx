import { motion } from "framer-motion";
import Container from "../components/ui/Container";

const GREEN = "#1B6B1B";
const ORANGE = "#F9A826";
const DARK = "#0B3D2E";
const GOLD = "#B38C00";

type Tier = 0 | 1 | 2;

type Member = {
  name: string;
  role: string;
  blurb: string;
  tier: Tier;
  angle?: number; // degrees, only used for tier 1 and 2 (radial placement)
};

const team: Member[] = [
  {
    name: "Daniel Otieno",
    role: "Chief Executive Officer",
    blurb: "Sets the direction for the company's shift into full-cycle resource recovery and oversees key partnerships.",
    tier: 0,
  },
  {
    name: "Faith Wanjiru",
    role: "General Manager",
    blurb: "Runs day-to-day operations across collection, sorting, and recovery, keeping every department aligned.",
    tier: 1,
    angle: -90,
  },
  {
    name: "Brian Kiptoo",
    role: "Accountant",
    blurb: "Manages financial planning, billing, and reporting across all recovery streams and trading operations.",
    tier: 2,
    angle: -45,
  },
  {
    name: "Amina Hassan",
    role: "Environmental Engineer",
    blurb: "Ensures every recovery and processing stage meets environmental and safety standards.",
    tier: 2,
    angle: 45,
  },
  {
    name: "Peter Njoroge",
    role: "Logistics Manager",
    blurb: "Coordinates the collection fleet and scheduling, keeping materials moving from pickup to processing.",
    tier: 2,
    angle: 135,
  },
  {
    name: "Grace Achieng",
    role: "Sales & Partnerships Lead",
    blurb: "Manages client relationships and drives trading and export partnerships for recovered materials.",
    tier: 2,
    angle: 225,
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

function polar(rPercent: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    left: `${50 + rPercent * Math.cos(rad)}%`,
    top: `${50 + rPercent * Math.sin(rad)}%`,
  };
}

const tierStyle: Record<Tier, { bg: string; color: string; size: string; ring: string }> = {
  0: { bg: DARK, color: "white", size: "h-20 w-20 sm:h-24 sm:w-24 text-lg", ring: ORANGE },
  1: { bg: GREEN, color: "white", size: "h-16 w-16 sm:h-[72px] sm:w-[72px] text-base", ring: GOLD },
  2: { bg: "white", color: DARK, size: "h-14 w-14 sm:h-16 sm:w-16 text-sm", ring: GREEN },
};

function Avatar({ m }: { m: Member }) {
  const s = tierStyle[m.tier];
  return (
    <div
      className={`rounded-full flex items-center justify-center font-extrabold shadow-[0_10px_30px_rgba(0,0,0,0.18)] border-2 ${s.size}`}
      style={{ backgroundColor: s.bg, color: s.color, borderColor: s.ring }}
    >
      {initials(m.name)}
    </div>
  );
}

/** Faint rotating rings, purely decorative, matches the hex/ring motif used across the site */
function OrbitRings() {
  return (
    <svg
      className="absolute inset-0 h-full w-full pointer-events-none"
      viewBox="0 0 400 400"
      aria-hidden="true"
    >
      <circle cx="200" cy="200" r="88" fill="none" stroke="rgba(27,107,27,0.18)" strokeWidth="1.5" strokeDasharray="3 6" />
      <motion.circle
        cx="200"
        cy="200"
        r="150"
        fill="none"
        stroke="rgba(249,168,38,0.22)"
        strokeWidth="1.5"
        strokeDasharray="2 8"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "200px 200px" }}
      />
    </svg>
  );
}

/** Connecting lines showing who reports through whom */
function OrgLines() {
  const manager = team.find((m) => m.tier === 1)!;
  const leads = team.filter((m) => m.tier === 2);

  const toXY = (rPercent: number, angleDeg: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: 200 + rPercent * 2 * Math.cos(rad), y: 200 + rPercent * 2 * Math.sin(rad) };
  };

  const managerXY = toXY(22, manager.angle ?? -90);

  return (
    <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 400 400" aria-hidden="true">
      <line x1="200" y1="200" x2={managerXY.x} y2={managerXY.y} stroke="rgba(11,61,46,0.25)" strokeWidth="1.5" />
      {leads.map((l) => {
        const xy = toXY(38, l.angle ?? 0);
        return (
          <line
            key={l.name}
            x1={managerXY.x}
            y1={managerXY.y}
            x2={xy.x}
            y2={xy.y}
            stroke="rgba(11,61,46,0.15)"
            strokeWidth="1.5"
          />
        );
      })}
    </svg>
  );
}

function OrbitNode({ m, rPercent }: { m: Member; rPercent: number }) {
  const pos = m.tier === 0 ? { left: "50%", top: "50%" } : polar(rPercent, m.angle ?? 0);

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group"
      style={pos}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4 + (m.angle ?? 0) * 0.01, repeat: Infinity, ease: "easeInOut" }}
    >
      <Avatar m={m} />
      <div className="text-center leading-tight">
        <div className="text-xs sm:text-sm font-extrabold" style={{ color: DARK }}>
          {m.name}
        </div>
        <div className="text-[10px] sm:text-[11px] font-semibold" style={{ color: GREEN }}>
          {m.role}
        </div>
      </div>

      {/* Hover detail, desktop only */}
      <div
        className="hidden sm:block absolute top-full mt-2 w-48 rounded-lg bg-white shadow-[0_18px_45px_rgba(0,0,0,0.18)] border border-slate-100 p-3 text-[11px] leading-relaxed text-slate-600 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-20"
      >
        {m.blurb}
      </div>
    </motion.div>
  );
}

export default function OurTeam() {
  const ceo = team.find((m) => m.tier === 0)!;
  const manager = team.find((m) => m.tier === 1)!;
  const leads = team.filter((m) => m.tier === 2);

  return (
    <section className="bg-white">
      <Container className="py-16 md:py-24">
        <div className="text-center">
          <div className="text-[11px] font-semibold tracking-wide" style={{ color: GREEN }}>
            Meet The People Behind The Recovery
          </div>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold" style={{ color: DARK }}>
            Our Team
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-sm leading-relaxed" style={{ color: ORANGE }}>
            Placeholder names and roles below, real profiles and photos go here once that content
            is ready.
          </p>
        </div>

        {/* DESKTOP / TABLET: orbital hierarchy */}
        <div className="hidden md:block mt-16">
          <div className="relative aspect-square w-full max-w-[560px] mx-auto">
            <OrbitRings />
            <OrgLines />
            {team.map((m) => (
              <OrbitNode key={m.name} m={m} rPercent={m.tier === 1 ? 22 : 38} />
            ))}
          </div>
        </div>

        {/* MOBILE: vertical hierarchy stack */}
        <div className="md:hidden mt-12 flex flex-col items-center">
          <Avatar m={ceo} />
          <div className="mt-2 text-center">
            <div className="text-sm font-extrabold" style={{ color: DARK }}>{ceo.name}</div>
            <div className="text-xs font-semibold" style={{ color: GREEN }}>{ceo.role}</div>
            <p className="mt-2 max-w-xs text-xs text-slate-600 leading-relaxed">{ceo.blurb}</p>
          </div>

          <div className="w-px h-8" style={{ backgroundColor: "rgba(11,61,46,0.25)" }} />

          <Avatar m={manager} />
          <div className="mt-2 text-center">
            <div className="text-sm font-extrabold" style={{ color: DARK }}>{manager.name}</div>
            <div className="text-xs font-semibold" style={{ color: GREEN }}>{manager.role}</div>
            <p className="mt-2 max-w-xs text-xs text-slate-600 leading-relaxed">{manager.blurb}</p>
          </div>

          <div className="w-px h-8" style={{ backgroundColor: "rgba(11,61,46,0.25)" }} />

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 w-full max-w-sm">
            {leads.map((l) => (
              <div key={l.name} className="flex flex-col items-center text-center">
                <Avatar m={l} />
                <div className="mt-2 text-xs font-extrabold" style={{ color: DARK }}>{l.name}</div>
                <div className="text-[11px] font-semibold" style={{ color: GREEN }}>{l.role}</div>
                <p className="mt-1.5 text-[11px] text-slate-600 leading-relaxed">{l.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
