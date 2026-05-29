import { deleteGalleryAction, upsertGalleryAction } from "@/app/actions/admin";
import { AdminModal } from "@/components/admin/AdminModal";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EmptyState } from "@/components/admin/EmptyState";
import { Checkbox, FileInput, TextInput } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/admin/auth";
import type { GalleryImage } from "@/lib/supabase/types";

export default async function AdminGalleryPage({
  searchParams
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const params = await searchParams;
  const { supabase } = await requireAdmin();
  const { data: images } = await supabase
    .from("gallery")
    .select("*")
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <>
      <AdminPageHeader
        title="Gallery"
        copy="Upload and curate beauty work for the public gallery."
        action={
          <AdminModal title="Add gallery image" trigger={<span className="rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white shadow-luxe">Upload image</span>}>
            <GalleryForm />
          </AdminModal>
        }
      />
      <AdminNotice searchParams={params} />
      {!images?.length ? (
        <EmptyState title="No gallery images" copy="Upload finished looks, salon moments, and featured beauty results." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <article key={image.id} className="overflow-hidden rounded-[1.5rem] border border-white bg-white shadow-sm">
              <div className="aspect-[4/3] bg-blush-50">
                <img src={image.image_url} alt={image.alt_text ?? image.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-stone-950">{image.title}</h2>
                    <p className="mt-1 text-sm text-stone-500">{image.category ?? "Uncategorized"}</p>
                  </div>
                  {image.is_featured && <span className="rounded-full bg-blush-50 px-3 py-1 text-xs font-semibold text-roseGold">Featured</span>}
                </div>
                <div className="mt-4 flex gap-2">
                  <AdminModal title={`Edit ${image.title}`} trigger={<span className="rounded-full border border-blush-100 bg-white px-4 py-2 text-sm font-semibold text-stone-800">Edit</span>}>
                    <GalleryForm image={image} />
                  </AdminModal>
                  <form action={deleteGalleryAction}>
                    <input type="hidden" name="id" value={image.id} />
                    <button className="rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700" type="submit">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

function GalleryForm({ image }: { image?: GalleryImage }) {
  return (
    <form action={upsertGalleryAction} className="grid gap-4">
      {image && <input type="hidden" name="id" value={image.id} />}
      <TextInput label="Title" name="title" defaultValue={image?.title} required />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput label="Category" name="category" defaultValue={image?.category} />
        <TextInput label="Alt text" name="alt_text" defaultValue={image?.alt_text} />
      </div>
      <TextInput label="Current image URL" name="image_url" defaultValue={image?.image_url} />
      <FileInput label="Upload image" name="image" />
      <Checkbox label="Feature this image" name="is_featured" defaultChecked={image?.is_featured ?? false} />
      <button type="submit" className="rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white shadow-luxe">
        Save image
      </button>
    </form>
  );
}
