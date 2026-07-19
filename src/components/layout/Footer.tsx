import Container from "../ui/Container";
import { Link } from "react-router-dom";
import { site } from "../../data/site";
import {
  ArrowUpRight,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Newspaper,
} from "lucide-react";

const BG = "#082418";   // deep footer background
const BAND = "#0B2E22"; // newsletter band
const ORANGE = "#F9A826";

const serviceLinks = [
  { label: "Collection & Sorting", to: "/services/garbage-collection" },
  { label: "E-Waste, Plastics & Metals", to: "/services/recycling" },
  { label: "Reuse & Repurposing", to: "/services/reusing" },
  { label: "Trading & Export", to: "/services" },
];

export default function Footer() {
  return (
    <footer className="text-white">
      {/* ===========================
          Newsletter band (top strip)
         =========================== */}
      <div className="relative overflow-hidden" style={{ backgroundColor: BAND }}>
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <pattern id="footerLattice" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footerLattice)" />
        </svg>

        <Container className="relative py-6 md:py-8">
          <div className="grid gap-4 md:grid-cols-[1fr_520px] items-center">
            {/* left: icon + text */}
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-sm bg-white/5 flex items-center justify-center shrink-0">
                <Newspaper size={26} className="text-white/75" />
              </div>

              <div className="text-sm md:text-base font-semibold text-white/90 leading-snug">
                Sign Up For Recovery Industry Alerts,
                <br className="hidden sm:block" />
                News And Insights From Us.
              </div>
            </div>

            {/* right: input + button */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;

                await fetch("/api/subscribe", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email }),
                });

                alert("Thank you for subscribing!");
              }}
              className="flex items-stretch w-full"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email Address"
                className="w-full min-w-0 bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none"
              />

              <button
                type="submit"
                className="shrink-0 px-4 sm:px-6 py-3 text-sm font-extrabold border border-white/20 border-l-0 bg-white/10 hover:bg-white/15 transition inline-flex items-center gap-2"
                style={{ color: ORANGE }}
              >
                Subscribe <ArrowUpRight size={18} />
              </button>
            </form>
          </div>
        </Container>
      </div>

      {/* ===========================
          Main footer
         =========================== */}
      <div style={{ backgroundColor: BG }}>
        <Container className="py-12 md:py-14">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* About Us */}
            <div>
              <div className="text-sm font-extrabold">About Us</div>
              <p className="mt-5 text-sm text-white/70 leading-relaxed max-w-sm">
                We recognize that the right recovery partner for residential and
                commercial clients is the most important choice. {site.name} sorts,
                recovers, and reprocesses material streams, keeping value in
                circulation instead of buried in the ground.
              </p>

              {/* Social icons (outlined circles) */}
              <div className="mt-6 flex items-center gap-3">
                <a
                  aria-label="Facebook"
                  href={site.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="h-9 w-9 rounded-full border border-white/20 inline-flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 transition"
                >
                  <Facebook size={16} />
                </a>

                <a
                  aria-label="Twitter"
                  href={site.social.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="h-9 w-9 rounded-full border border-white/20 inline-flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 transition"
                >
                  <Twitter size={16} />
                </a>

                <a
                  aria-label="Instagram"
                  href={site.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="h-9 w-9 rounded-full border border-white/20 inline-flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 transition"
                >
                  <Instagram size={16} />
                </a>

                <a
                  aria-label="LinkedIn"
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="h-9 w-9 rounded-full border border-white/20 inline-flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 transition"
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </div>

            {/* Company */}
            <div>
              <div className="text-sm font-extrabold">Company</div>
              <div className="mt-5 grid gap-3 text-sm">
                <Link to="/about" className="text-white/70 hover:text-white transition">
                  About Us
                </Link>
                <Link to="/request-pickup" className="text-white/70 hover:text-white transition">
                  Request Pickup
                </Link>
                <Link to="/contact" className="text-white/70 hover:text-white transition">
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Services */}
            <div>
              <div className="text-sm font-extrabold">Services</div>
              <div className="mt-5 grid gap-3 text-sm">
                {serviceLinks.map((s) => (
                  <Link key={s.label} to={s.to} className="text-white/70 hover:text-white transition">
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div>
              <div className="text-sm font-extrabold">Quick Contact</div>

              <p className="mt-5 text-sm text-white/70 leading-relaxed">
                If you have any questions or need help, feel free to contact our team.
              </p>

              <div className="mt-5 space-y-4 text-sm">
                {/* email */}
                <div className="flex items-center gap-3">
                  <Mail size={16} style={{ color: ORANGE }} className="shrink-0" />
                  <a
                    href={`mailto:${site.email}`}
                    className="font-extrabold hover:opacity-90 break-all"
                    style={{ color: ORANGE }}
                  >
                    {site.email}
                  </a>
                </div>

                {/* phones */}
                <div className="flex items-start gap-3">
                  <Phone size={16} style={{ color: ORANGE }} className="mt-[2px] shrink-0" />
                  <div className="space-y-1">
                    <a
                      href={`tel:${site.phoneDigits}`}
                      className="block font-extrabold hover:opacity-90"
                      style={{ color: ORANGE }}
                    >
                      {site.phoneAltDisplay ?? "020 655 1533"}
                    </a>
                    <a
                      href={`tel:${site.phoneDigits}`}
                      className="block font-extrabold hover:opacity-90"
                      style={{ color: ORANGE }}
                    >
                      {site.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* address */}
                <div className="text-xs text-white/65 leading-relaxed">
                  {site.locationsLong ?? "Southgate Center, Mkomo Rd, Nairobi, KENYA.\nTalab Building, Mwembe Tayari, Mombasa"}
                </div>
              </div>
            </div>
          </div>

          {/* bottom row: copyright */}
          <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div className="text-xs text-white/40">
              © {new Date().getFullYear()} {site.name}, All Rights Reserved.
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
