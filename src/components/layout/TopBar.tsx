import { MapPin, Mail, Clock, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { site } from "../../data/site";
import Container from "../ui/Container";

const DARK = "#0B3D2E";
const DARK_2 = "#0F4A38";
const ORANGE = "#F9A826";

export default function TopBar() {
  return (
    <div
      className="relative text-white overflow-hidden"
      style={{ background: `linear-gradient(90deg, ${DARK} 0%, ${DARK_2} 100%)` }}
    >
      {/* faint diagonal texture, consistent with the rest of the site's mineral motif */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <pattern id="topbarGrid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topbarGrid)" />
      </svg>

      <Container className="relative flex items-center justify-between py-2 gap-4">
        {/* Left */}
        <div className="flex items-center gap-5 min-w-0">
          {/* Small + Medium (phone + tablet): icons only */}
          <div className="flex lg:hidden items-center gap-4 shrink-0">
            <MapPin size={18} />
            <a href={`mailto:${site.email}`} aria-label="Email" className="hover:opacity-90 transition-opacity">
              <Mail size={18} />
            </a>
            <Clock size={18} />
          </div>

          {/* Large (desktop): full text */}
          <div className="hidden lg:flex items-center gap-5 text-sm min-w-0">
            <div className="inline-flex items-center gap-2">
              <MapPin size={16} />
              <span className="text-white/85">Location:</span>
              <span style={{ color: ORANGE }} className="font-semibold">
                {site.locationShort}.
              </span>
            </div>

            <span className="h-3 w-px bg-white/15" aria-hidden="true" />

            <a
              className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
              href={`mailto:${site.email}`}
            >
              <Mail size={16} />
              <span className="text-white/85">Email:</span>
              <span style={{ color: ORANGE }} className="font-semibold">
                {site.email}
              </span>
            </a>

            <span className="h-3 w-px bg-white/15" aria-hidden="true" />

            <div className="inline-flex items-center gap-2">
              <Clock size={16} />
              <span className="text-white/85">Working Hours:</span>
              <span style={{ color: ORANGE }} className="font-semibold">
                {site.hours}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Social icons */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            aria-label="Facebook"
            href={site.social.facebook}
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <Facebook size={17} style={{ color: ORANGE }} />
          </a>
          <a
            aria-label="Twitter"
            href={site.social.twitter}
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <Twitter size={17} style={{ color: ORANGE }} />
          </a>
          <a
            aria-label="Instagram"
            href={site.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <Instagram size={17} style={{ color: ORANGE }} />
          </a>
          <a
            aria-label="LinkedIn"
            href={site.social.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <Linkedin size={17} style={{ color: ORANGE }} />
          </a>
        </div>
      </Container>
    </div>
  );
}
