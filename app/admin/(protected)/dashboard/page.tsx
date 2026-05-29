import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EmptyState } from "@/components/admin/EmptyState";
import { requireAdmin } from "@/lib/admin/auth";
import { formatDateTime } from "@/lib/admin/format";

export default async function AdminDashboardPage() {
  const { supabase } = await requireAdmin();
  const [services, gallery, newBookings, confirmedBookings, testimonials, latestBookings] = await Promise.all([
    supabase.from("services").select("id", { count: "exact", head: true }),
    supabase.from("gallery").select("id", { count: "exact", head: true }),
    supabase.from("bookings").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("bookings").select("id", { count: "exact", head: true }).eq("status", "confirmed"),
    supabase.from("testimonials").select("id", { count: "exact", head: true }),
    supabase.from("bookings").select("*").order("created_at", { ascending: false }).limit(6)
  ]);

  const cards = [
    { label: "Total services", value: services.count ?? 0, href: "/admin/services" },
    { label: "Gallery images", value: gallery.count ?? 0, href: "/admin/gallery" },
    { label: "New bookings", value: newBookings.count ?? 0, href: "/admin/bookings?status=new" },
    { label: "Confirmed bookings", value: confirmedBookings.count ?? 0, href: "/admin/bookings?status=confirmed" },
    { label: "Testimonials", value: testimonials.count ?? 0, href: "/admin/testimonials" }
  ];

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        copy="A quick view of website content, booking requests, and client proof."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-[1.5rem] border border-white bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-luxe"
          >
            <p className="text-sm font-semibold text-stone-500">{card.label}</p>
            <p className="mt-4 font-display text-4xl font-semibold text-stone-950">{card.value}</p>
          </Link>
        ))}
      </div>

      <section className="mt-8 rounded-[1.5rem] border border-white bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold text-stone-950">Latest bookings</h2>
          <Link href="/admin/bookings" className="text-sm font-semibold text-roseGold">
            View all
          </Link>
        </div>
        {!latestBookings.data?.length ? (
          <EmptyState title="No bookings yet" copy="New requests from the public booking form will appear here." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.18em] text-stone-500">
                <tr>
                  <th className="py-3">Customer</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blush-100">
                {latestBookings.data.map((booking) => (
                  <tr key={booking.id}>
                    <td className="py-4 font-semibold text-stone-950">{booking.customer_name}</td>
                    <td>{booking.service_name ?? "Not set"}</td>
                    <td>{booking.preferred_date ?? "Not set"}</td>
                    <td>
                      <span className="rounded-full bg-blush-50 px-3 py-1 text-xs font-semibold text-roseGold">
                        {booking.status}
                      </span>
                    </td>
                    <td>{formatDateTime(booking.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
