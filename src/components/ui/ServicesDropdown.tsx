import { Link, NavLink } from "react-router-dom";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, ArrowUpRight } from "lucide-react";



export default function ServicesDropdown({
  items,
}: {
  items: { label: string; slug: string }[];
}) {
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

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "text-sm font-semibold inline-flex items-center gap-1 transition-colors",
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
      {/* Trigger */}
      <button
        type="button"
        className="inline-flex items-center gap-1 text-sm font-semibold text-[#1B6B1B] hover:text-[#F9A826] transition-colors"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        onFocus={safeOpen}
      >
        <NavLink to="/services" className={linkClass}>
          Services
        </NavLink>
        <ChevronDown size={16} className="mt-[1px]" />
      </button>

      {/* Menu */}
      <div
        id={menuId}
        role="menu"
        className={[
          "absolute left-0 top-full w-[520px] rounded-none bg-[#0B2E22] shadow-soft border border-white/10",
          "transition-opacity duration-150",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        style={{ marginTop: 0 }}
        onMouseEnter={safeOpen}
        onMouseLeave={safeClose}
      >
        {/* Hover bridge */}
        <div className="absolute -top-3 left-0 right-0 h-3" />

        <div className="px-8 py-6 text-white font-semibold">Services</div>

        <div className="pb-4">
          {items.map((s, idx) => (
            <div key={s.slug} className="group">
              {/* row */}
              <Link
                role="menuitem"
                to={`/services/${s.slug}`}
                onClick={() => setOpen(false)}
                className="
                  flex items-center justify-between gap-4
                  px-8 py-3 text-sm
                  text-white/80
                  hover:bg-white/5
                  transition-colors
                "
              >
                {/* label turns ORANGE */}
                <span
                  className="transition-colors group-hover:text-[#F9A826]"
                  style={{ color: undefined }}
                >
                  {s.label}
                </span>

                {/* ↗ arrow always visible, also turns ORANGE on hover */}
                <ArrowUpRight
                  size={16}
                  className="text-white/70 transition-colors group-hover:text-[#F9A826]"
                />
              </Link>

              {/* divider under each item fades out on hover of that item */}
              {idx !== items.length - 1 && (
                <div className="mx-8 border-t border-white/15 transition-opacity duration-200 group-hover:opacity-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}