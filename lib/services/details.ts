import type { Service } from "@/lib/supabase/types";

export const hennaShortDescription =
  "Beautiful traditional and modern henna designs for weddings, celebrations, parties, Eid, bridal events, and special occasions.";

export const hennaLongDescription =
  "Beautibyisha offers professional henna artistry featuring elegant bridal henna, Arabic henna, Indian henna, Moroccan-inspired patterns, and custom designs. Our henna services are suitable for weddings, engagements, Eid celebrations, cultural events, and personal beauty sessions. We use quality henna products and create detailed designs that enhance your special moments.";

export const hennaFeatures = [
  "Bridal Henna",
  "Arabic Henna Designs",
  "Indian Henna Designs",
  "Eid Henna",
  "Party Henna",
  "Custom Henna Art",
  "Hand Henna",
  "Foot Henna"
];

export const hennaGalleryImages = [
  {
    title: "Bridal Henna",
    alt: "Bridal Henna Design",
    imageUrl: "https://images.pexels.com/photos/13102907/pexels-photo-13102907.jpeg?auto=compress&cs=tinysrgb&w=900"
  },
  {
    title: "Arabic Henna Design",
    alt: "Arabic Henna Pattern",
    imageUrl: "https://images.pexels.com/photos/27151466/pexels-photo-27151466.jpeg?auto=compress&cs=tinysrgb&w=900"
  },
  {
    title: "Indian Henna Design",
    alt: "Indian Bridal Mehndi",
    imageUrl: "https://images.pexels.com/photos/8232427/pexels-photo-8232427.jpeg?auto=compress&cs=tinysrgb&w=900"
  },
  {
    title: "Eid Henna",
    alt: "Eid Henna Art",
    imageUrl: "https://images.pexels.com/photos/12584788/pexels-photo-12584788.jpeg?auto=compress&cs=tinysrgb&w=900"
  },
  {
    title: "Hand Henna",
    alt: "Professional Henna Service",
    imageUrl: "https://images.pexels.com/photos/12606670/pexels-photo-12606670.jpeg?auto=compress&cs=tinysrgb&w=900"
  },
  {
    title: "Foot Henna",
    alt: "Foot Henna Design",
    imageUrl: "https://images.pexels.com/photos/24346798/pexels-photo-24346798.jpeg?auto=compress&cs=tinysrgb&w=900"
  },
  {
    title: "Modern Floral Henna",
    alt: "Modern Floral Henna Design",
    imageUrl: "https://images.pexels.com/photos/4723603/pexels-photo-4723603.jpeg?auto=compress&cs=tinysrgb&w=900"
  },
  {
    title: "Traditional Wedding Henna",
    alt: "Traditional Wedding Henna",
    imageUrl: "https://images.pexels.com/photos/33427286/pexels-photo-33427286.jpeg?auto=compress&cs=tinysrgb&w=900"
  }
];

export const hennaImagePlaceholder =
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85";

export function getServiceDetails(service: Service) {
  if (service.slug === "henna-art") {
    return {
      icon: "henna",
      description: service.description || hennaShortDescription,
      longDescription: hennaLongDescription,
      features: hennaFeatures,
      imageUrl: service.image_url || hennaImagePlaceholder
    };
  }

  return {
    icon: "sparkle",
    description: service.description || "",
    longDescription: service.description || "",
    features: [],
    imageUrl: service.image_url || null
  };
}
