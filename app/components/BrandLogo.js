const cx = (...classes) => classes.filter(Boolean).join(" ");

function BrandMark({ className, title = "Lumineers logo" }) {
  return (
    <svg
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={className}
    >
      <defs>
        <linearGradient id="lumineersOrbit" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="52%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="lumineersCore" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="55%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>

      <circle cx="128" cy="128" r="94" fill="none" stroke="url(#lumineersOrbit)" strokeWidth="8" opacity="0.72" />
      <circle cx="128" cy="128" r="66" fill="none" stroke="url(#lumineersOrbit)" strokeWidth="4" opacity="0.38" />

      <path d="M92 66h30v88h62v34H92z" fill="url(#lumineersCore)" />
      <path d="M124 94h38l-38 38z" fill="#FFFFFF" opacity="0.24" />

      <circle cx="188" cy="72" r="8" fill="#EC4899" />
      <circle cx="68" cy="186" r="7" fill="#38BDF8" />
      <circle cx="128" cy="128" r="7" fill="#FFFFFF" opacity="0.85" />
    </svg>
  );
}

export default function BrandLogo({
  className,
  markClassName,
  textClassName,
  subtitleClassName,
  withWordmark = true,
  withSubtitle = false,
}) {
  return (
    <div className={cx("inline-flex items-center gap-2.5", className)}>
      <BrandMark className={cx("h-10 w-10", markClassName)} />
      {withWordmark ? (
        <div className="leading-none">
          <p
            className={cx(
              "bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-sm font-semibold uppercase tracking-[0.22em] text-transparent",
              textClassName
            )}
          >
            Lumineers
          </p>
          {withSubtitle ? (
            <p className={cx("mt-1 text-[11px] uppercase tracking-[0.16em] text-gray-400", subtitleClassName)}>
              Travel Journal Platform
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
