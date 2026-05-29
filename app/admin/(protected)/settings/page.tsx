import { updateSettingsAction } from "@/app/actions/admin";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { FileInput, TextArea, TextInput } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/admin/auth";

export default async function AdminSettingsPage({
  searchParams
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const params = await searchParams;
  const { supabase } = await requireAdmin();
  const { data: settings } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();

  return (
    <>
      <AdminPageHeader
        title="Website settings"
        copy="Update business details, social links, logo, and the homepage hero content."
      />
      <AdminNotice searchParams={params} />
      <form action={updateSettingsAction} className="grid gap-6 rounded-[1.5rem] border border-white bg-white p-5 shadow-sm">
        {settings && <input type="hidden" name="id" value={settings.id} />}
        <section>
          <h2 className="mb-4 font-display text-2xl font-semibold text-stone-950">Business details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput label="Business name" name="business_name" defaultValue={settings?.business_name ?? "Beautibyisha"} />
            <TextInput label="Tagline" name="tagline" defaultValue={settings?.tagline} />
            <TextInput label="Phone" name="phone" defaultValue={settings?.phone} />
            <TextInput label="WhatsApp number" name="whatsapp" defaultValue={settings?.whatsapp} />
            <TextInput label="Email" name="email" type="email" defaultValue={settings?.email} />
            <TextInput label="Address" name="address" defaultValue={settings?.address} />
          </div>
          <div className="mt-4">
            <TextArea label="Business hours" name="business_hours" defaultValue={settings?.business_hours} />
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-semibold text-stone-950">Social media</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <TextInput label="Instagram URL" name="instagram_url" defaultValue={settings?.instagram_url} />
            <TextInput label="TikTok URL" name="tiktok_url" defaultValue={settings?.tiktok_url} />
            <TextInput label="Facebook URL" name="facebook_url" defaultValue={settings?.facebook_url} />
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-semibold text-stone-950">Brand assets</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput label="Current logo URL" name="logo_url" defaultValue={settings?.logo_url} />
            <FileInput label="Upload logo" name="logo" />
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-semibold text-stone-950">Homepage hero</h2>
          <div className="grid gap-4">
            <TextInput label="Hero title" name="hero_title" defaultValue={settings?.hero_title} />
            <TextInput label="Hero subtitle" name="hero_subtitle" defaultValue={settings?.hero_subtitle} />
            <TextInput label="Current hero image URL" name="hero_image_url" defaultValue={settings?.hero_image_url} />
            <FileInput label="Upload hero image" name="hero_image" />
          </div>
        </section>

        <button type="submit" className="rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white shadow-luxe sm:w-fit">
          Save settings
        </button>
      </form>
    </>
  );
}
