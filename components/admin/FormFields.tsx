export function TextInput({
  label,
  name,
  defaultValue,
  type = "text",
  required = false,
  placeholder
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-stone-700">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue ?? ""}
        className="rounded-2xl border border-blush-100 bg-white px-4 py-3 outline-none transition focus:border-roseGold focus:ring-4 focus:ring-blush-100"
      />
    </label>
  );
}

export function TextArea({
  label,
  name,
  defaultValue,
  required = false
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-stone-700">
      {label}
      <textarea
        name={name}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="min-h-28 rounded-2xl border border-blush-100 bg-white px-4 py-3 outline-none transition focus:border-roseGold focus:ring-4 focus:ring-blush-100"
      />
    </label>
  );
}

export function Checkbox({
  label,
  name,
  defaultChecked
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-blush-100 bg-white px-4 py-3 text-sm font-semibold text-stone-700">
      <input name={name} type="checkbox" defaultChecked={defaultChecked} className="size-4 accent-roseGold" />
      {label}
    </label>
  );
}

export function FileInput({ label, name }: { label: string; name: string }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-stone-700">
      {label}
      <input
        name={name}
        type="file"
        accept="image/*"
        className="rounded-2xl border border-dashed border-blush-200 bg-blush-50 px-4 py-3 text-sm"
      />
    </label>
  );
}
