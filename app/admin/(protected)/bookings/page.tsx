import Link from "next/link";
import { deleteBookingAction, updateBookingStatusAction } from "@/app/actions/admin";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EmptyState } from "@/components/admin/EmptyState";
import { requireAdmin } from "@/lib/admin/auth";
import { formatDate } from "@/lib/admin/format";
import type { BookingStatus } from "@/lib/supabase/types";

const statuses: ("all" | BookingStatus)[] = ["all", "new", "confirmed", "completed", "cancelled"];

export default async function AdminBookingsPage({
  searchParams
}: {
  searchParams: Promise<{ status?: BookingStatus }>;
}) {
  const params = await searchParams;
  const { supabase } = await requireAdmin();
  let query = supabase.from("bookings").select("*").order("created_at", { ascending: false });

  if (params.status && statuses.includes(params.status)) {
    query = query.eq("status", params.status);
  }

  const { data: bookings } = await query;

  return (
    <>
      <AdminPageHeader title="Bookings" copy="Review appointment requests and move each booking through the salon workflow." />
      <div className="mb-5 flex flex-wrap gap-2">
        {statuses.map((status) => (
          <Link
            key={status}
            href={status === "all" ? "/admin/bookings" : `/admin/bookings?status=${status}`}
            className="rounded-full border border-blush-100 bg-white px-4 py-2 text-sm font-semibold capitalize text-stone-700"
          >
            {status}
          </Link>
        ))}
      </div>
      {!bookings?.length ? (
        <EmptyState title="No bookings found" copy="Try another status filter or wait for new requests from the public site." />
      ) : (
        <div className="overflow-x-auto rounded-[1.5rem] border border-white bg-white p-4 shadow-sm">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.18em] text-stone-500">
              <tr>
                <th className="py-3">Customer</th>
                <th>Contact</th>
                <th>Service</th>
                <th>Date</th>
                <th>Notes</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blush-100">
              {bookings.map((booking) => (
                <tr key={booking.id} className="align-top">
                  <td className="py-4 font-semibold text-stone-950">{booking.customer_name}</td>
                  <td className="py-4">
                    <div>{booking.phone ?? "No phone"}</div>
                    <div className="text-stone-500">{booking.email ?? "No email"}</div>
                  </td>
                  <td className="py-4">{booking.service_name ?? "Not set"}</td>
                  <td className="py-4">
                    {formatDate(booking.preferred_date)}
                    <div className="text-stone-500">{booking.preferred_time ?? "No time"}</div>
                  </td>
                  <td className="max-w-xs py-4 text-stone-600">{booking.notes ?? "No notes"}</td>
                  <td className="py-4">
                    <form action={updateBookingStatusAction}>
                      <input type="hidden" name="id" value={booking.id} />
                      <select
                        name="status"
                        defaultValue={booking.status}
                        className="rounded-full border border-blush-100 bg-blush-50 px-3 py-2 text-sm font-semibold text-stone-800"
                      >
                        {statuses.slice(1).map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <button className="ml-2 rounded-full bg-stone-950 px-3 py-2 text-xs font-semibold text-white" type="submit">
                        Save
                      </button>
                    </form>
                  </td>
                  <td className="py-4">
                    <form action={deleteBookingAction}>
                      <input type="hidden" name="id" value={booking.id} />
                      <button className="rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700" type="submit">
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
