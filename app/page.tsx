import { BookingForm } from "@/components/BookingForm";
import { BrandLogo } from "@/components/BrandLogo";
import { ButtonLink } from "@/components/ButtonLink";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteHeader } from "@/components/SiteHeader";

const services = [
  {
    title: "Bridal Makeup",
    copy: "Camera-ready glam, soft radiance, and bridal skin prep for your ceremony and celebration.",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Facial Treatment",
    copy: "Restorative facial rituals customized for glow, hydration, texture, and calm skin.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Eyebrow Shaping",
    copy: "Precise brow mapping, shaping, and finishing for a lifted, balanced frame.",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Eyelash Extensions",
    copy: "Elegant lash sets from natural definition to full luxury volume.",
    image: "https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Hair Styling",
    copy: "Polished waves, sleek styling, and event-ready finishes for every occasion.",
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Skincare Consultation",
    copy: "A thoughtful skin analysis with product guidance and a realistic care plan.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Nail Services",
    copy: "Refined manicures, soft color palettes, and delicate finishing details.",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Beauty Packages",
    copy: "Curated service pairings for brides, birthdays, photoshoots, and self-care days.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80"
  }
];

const gallery = [
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=900&q=80"
];

const testimonials = [
  {
    name: "Amira H.",
    service: "Bridal Makeup",
    quote: "My makeup lasted all day and still looked soft, polished, and completely like me."
  },
  {
    name: "Sofia K.",
    service: "Facial Treatment",
    quote: "The facial was calming, thoughtful, and my skin had the prettiest glow afterward."
  },
  {
    name: "Layla M.",
    service: "Brows and Lashes",
    quote: "Every detail felt intentional. My brows and lashes looked clean, lifted, and elegant."
  }
];

