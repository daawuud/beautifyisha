import { loginAction } from "@/app/actions/auth";
import { BrandLogo } from "@/components/BrandLogo";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;
  const missingEnv = params.error === "missing-env" || !isSupabaseConfigured();

  return (
    <main className="grid min-h-screen place-items-center px-4 py-12">
      <div className="w-full max-w-md rounded-[2rem] border border-white bg-white/85 p-6 shadow-luxe backdrop-blur sm:p-8">
        <div className="mb-8">
          <BrandLogo />
          <h1 className="mt-8 font-display text-4xl font-semibold text-stone-950">Admin login</h1>
          <p className="mt-3 leading-7 text-stone-600">
            Sign in with the Supabase Auth admin email and password for Beautibyisha.
          </p>
        </div>

        {missingEnv && (
          <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
            Add Supabase environment variables before logging in.
          </div>
        )}
        {params.error && !missingEnv && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
            {params.error}
          </div>
        )}

        <form action={loginAction} className="grid gap-4">
          <input type="hidden" name="next" value={params.next ?? "/admin/dashboard"} />
          <label className="grid gap-2 text-sm font-semibold text-stone-700">
            Email
            <input
              name="email"
              type="email"
              required
              className="rounded-2xl border border-blush-100 bg-white px-4 py-3 outline-none transition focus:border-roseGold focus:ring-4 focus:ring-blush-100"
              placeholder="owner@example.com"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-stone-700">
            Password
            <input
              name="password"
              type="password"
              required
              className="rounded-2xl border border-blush-100 bg-white px-4 py-3 outline-none transition focus:border-roseGold focus:ring-4 focus:ring-blush-100"
              placeholder="Your password"
            />
          </label>
          <button
            type="submit"
            disabled={missingEnv}
            className="mt-2 rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white shadow-luxe transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-45"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
