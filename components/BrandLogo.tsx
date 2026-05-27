type BrandLogoProps = {
  compact?: boolean;
  light?: boolean;
};

export function BrandLogo({ compact = false, light = false }: BrandLogoProps) {
  return (
    <a href="#home" className="group inline-flex items-center gap-3" aria-label="Beautifyisha home">
      <span className="relative grid size-12 place-items-center rounded-full bg-gradient-to-br from-blush-100 via-white to-champagne shadow-glow ring-1 ring-white/80">
        <span className="absolute inset-1 rounded-full border border-softGold/40" />
        <span className="font-display text-2xl font-semibold text-roseGold">B</span>
      </span>
      {!compact && (
        <span className="leading-none">
          <span
            className={`block font-display text-2xl font-semibold tracking-normal ${
              light ? "text-white" : "text-stone-900"
            }`}
          >
            Beautifyisha
          </span>
          <span className={`mt-1 block text-xs uppercase tracking-[0.28em] ${light ? "text-white/70" : "text-roseGold"}`}>
            Beauty Salon
          </span>
        </span>
      )}
    </a>
  );
}
