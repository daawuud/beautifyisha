type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className = "" }: ButtonLinkProps) {
  const variants = {
    primary:
      "bg-stone-950 text-white shadow-luxe hover:-translate-y-0.5 hover:bg-stone-800 focus-visible:outline-stone-950",
    secondary:
      "border border-roseGold/35 bg-white/75 text-stone-900 shadow-sm backdrop-blur hover:-translate-y-0.5 hover:border-softGold hover:bg-white focus-visible:outline-roseGold",
    light:
      "border border-white/45 bg-white/15 text-white shadow-glow backdrop-blur hover:-translate-y-0.5 hover:bg-white/25 focus-visible:outline-white"
  };

  return (
    <a
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
