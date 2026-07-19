import { site } from "../../data/site";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat() {
  const href = `https://wa.me/${site.phoneDigits}?text=${encodeURIComponent(
    "Hi Wise Waste Services, I’d like to request a quote / pickup."
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      className="
        fixed bottom-6 left-6 z-40
        h-14 w-14
        rounded-full
        bg-[#25D366]
        text-white
        shadow-lg
        animate-pulse
        flex items-center justify-center
        hover:scale-105
        transition-transform
      "
    >
      <FaWhatsapp size={26} />
    </a>
  );
}
