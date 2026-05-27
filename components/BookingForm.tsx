"use client";

const services = [
  "Bridal Makeup",
  "Facial Treatment",
  "Eyebrow Shaping",
  "Eyelash Extensions",
  "Hair Styling",
  "Skincare Consultation",
  "Nail Services",
  "Beauty Packages"
];

export function BookingForm() {
  const whatsappMessage = encodeURIComponent(
    "Hello Beautifyisha, I would like to book a beauty appointment."
  );

  return (
    <form className="grid gap-4 rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-luxe backdrop-blur sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Name
          <input className="rounded-2xl border border-blush-100 bg-white px-4 py-3 outline-none transition focus:border-roseGold focus:ring-4 focus:ring-blush-100" name="name" placeholder="Your full name" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Phone
          <input className="rounded-2xl border border-blush-100 bg-white px-4 py-3 outline-none transition focus:border-roseGold focus:ring-4 focus:ring-blush-100" name="phone" placeholder="+1 000 000 0000" />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-semibold text-stone-700">
        Email
        <input className="rounded-2xl border border-blush-100 bg-white px-4 py-3 outline-none transition focus:border-roseGold focus:ring-4 focus:ring-blush-100" name="email" type="email" placeholder="you@example.com" />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Service
          <select className="rounded-2xl border border-blush-100 bg-white px-4 py-3 outline-none transition focus:border-roseGold focus:ring-4 focus:ring-blush-100" name="service">
            {services.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Preferred date and time
          <input className="rounded-2xl border border-blush-100 bg-white px-4 py-3 outline-none transition focus:border-roseGold focus:ring-4 focus:ring-blush-100" name="dateTime" type="datetime-local" />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-semibold text-stone-700">
        Notes
        <textarea className="min-h-32 rounded-2xl border border-blush-100 bg-white px-4 py-3 outline-none transition focus:border-roseGold focus:ring-4 focus:ring-blush-100" name="notes" placeholder="Tell us about your occasion, skin goals, or preferred look." />
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-stone-950 px-6 text-sm font-semibold text-white shadow-luxe transition hover:-translate-y-0.5 hover:bg-stone-800"
        >
          Request Appointment
        </button>
        <a
          href={`https://wa.me/?text=${whatsappMessage}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-roseGold/35 bg-white px-6 text-sm font-semibold text-stone-900 shadow-sm transition hover:-translate-y-0.5 hover:border-softGold"
        >
          WhatsApp Booking
        </a>
      </div>
    </form>
  );
}
