type SectionBackdropProps = {
  className?: string;
};

export default function SectionBackdrop({ className = "" }: SectionBackdropProps) {
  return (
    <svg
      className={`absolute inset-0 h-full w-full pointer-events-none ${className}`.trim()}
      viewBox="0 0 1440 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="sectionGrid" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M 56 0 L 0 0 0 56" fill="none" stroke="rgba(11,61,46,0.035)" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="1440" height="700" fill="url(#sectionGrid)" />
      <polygon
        points="1280,70 1328,96 1328,148 1280,174 1232,148 1232,96"
        fill="none"
        stroke="rgba(249,168,38,0.16)"
        strokeWidth="2"
      />
      <circle cx="180" cy="590" r="140" fill="none" stroke="rgba(27,107,27,0.08)" strokeWidth="1" />
      <path
        d="M1040 140C1110 120 1190 130 1248 176"
        fill="none"
        stroke="rgba(27,107,27,0.06)"
        strokeWidth="1.2"
      />
    </svg>
  );
}
