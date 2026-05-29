export type Service = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: string | null;
  image_url: string | null;
  category: string | null;
  is_active: boolean;
  sort_order: number | null;
  created_at: string;
  updated_at: string;
};

export type GalleryImage = {
  id: string;
  title: string;
  image_url: string;
  category: string | null;
  alt_text: string | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
};

export type BookingStatus = "new" | "confirmed" | "completed" | "cancelled";

export type Booking = {
  id: string;
  customer_name: string;
  phone: string | null;
  email: string | null;
  service_id: string | null;
  service_name: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  notes: string | null;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
};

export type Testimonial = {
  id: string;
  customer_name: string;
  review: string;
  rating: number;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type SiteSettings = {
  id: string;
  business_name: string | null;
  tagline: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  instagram_url: string | null;
  tiktok_url: string | null;
  facebook_url: string | null;
  business_hours: string | null;
  logo_url: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  hero_image_url: string | null;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      services: {
        Row: Service;
        Insert: Partial<Omit<Service, "id" | "created_at" | "updated_at">>;
        Update: Partial<Omit<Service, "id" | "created_at" | "updated_at">>;
      };
      gallery: {
        Row: GalleryImage;
        Insert: Partial<Omit<GalleryImage, "id" | "created_at" | "updated_at">>;
        Update: Partial<Omit<GalleryImage, "id" | "created_at" | "updated_at">>;
      };
      bookings: {
        Row: Booking;
        Insert: Partial<Omit<Booking, "id" | "created_at" | "updated_at">>;
        Update: Partial<Omit<Booking, "id" | "created_at" | "updated_at">>;
      };
      testimonials: {
        Row: Testimonial;
        Insert: Partial<Omit<Testimonial, "id" | "created_at" | "updated_at">>;
        Update: Partial<Omit<Testimonial, "id" | "created_at" | "updated_at">>;
      };
      site_settings: {
        Row: SiteSettings;
        Insert: Partial<Omit<SiteSettings, "id" | "updated_at">>;
        Update: Partial<Omit<SiteSettings, "id" | "updated_at">>;
      };
    };
  };
};
