type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy?: string;
  centered?: boolean;
  light?: boolean;
};

export function SectionHeading({ eyebrow, title, copy, centered = false, light = false }: SectionHeadingProps) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${light ? "text-champagne" : "text-roseGold"}`}>{eyebrow}</p>
      <h2 className={`mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl ${light ? "text-white" : "text-stone-950"}`}>
        {title}
      </h2>
      {copy && <p className={`mt-5 text-base leading-8 sm:text-lg ${light ? "text-white/70" : "text-stone-600"}`}>{copy}</p>}
    </div>
  );
}
