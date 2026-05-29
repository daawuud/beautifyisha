"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import type { BookingStatus } from "@/lib/supabase/types";

type BucketName = "service-images" | "gallery-images" | "testimonial-images" | "site-assets";

function text(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  return value || null;
}

function checkbox(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function uploadImage(formData: FormData, field: string, bucket: BucketName) {
  const file = formData.get(field);
  if (!(file instanceof File) || file.size === 0) {
    return null;
  }

  const { supabase } = await requireAdmin();
  const extension = file.name.split(".").pop() || "jpg";
  const path = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function upsertServiceAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = text(formData, "id");
  const title = text(formData, "title");

  if (!title) {
    redirect("/admin/services?error=Service title is required");
  }

  const uploadedUrl = await uploadImage(formData, "image", "service-images");
  const imageUrl = uploadedUrl ?? text(formData, "image_url");
  const payload = {
    title,
    slug: text(formData, "slug") ?? slugify(title),
    description: text(formData, "description"),
    price: text(formData, "price"),
    image_url: imageUrl,
    category: text(formData, "category"),
    is_active: checkbox(formData, "is_active"),
    sort_order: Number(formData.get("sort_order") || 0)
  };

  const result = id
    ? await supabase.from("services").update(payload).eq("id", id)
    : await supabase.from("services").insert(payload);

  if (result.error) redirect(`/admin/services?error=${encodeURIComponent(result.error.message)}`);
  revalidatePath("/");
  revalidatePath("/admin/services");
  redirect("/admin/services?saved=1");
}

export async function deleteServiceAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = text(formData, "id");
  if (id) await supabase.from("services").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/services");
}

export async function upsertGalleryAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = text(formData, "id");
  const uploadedUrl = await uploadImage(formData, "image", "gallery-images");
  const imageUrl = uploadedUrl ?? text(formData, "image_url");

  if (!imageUrl) {
    redirect("/admin/gallery?error=Image is required");
  }

  const payload = {
    title: text(formData, "title") ?? "Gallery image",
    image_url: imageUrl,
    category: text(formData, "category"),
    alt_text: text(formData, "alt_text"),
    is_featured: checkbox(formData, "is_featured")
  };

  const result = id
    ? await supabase.from("gallery").update(payload).eq("id", id)
    : await supabase.from("gallery").insert(payload);

  if (result.error) redirect(`/admin/gallery?error=${encodeURIComponent(result.error.message)}`);
  revalidatePath("/");
  revalidatePath("/admin/gallery");
  redirect("/admin/gallery?saved=1");
}

export async function deleteGalleryAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = text(formData, "id");
  if (id) await supabase.from("gallery").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/gallery");
}

export async function updateBookingStatusAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = text(formData, "id");
  const status = text(formData, "status") as BookingStatus | null;

  if (id && status) {
    await supabase.from("bookings").update({ status }).eq("id", id);
  }

  revalidatePath("/admin/bookings");
}

export async function deleteBookingAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = text(formData, "id");
  if (id) await supabase.from("bookings").delete().eq("id", id);
  revalidatePath("/admin/bookings");
}

export async function upsertTestimonialAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = text(formData, "id");
  const uploadedUrl = await uploadImage(formData, "image", "testimonial-images");
  const imageUrl = uploadedUrl ?? text(formData, "image_url");
  const payload = {
    customer_name: text(formData, "customer_name") ?? "Client",
    review: text(formData, "review") ?? "",
    rating: Math.min(5, Math.max(1, Number(formData.get("rating") || 5))),
    image_url: imageUrl,
    is_active: checkbox(formData, "is_active")
  };

  const result = id
    ? await supabase.from("testimonials").update(payload).eq("id", id)
    : await supabase.from("testimonials").insert(payload);

  if (result.error) redirect(`/admin/testimonials?error=${encodeURIComponent(result.error.message)}`);
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials?saved=1");
}

export async function deleteTestimonialAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = text(formData, "id");
  if (id) await supabase.from("testimonials").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

export async function updateSettingsAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = text(formData, "id");
  const logoUrl = (await uploadImage(formData, "logo", "site-assets")) ?? text(formData, "logo_url");
  const heroImageUrl =
    (await uploadImage(formData, "hero_image", "site-assets")) ?? text(formData, "hero_image_url");

  const payload = {
    business_name: text(formData, "business_name"),
    tagline: text(formData, "tagline"),
    phone: text(formData, "phone"),
    whatsapp: text(formData, "whatsapp"),
    email: text(formData, "email"),
    address: text(formData, "address"),
    instagram_url: text(formData, "instagram_url"),
    tiktok_url: text(formData, "tiktok_url"),
    facebook_url: text(formData, "facebook_url"),
    business_hours: text(formData, "business_hours"),
    logo_url: logoUrl,
    hero_title: text(formData, "hero_title"),
    hero_subtitle: text(formData, "hero_subtitle"),
    hero_image_url: heroImageUrl
  };

  const result = id
    ? await supabase.from("site_settings").update(payload).eq("id", id)
    : await supabase.from("site_settings").insert(payload);

  if (result.error) redirect(`/admin/settings?error=${encodeURIComponent(result.error.message)}`);
  revalidatePath("/");
  revalidatePath("/admin/settings");
  redirect("/admin/settings?saved=1");
}
