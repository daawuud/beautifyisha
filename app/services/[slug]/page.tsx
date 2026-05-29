import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { ButtonLink } from "@/components/ButtonLink";
import { SiteHeader } from "@/components/SiteHeader";
import { getPublicServiceBySlug } from "@/lib/supabase/public-data";
import { getServiceDetails } from "@/lib/services/details";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;

  if (slug === "henna-art") {
    return {
      title: "Henna Art Services | Beautibyisha",
      description:
        "Professional bridal and decorative henna services for weddings, Eid, parties, and special occasions at Beautibyisha."
    };
  }

  const service = await getPublicServiceBySlug(slug);

  return {
    title: service ? `${service.title} | Beautibyisha` : "Service | Beautibyisha",
    description: service?.description ?? "Luxury beauty services by Beautibyisha."
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getPublicServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const details = getServiceDetails(service);
  const imageUrl = details.imageUrl;

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative isolate overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8">
          {imageUrl && (
            <div className="absolute inset-0 -z-20 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }} />
          )}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-stone-950/85 via-stone-900/60 to-blush-300/35" />
          <div className="absolute inset-0 -z-10 sparkle-field opacity-25" />
          <div className="mx-auto max-w-7xl pt-10">
            <div className="mb-8 inline-flex rounded-full bg-white/12 p-3 backdrop-blur">
              <BrandLogo light />
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-champagne">
              {service.category ?? "Beauty Service"}
            </p>
            <h1 className="mt-4 max-w-3xl text-balance font-display text-5xl font-semibold leading-tight sm:text-6xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/86">
              {details.description}
            </p>
            {service.price && (
              <p className="mt-5 text-base font-semibold text-champagne">Starting at {service.price}</p>
            )}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/#booking" variant="primary">Book Now</ButtonLink>
              <ButtonLink href="/#services" variant="light">Back to Services</ButtonLink>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="overflow-hidden rounded-[2rem] bg-blush-50 shadow-luxe">
              {imageUrl ? (
                <img src={imageUrl} alt={`${service.title} service`} className="h-full min-h-[420px] w-full object-cover" />
              ) : (
                <div className="grid min-h-[420px] place-items-center bg-gradient-to-br from-blush-100 via-pearl to-champagne text-center">
                  <p className="font-display text-4xl font-semibold text-stone-950">{service.title}</p>
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-roseGold">Service Details</p>
              <h2 className="mt-3 font-display text-4xl font-semibold text-stone-950">
                Elegant artistry for your special moments.
              </h2>
              <p className="mt-5 text-lg leading-8 text-stone-600">
                {details.longDescription || details.description}
              </p>
              {details.features.length > 0 && (
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {details.features.map((feature) => (
                    <div key={feature} className="rounded-2xl border border-blush-100 bg-white px-4 py-3 text-sm font-semibold text-stone-800 shadow-sm">
                      {feature}
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-9">
                <ButtonLink href="/#booking" variant="primary">Book Now</ButtonLink>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

