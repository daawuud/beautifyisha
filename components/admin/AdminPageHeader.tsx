export function AdminPageHeader({
  title,
  copy,
  action
}: {
  title: string;
  copy?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-roseGold">Admin</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-stone-950">{title}</h1>
        {copy && <p className="mt-3 max-w-2xl leading-7 text-stone-600">{copy}</p>}
      </div>
      {action}
    </div>
  );
}
