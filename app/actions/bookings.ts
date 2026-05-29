"use server";

import { revalidatePath } from "next/cache";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type BookingFormState = {
  ok: boolean;
  message: string;
};

export async function createBookingAction(
  _previousState: BookingFormState,
  formData: FormData
): Promise<BookingFormState> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      message: "Booking is not connected yet. Add your Supabase environment variables first."
    };
  }

  const dateTime = String(formData.get("dateTime") ?? "");
  const [preferredDate, preferredTime] = dateTime ? dateTime.split("T") : ["", ""];

  const payload = {
    customer_name: String(formData.get("name") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim() || null,
    email: String(formData.get("email") ?? "").trim() || null,
    service_id: String(formData.get("serviceId") ?? "") || null,
    service_name: String(formData.get("service") ?? "").trim() || null,
    preferred_date: preferredDate || null,
    preferred_time: preferredTime || null,
    notes: String(formData.get("notes") ?? "").trim() || null,
    status: "new" as const
  };

  if (!payload.customer_name || !payload.phone || !payload.service_name || !payload.preferred_date) {
    return {
      ok: false,
      message: "Please add your name, phone, preferred date, and service."
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("bookings").insert(payload);

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidatePath("/admin/bookings");
  return {
    ok: true,
    message: "Your request was sent. Beautibyisha will contact you to confirm."
  };
}
