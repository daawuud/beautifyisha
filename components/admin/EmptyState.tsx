export function EmptyState({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-blush-200 bg-white/70 p-10 text-center">
      <h3 className="font-display text-2xl font-semibold text-stone-950">{title}</h3>
      <p className="mt-2 text-stone-600">{copy}</p>
    </div>
  );
}
