import Link from "next/link";
import { logoutAction } from "@/app/actions/auth";
import { BrandLogo } from "@/components/BrandLogo";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/settings", label: "Settings" }
];

export function AdminShell({
  children,
  email
}: {
  children: React.ReactNode;
  email: string | undefined;
}) {
  return (
    <div className="min-h-screen bg-[#fbf8f5] text-stone-900">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-white bg-white/80 px-5 py-6 shadow-sm backdrop-blur xl:block">
        <BrandLogo />
        <nav className="mt-10 grid gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl px-4 py-3 text-sm font-semibold text-stone-700 transition hover:bg-blush-50 hover:text-stone-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="xl:pl-72">
        <header className="sticky top-0 z-20 border-b border-white bg-white/85 px-4 py-4 shadow-sm backdrop-blur sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-roseGold">Beautibyisha Admin</p>
              <p className="mt-1 text-sm text-stone-500">{email}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex gap-1 xl:hidden">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-blush-100 bg-white px-3 py-2 text-xs font-semibold text-stone-700"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white shadow-luxe transition hover:bg-stone-800"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
