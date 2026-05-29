import { deleteServiceAction, upsertServiceAction } from "@/app/actions/admin";
import { AdminModal } from "@/components/admin/AdminModal";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EmptyState } from "@/components/admin/EmptyState";
import { Checkbox, FileInput, TextArea, TextInput } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/admin/auth";
import type { Service } from "@/lib/supabase/types";

export default async function AdminServicesPage({
  searchParams
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const params = await searchParams;
  const { supabase } = await requireAdmin();
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <>
      <AdminPageHeader
        title="Services"
        copy="Manage the treatments shown on the public services section."
        action={
          <AdminModal title="Add service" trigger={<span className="rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white shadow-luxe">Add service</span>}>
            <ServiceForm />
          </AdminModal>
        }
      />
      <AdminNotice searchParams={params} />
      {!services?.length ? (
        <EmptyState title="No services yet" copy="Add your first salon service to begin building the public services section." />
      ) : (
        <div className="grid gap-4">
          {services.map((service) => (
            <article key={service.id} className="grid gap-4 rounded-[1.5rem] border border-white bg-white p-4 shadow-sm lg:grid-cols-[140px_1fr_auto]">
              <div className="h-32 overflow-hidden rounded-2xl bg-blush-50">
                {service.image_url && (
                  <img src={service.image_url} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-2xl font-semibold text-stone-950">{service.title}</h2>
                  <span className="rounded-full bg-blush-50 px-3 py-1 text-xs font-semibold text-roseGold">
                    {service.is_active ? "Active" : "Hidden"}
                  </span>
                </div>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-stone-600">{service.description}</p>
                <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold text-stone-500">
                  <span>Slug: {service.slug}</span>
                  <span>Category: {service.category ?? "None"}</span>
                  <span>Price: {service.price ?? "Not set"}</span>
                  <span>Order: {service.sort_order ?? 0}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <AdminModal title={`Edit ${service.title}`} trigger={<span className="rounded-full border border-blush-100 bg-white px-4 py-2 text-sm font-semibold text-stone-800">Edit</span>}>
                  <ServiceForm service={service} />
                </AdminModal>
                <form action={deleteServiceAction}>
                  <input type="hidden" name="id" value={service.id} />
                  <button className="rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700" type="submit">
                    Delete
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

function ServiceForm({ service }: { service?: Service }) {
  return (
    <form action={upsertServiceAction} className="grid gap-4">
      {service && <input type="hidden" name="id" value={service.id} />}
      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput label="Title" name="title" defaultValue={service?.title} required />
        <TextInput label="Slug" name="slug" defaultValue={service?.slug} placeholder="bridal-makeup" />
      </div>
      <TextArea label="Description" name="description" defaultValue={service?.description} />
      <div className="grid gap-4 sm:grid-cols-3">
        <TextInput label="Price" name="price" defaultValue={service?.price} placeholder="$120+" />
        <TextInput label="Category" name="category" defaultValue={service?.category} />
        <TextInput label="Sort order" name="sort_order" type="number" defaultValue={service?.sort_order ?? 0} />
      </div>
      <TextInput label="Current image URL" name="image_url" defaultValue={service?.image_url} />
      <FileInput label="Upload new service image" name="image" />
      <Checkbox label="Show service on website" name="is_active" defaultChecked={service?.is_active ?? true} />
      <button type="submit" className="rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white shadow-luxe">
        Save service
      </button>
    </form>
  );
}
