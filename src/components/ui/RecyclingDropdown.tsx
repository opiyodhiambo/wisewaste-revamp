// src/components/ui/RecyclingDropdown.tsx

import { Link, NavLink } from "react-router-dom";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, ArrowUpRight } from "lucide-react";

const recyclingItems = [
  { label: "Plastic Recycling", slug: "plastic-recycling" },
  { label: "Metal Recycling", slug: "metal-recycling" },
  { label: "E-Waste Recycling", slug: "ewaste-recycling" },
  { label: "Compost Manure", slug: "compost-manure" },
];

export default function RecyclingDropdown() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const menuId = useId();
  const closeTimer = useRef<number | null>(null);

  const safeOpen = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const safeClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "text-[13px] xl:text-sm font-semibold tracking-tight inline-flex items-center gap-1 transition-colors",
      "text-[#1B6B1B] hover:text-[#F9A826]",
      isActive ? "underline underline-offset-8 decoration-[#1B6B1B]" : "",
    ].join(" ");

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={safeOpen}
      onMouseLeave={safeClose}
    >
      <button
        type="button"
        className="inline-flex items-center gap-1 text-[13px] xl:text-sm font-semibold text-[#1B6B1B] hover:text-[#F9A826] transition-colors"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        onFocus={safeOpen}
      >
        <NavLink to="/services/recycling/e-waste-recycling" className={linkClass}>
          Recycling
        </NavLink>

        <ChevronDown
          size={16}
          className={[
            "mt-[1px] transition-transform duration-200",
            open ? "rotate-180" : "rotate-0",
          ].join(" ")}
        />
      </button>

      <div
        id={menuId}
        role="menu"
        className={[
          "absolute left-0 top-full w-[340px] rounded-none bg-[#0B2E22] shadow-soft border border-white/10 z-50",
          "transition-all duration-200",
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none",
        ].join(" ")}
      >
        <div className="absolute -top-3 left-0 right-0 h-3" />

        <div className="px-8 py-5 text-white font-semibold">
          Recycling
        </div>

        <div className="pb-4">
          {recyclingItems.map((item, idx) => (
            <div key={item.slug} className="group">
              <Link
                role="menuitem"
                to={`/services/recycling/${item.slug}`}
                onClick={() => setOpen(false)}
                className="
                  flex items-center justify-between gap-4
                  px-8 py-3 text-sm
                  text-white/80
                  hover:bg-white/5
                  transition-colors
                "
              >
                <span className="transition-colors group-hover:text-[#F9A826]">
                  {item.label}
                </span>

                <ArrowUpRight
                  size={16}
                  className="text-white/70 transition-colors group-hover:text-[#F9A826]"
                />
              </Link>

              {idx !== recyclingItems.length - 1 && (
                <div className="mx-8 border-t border-white/15 transition-opacity duration-200 group-hover:opacity-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}