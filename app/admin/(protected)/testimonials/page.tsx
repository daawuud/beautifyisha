import { deleteTestimonialAction, upsertTestimonialAction } from "@/app/actions/admin";
import { AdminModal } from "@/components/admin/AdminModal";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EmptyState } from "@/components/admin/EmptyState";
import { Checkbox, FileInput, TextArea, TextInput } from "@/components/admin/FormFields";
import { requireAdmin } from "@/lib/admin/auth";
import type { Testimonial } from "@/lib/supabase/types";

export default async function AdminTestimonialsPage({
  searchParams
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const params = await searchParams;
  const { supabase } = await requireAdmin();
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <AdminPageHeader
        title="Testimonials"
        copy="Manage client reviews and star ratings shown on the public website."
        action={
          <AdminModal title="Add testimonial" trigger={<span className="rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white shadow-luxe">Add testimonial</span>}>
            <TestimonialForm />
          </AdminModal>
        }
      />
      <AdminNotice searchParams={params} />
      {!testimonials?.length ? (
        <EmptyState title="No testimonials yet" copy="Add reviews to build trust on the public website." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <article key={testimonial.id} className="rounded-[1.5rem] border border-white bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-full bg-blush-50 font-display text-2xl font-semibold text-roseGold">
                  {testimonial.image_url ? (
                    <img src={testimonial.image_url} alt="" className="h-full w-full object-cover" />
                  ) : (
                    testimonial.customer_name.slice(0, 1)
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-2xl font-semibold text-stone-950">{testimonial.customer_name}</h2>
                    <span className="rounded-full bg-blush-50 px-3 py-1 text-xs font-semibold text-roseGold">
                      {testimonial.is_active ? "Active" : "Hidden"}
                    </span>
                  </div>
                  <p className="mt-1 text-softGold">{"*".repeat(testimonial.rating)}</p>
                  <p className="mt-3 leading-7 text-stone-600">{testimonial.review}</p>
                </div>
              </div>
              <div className="mt-5 flex gap-2">
                <AdminModal title={`Edit ${testimonial.customer_name}`} trigger={<span className="rounded-full border border-blush-100 bg-white px-4 py-2 text-sm font-semibold text-stone-800">Edit</span>}>
                  <TestimonialForm testimonial={testimonial} />
                </AdminModal>
                <form action={deleteTestimonialAction}>
                  <input type="hidden" name="id" value={testimonial.id} />
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

function TestimonialForm({ testimonial }: { testimonial?: Testimonial }) {
  return (
    <form action={upsertTestimonialAction} className="grid gap-4">
      {testimonial && <input type="hidden" name="id" value={testimonial.id} />}
      <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
        <TextInput label="Customer name" name="customer_name" defaultValue={testimonial?.customer_name} required />
        <TextInput label="Rating" name="rating" type="number" defaultValue={testimonial?.rating ?? 5} />
      </div>
      <TextArea label="Review" name="review" defaultValue={testimonial?.review} required />
      <TextInput label="Current image URL" name="image_url" defaultValue={testimonial?.image_url} />
      <FileInput label="Upload customer image" name="image" />
      <Checkbox label="Show testimonial on website" name="is_active" defaultChecked={testimonial?.is_active ?? true} />
      <button type="submit" className="rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white shadow-luxe">
        Save testimonial
      </button>
    </form>
  );
}
