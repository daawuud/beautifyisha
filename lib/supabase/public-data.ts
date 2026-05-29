import { createClient } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "./config";
import type { GalleryImage, Service, SiteSettings, Testimonial } from "./types";
import { hennaImagePlaceholder, hennaShortDescription } from "@/lib/services/details";

const fallbackServices: Service[] = [
  {
    id: "bridal-makeup",
    title: "Bridal Makeup",
    slug: "bridal-makeup",
    description: "Camera-ready glam, soft radiance, and bridal skin prep for your ceremony and celebration.",
    price: "Contact for pricing",
    image_url: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80",
    category: "Makeup",
    is_active: true,
    sort_order: 1,
    created_at: "",
    updated_at: ""
  },
  {
    id: "facial-treatment",
    title: "Facial Treatment",
    slug: "facial-treatment",
    description: "Restorative facial rituals customized for glow, hydration, texture, and calm skin.",
    price: "Contact for pricing",
    image_url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80",
    category: "Skincare",
    is_active: true,
    sort_order: 2,
    created_at: "",
    updated_at: ""
  },
  {
    id: "eyebrow-shaping",
    title: "Eyebrow Shaping",
    slug: "eyebrow-shaping",
    description: "Precise brow mapping, shaping, and finishing for a lifted, balanced frame.",
    price: "Contact for pricing",
    image_url: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=80",
    category: "Brows",
    is_active: true,
    sort_order: 3,
    created_at: "",
    updated_at: ""
  },
  {
    id: "eyelash-extensions",
    title: "Eyelash Extensions",
    slug: "eyelash-extensions",
    description: "Elegant lash sets from natural definition to full luxury volume.",
    price: "Contact for pricing",
    image_url: "https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?auto=format&fit=crop&w=900&q=80",
    category: "Lashes",
    is_active: true,
    sort_order: 4,
    created_at: "",
    updated_at: ""
  },
  {
    id: "hair-styling",
    title: "Hair Styling",
    slug: "hair-styling",
    description: "Polished waves, sleek styling, and event-ready finishes for every occasion.",
    price: "Contact for pricing",
    image_url: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80",
    category: "Hair",
    is_active: true,
    sort_order: 5,
    created_at: "",
    updated_at: ""
  },
  {
    id: "nail-services",
    title: "Nail Services",
    slug: "nail-services",
    description: "Refined manicures, soft color palettes, and delicate finishing details.",
    price: "Contact for pricing",
    image_url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80",
    category: "Nails",
    is_active: true,
    sort_order: 6,
    created_at: "",
    updated_at: ""
  },
  {
    id: "henna-art",
    title: "Henna Art",
    slug: "henna-art",
    description: hennaShortDescription,
    price: "$XX",
    image_url: hennaImagePlaceholder,
    category: "Henna",
    is_active: true,
    sort_order: 7,
    created_at: "",
    updated_at: ""
  }
];

const fallbackGallery: GalleryImage[] = [
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=900&q=80"
].map((image, index) => ({
  id: `gallery-${index}`,
  title: "Beautibyisha beauty work",
  image_url: image,
  category: "Salon",
  alt_text: "Beautibyisha salon beauty result",
  is_featured: index === 0,
  created_at: "",
  updated_at: ""
}));

const fallbackTestimonials: Testimonial[] = [
  {
    id: "amira",
    customer_name: "Amira H.",
    review: "My makeup lasted all day and still looked soft, polished, and completely like me.",
    rating: 5,
    image_url: null,
    is_active: true,
    created_at: "",
    updated_at: ""
  },
  {
    id: "sofia",
    customer_name: "Sofia K.",
    review: "The facial was calming, thoughtful, and my skin had the prettiest glow afterward.",
    rating: 5,
    image_url: null,
    is_active: true,
    created_at: "",
    updated_at: ""
  },
  {
    id: "layla",
    customer_name: "Layla M.",
    review: "Every detail felt intentional. My brows and lashes looked clean, lifted, and elegant.",
    rating: 5,
    image_url: null,
    is_active: true,
    created_at: "",
    updated_at: ""
  }
];

const fallbackSettings: SiteSettings = {
  id: "fallback",
  business_name: "Beautibyisha",
  tagline: "Luxury Beauty, Makeup & Skincare Services",
  phone: "+1 (000) 000-0000",
  whatsapp: "",
  email: "hello@beautibyisha.com",
  address: "123 Rose Avenue, Beauty District",
  instagram_url: "#contact",
  tiktok_url: "#contact",
  facebook_url: "#contact",
  business_hours: "Mon-Sat, 10:00 AM - 7:00 PM",
  logo_url: null,
  hero_title: "Enhancing Your Natural Beauty",
  hero_subtitle: "Luxury Beauty, Makeup & Skincare Services",
  hero_image_url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1800&q=85",
  updated_at: ""
};

function publicClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

export async function getPublicSiteData() {
  if (!isSupabaseConfigured()) {
    return {
      services: fallbackServices,
      gallery: fallbackGallery,
      testimonials: fallbackTestimonials,
      settings: fallbackSettings
    };
  }

  const client = publicClient();
  const [services, gallery, testimonials, settings] = await Promise.all([
    client.from("services").select("*").eq("is_active", true).order("sort_order", { ascending: true }),
    client.from("gallery").select("*").order("is_featured", { ascending: false }).order("created_at", { ascending: false }),
    client.from("testimonials").select("*").eq("is_active", true).order("created_at", { ascending: false }),
    client.from("site_settings").select("*").limit(1).maybeSingle()
  ]);

  return {
    services: services.data?.length ? services.data : fallbackServices,
    gallery: gallery.data?.length ? gallery.data : fallbackGallery,
    testimonials: testimonials.data?.length ? testimonials.data : fallbackTestimonials,
    settings: settings.data ?? fallbackSettings
  };
}

export async function getPublicServiceBySlug(slug: string) {
  const fallbackService = fallbackServices.find((service) => service.slug === slug) ?? null;

  if (!isSupabaseConfigured()) {
    return fallbackService;
  }

  const client = publicClient();
  const { data } = await client
    .from("services")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  return data ?? fallbackService;
}