const quickLinks = ["Home", "About", "Services", "Gallery", "Booking", "Contact"];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section id="home" className="relative isolate overflow-hidden">
          <div className="absolute inset-0 -z-20 bg-[url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1800&q=85')] bg-cover bg-center" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-stone-950/80 via-stone-900/45 to-blush-200/25" />
          <div className="absolute inset-0 -z-10 sparkle-field opacity-25" />
          <div className="mx-auto grid min-h-[calc(100svh-82px)] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-3xl pt-8 text-white">
              <div className="mb-8 inline-flex rounded-full bg-white/12 p-3 backdrop-blur">
                <BrandLogo light />
              </div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-champagne">
                Luxury Beauty Studio
              </p>
              <h1 className="text-balance font-display text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
                Enhancing Your Natural Beauty
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/86 sm:text-xl">
                Luxury Beauty, Makeup & Skincare Services
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="#booking" variant="primary">Book Appointment</ButtonLink>
                <ButtonLink href="#services" variant="light">View Services</ButtonLink>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="About Beautibyisha"
                title="A refined beauty salon for radiant, confident moments."
                copy="Beautibyisha is a professional beauty salon specializing in makeup, skincare, eyebrows, facials, bridal beauty, and luxury beauty care. Every appointment is designed with thoughtful technique, soft glamour, and a calm salon experience that leaves you feeling polished and cared for."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {["Expert artistry", "Premium care", "Elegant results"].map((item) => (
                  <div key={item} className="rounded-3xl border border-white bg-white/75 p-5 shadow-sm">
                    <div className="mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-roseGold to-softGold" />
                    <p className="font-semibold text-stone-900">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] bg-blush-50 shadow-luxe">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=85')] bg-cover bg-center" />
              <div className="absolute inset-x-6 bottom-6 rounded-[1.5rem] border border-white/50 bg-white/82 p-6 shadow-glow backdrop-blur">
                <p className="font-display text-3xl font-semibold text-stone-950">Soft glamour, tailored to you.</p>
                <p className="mt-3 leading-7 text-stone-600">From bridal mornings to monthly self-care, each service is calm, precise, and beautifully finished.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-white/55 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Services"
              title="Luxury treatments for every beauty ritual."
              copy="Choose a focused appointment or create a bespoke package for your event, routine, or transformation."
              centered
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <a
                  href="#booking"
                  key={service.title}
                  className="group overflow-hidden rounded-[1.75rem] border border-white bg-pearl shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-luxe"
                >
                  <div className="h-48 overflow-hidden">
                    <div
                      className="h-full bg-cover bg-center transition duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${service.image})` }}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-2xl font-semibold text-stone-950">{service.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-stone-600">{service.copy}</p>
                    <p className="mt-5 text-sm font-semibold text-roseGold">Book this service</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Gallery"
              title="A glimpse into the Beautibyisha glow."
              copy="Elegant beauty moments, soft textures, polished finishes, and a salon atmosphere made for feeling your best."
              centered
            />
            <div className="mt-12 grid auto-rows-[240px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((image, index) => (
                <div
                  key={image}
                  className={`overflow-hidden rounded-[1.75rem] bg-blush-100 shadow-sm ${index === 0 || index === 5 ? "lg:row-span-2" : ""}`}
                >
                  <div
                    className="h-full bg-cover bg-center transition duration-500 hover:scale-105"
                    style={{ backgroundImage: `url(${image})` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-stone-950 px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Testimonials"
              title="Loved by clients who want beauty to feel effortless."
              centered
              light
            />
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {testimonials.map((review) => (
                <article key={review.name} className="rounded-[1.75rem] border border-white/10 bg-white/[0.07] p-6 shadow-glow backdrop-blur">
                  <div className="text-softGold" aria-label="Five star rating">★★★★★</div>
                  <p className="mt-5 text-lg leading-8 text-white/86">"{review.quote}"</p>
                  <div className="mt-6 border-t border-white/10 pt-5">
                    <p className="font-semibold text-white">{review.name}</p>
                    <p className="mt-1 text-sm text-champagne">{review.service}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="booking" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
          <div className="absolute inset-0 -z-10 sparkle-field opacity-20" />
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="Booking"
                title="Reserve your beauty appointment."
                copy="Share the service you need, your ideal time, and any notes about the look or result you want. Beautibyisha will confirm your appointment details."
              />
              <div className="mt-8 rounded-[1.75rem] border border-blush-100 bg-white/80 p-6 shadow-sm">
                <p className="font-semibold text-stone-950">Prefer a quick message?</p>
                <p className="mt-2 leading-7 text-stone-600">Use the WhatsApp button in the form for faster booking and consultation requests.</p>
              </div>
            </div>
            <BookingForm />
          </div>
        </section>

        <section id="contact" className="bg-white/70 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Contact"
              title="Visit Beautibyisha for your next glow appointment."
              centered
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="grid gap-4">
                {[
                  ["Address", "123 Rose Avenue, Beauty District"],
                  ["Phone", "+1 (000) 000-0000"],
                  ["Email", "hello@beautibyisha.com"],
                  ["Hours", "Mon-Sat, 10:00 AM - 7:00 PM"],
                  ["Social", "Instagram, TikTok, Facebook"]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[1.5rem] border border-white bg-pearl p-6 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-roseGold">{label}</p>
                    <p className="mt-2 text-lg font-semibold text-stone-900">{value}</p>
                  </div>
                ))}
              </div>
              <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white bg-ash shadow-luxe">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(249,212,220,0.75),rgba(255,253,251,0.4)),url('https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=85')] bg-cover bg-center" />
                <div className="absolute inset-6 grid place-items-center rounded-[1.5rem] border border-white/70 bg-white/50 text-center backdrop-blur-sm">
                  <div>
                    <p className="font-display text-4xl font-semibold text-stone-950">Map Placeholder</p>
                    <p className="mt-3 text-stone-600">Your salon location map can be embedded here.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-stone-950 px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <BrandLogo light />
            <p className="mt-5 max-w-sm leading-7 text-white/65">
              Premium makeup, skincare, lashes, brows, nails, and bridal beauty care for polished everyday confidence.
            </p>
            <div className="mt-6 flex gap-3">
              {["IG", "TT", "FB"].map((item) => (
                <a key={item} href="#contact" className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/10 text-sm font-semibold transition hover:bg-white/20">
                  {item}
                </a>
              ))}
            </div>
          </div>
          <FooterList title="Quick Links" items={quickLinks.map((item) => ({ label: item, href: `#${item.toLowerCase()}` }))} />
          <FooterList title="Services" items={services.slice(0, 6).map((service) => ({ label: service.title, href: "#services" }))} />
          <div>
            <h3 className="font-display text-2xl font-semibold">Newsletter</h3>
            <p className="mt-4 leading-7 text-white/65">Beauty tips, seasonal offers, and bridal availability updates.</p>
            <form className="mt-5 flex overflow-hidden rounded-full border border-white/15 bg-white/10 p-1">
              <input className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/45" placeholder="Email address" type="email" />
              <button className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-champagne" type="submit">
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-sm text-white/50">
          © 2026 Beautibyisha. All rights reserved.
        </div>
      </footer>
    </>
  );
}

function FooterList({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-display text-2xl font-semibold">{title}</h3>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <a key={item.label} href={item.href} className="text-sm text-white/65 transition hover:text-white">
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
