export function AdminNotice({
  searchParams
}: {
  searchParams?: { saved?: string; error?: string };
}) {
  if (searchParams?.saved) {
    return (
      <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
        Changes saved.
      </div>
    );
  }

  if (searchParams?.error) {
    return (
      <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
        {searchParams.error}
      </div>
    );
  }

  return null;
}
