import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import { site } from "../../data/site";

const GREEN = "#1B6B1B";
const ORANGE = "#F9A826";

export default function ContactFloat() {
  return (
    <div className="fixed left-4 sm:left-5 bottom-5 z-40 flex flex-col items-start gap-3">
      <style>{`
        @keyframes ringWaveFloat {
          0% { transform: scale(1); opacity: .35; }
          60% { transform: scale(1.55); opacity: 0; }
          100% { transform: scale(1.55); opacity: 0; }
        }
        .float-ring{
          position:absolute;
          inset:-8px;
          border-radius:9999px;
          border: 2px solid rgba(255,255,255,.35);
          animation: ringWaveFloat 1.8s ease-out infinite;
        }
        .float-ring.delay{
          animation-delay: .55s;
          inset:-14px;
          border-color: rgba(255,255,255,.22);
        }
      `}</style>

      <Link
        to="/request-pickup"
        className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-transform hover:-translate-y-[1px]"
        style={{ backgroundColor: ORANGE }}
      >
        <Mail size={17} />
        Request Pickup
      </Link>

      <a
        href={`tel:${site.phoneDigits}`}
        aria-label="Call us"
        className="relative h-14 w-14 rounded-full flex items-center justify-center text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
        style={{ backgroundColor: GREEN }}
      >
        <span className="float-ring" />
        <span className="float-ring delay" />
        <Phone size={20} className="relative z-10" />
      </a>
    </div>
  );
}
