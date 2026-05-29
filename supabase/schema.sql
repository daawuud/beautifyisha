create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  price text,
  image_url text,
  category text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text not null,
  category text,
  alt_text text,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text,
  email text,
  service_id uuid references public.services(id) on delete set null,
  service_name text,
  preferred_date date,
  preferred_time text,
  notes text,
  status text not null default 'new' check (status in ('new', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  review text not null,
  rating integer not null default 5 check (rating between 1 and 5),
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  business_name text,
  tagline text,
  phone text,
  whatsapp text,
  email text,
  address text,
  instagram_url text,
  tiktok_url text,
  facebook_url text,
  business_hours text,
  logo_url text,
  hero_title text,
  hero_subtitle text,
  hero_image_url text,
  updated_at timestamptz not null default now()
);

alter table public.services add column if not exists title text;
alter table public.services add column if not exists slug text;
alter table public.services add column if not exists description text;
alter table public.services add column if not exists price text;
alter table public.services add column if not exists image_url text;
alter table public.services add column if not exists category text;
alter table public.services add column if not exists is_active boolean not null default true;
alter table public.services add column if not exists sort_order integer not null default 0;
alter table public.services add column if not exists created_at timestamptz not null default now();
alter table public.services add column if not exists updated_at timestamptz not null default now();

alter table public.gallery add column if not exists title text;
alter table public.gallery add column if not exists image_url text;
alter table public.gallery add column if not exists category text;
alter table public.gallery add column if not exists alt_text text;
alter table public.gallery add column if not exists is_featured boolean not null default false;
alter table public.gallery add column if not exists created_at timestamptz not null default now();
alter table public.gallery add column if not exists updated_at timestamptz not null default now();

alter table public.bookings add column if not exists customer_name text;
alter table public.bookings add column if not exists phone text;
alter table public.bookings add column if not exists email text;
alter table public.bookings add column if not exists service_id uuid;
alter table public.bookings add column if not exists service_name text;
alter table public.bookings add column if not exists preferred_date date;
alter table public.bookings add column if not exists preferred_time text;
alter table public.bookings add column if not exists notes text;
alter table public.bookings add column if not exists status text not null default 'new';
alter table public.bookings add column if not exists created_at timestamptz not null default now();
alter table public.bookings add column if not exists updated_at timestamptz not null default now();

alter table public.testimonials add column if not exists customer_name text;
alter table public.testimonials add column if not exists review text;
alter table public.testimonials add column if not exists rating integer not null default 5;
alter table public.testimonials add column if not exists image_url text;
alter table public.testimonials add column if not exists is_active boolean not null default true;
alter table public.testimonials add column if not exists created_at timestamptz not null default now();
alter table public.testimonials add column if not exists updated_at timestamptz not null default now();

alter table public.site_settings add column if not exists business_name text;
alter table public.site_settings add column if not exists tagline text;
alter table public.site_settings add column if not exists phone text;
alter table public.site_settings add column if not exists whatsapp text;
alter table public.site_settings add column if not exists email text;
alter table public.site_settings add column if not exists address text;
alter table public.site_settings add column if not exists instagram_url text;
alter table public.site_settings add column if not exists tiktok_url text;
alter table public.site_settings add column if not exists facebook_url text;
alter table public.site_settings add column if not exists business_hours text;
alter table public.site_settings add column if not exists logo_url text;
alter table public.site_settings add column if not exists hero_title text;
alter table public.site_settings add column if not exists hero_subtitle text;
alter table public.site_settings add column if not exists hero_image_url text;
alter table public.site_settings add column if not exists updated_at timestamptz not null default now();

create index if not exists services_active_sort_idx on public.services (is_active, sort_order);
create index if not exists gallery_featured_created_idx on public.gallery (is_featured, created_at desc);
create index if not exists bookings_status_created_idx on public.bookings (status, created_at desc);
create index if not exists testimonials_active_created_idx on public.testimonials (is_active, created_at desc);

drop trigger if exists set_services_updated_at on public.services;
create trigger set_services_updated_at
before update on public.services
for each row execute function public.set_updated_at();

drop trigger if exists set_gallery_updated_at on public.gallery;
create trigger set_gallery_updated_at
before update on public.gallery
for each row execute function public.set_updated_at();

drop trigger if exists set_bookings_updated_at on public.bookings;
create trigger set_bookings_updated_at
before update on public.bookings
for each row execute function public.set_updated_at();

drop trigger if exists set_testimonials_updated_at on public.testimonials;
create trigger set_testimonials_updated_at
before update on public.testimonials
for each row execute function public.set_updated_at();

drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

alter table public.services enable row level security;
alter table public.gallery enable row level security;
alter table public.bookings enable row level security;
alter table public.testimonials enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "Public can read active services" on public.services;
create policy "Public can read active services"
on public.services for select
to anon, authenticated
using (is_active = true or auth.role() = 'authenticated');

drop policy if exists "Admins manage services" on public.services;
create policy "Admins manage services"
on public.services for all
to authenticated
using (true)
with check (true);

drop policy if exists "Public can read gallery" on public.gallery;
create policy "Public can read gallery"
on public.gallery for select
to anon, authenticated
using (true);

drop policy if exists "Admins manage gallery" on public.gallery;
create policy "Admins manage gallery"
on public.gallery for all
to authenticated
using (true)
with check (true);

drop policy if exists "Public can insert bookings" on public.bookings;
create policy "Public can insert bookings"
on public.bookings for insert
to anon, authenticated
with check (status = 'new');

drop policy if exists "Admins manage bookings" on public.bookings;
create policy "Admins manage bookings"
on public.bookings for all
to authenticated
using (true)
with check (true);

drop policy if exists "Public can read active testimonials" on public.testimonials;
create policy "Public can read active testimonials"
on public.testimonials for select
to anon, authenticated
using (is_active = true or auth.role() = 'authenticated');

drop policy if exists "Admins manage testimonials" on public.testimonials;
create policy "Admins manage testimonials"
on public.testimonials for all
to authenticated
using (true)
with check (true);

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
on public.site_settings for select
to anon, authenticated
using (true);

drop policy if exists "Admins manage site settings" on public.site_settings;
create policy "Admins manage site settings"
on public.site_settings for all
to authenticated
using (true)
with check (true);

insert into public.site_settings (
  business_name,
  tagline,
  phone,
  whatsapp,
  email,
  address,
  instagram_url,
  tiktok_url,
  facebook_url,
  business_hours,
  hero_title,
  hero_subtitle
)
select
  'Beautibyisha',
  'Luxury Beauty, Makeup & Skincare Services',
  '+1 (000) 000-0000',
  '',
  'hello@beautibyisha.com',
  '123 Rose Avenue, Beauty District',
  '',
  '',
  '',
  'Mon-Sat, 10:00 AM - 7:00 PM',
  'Enhancing Your Natural Beauty',
  'Luxury Beauty, Makeup & Skincare Services'
where not exists (select 1 from public.site_settings);

insert into public.services (
  title,
  slug,
  description,
  price,
  image_url,
  category,
  is_active,
  sort_order
)
values (
  'Henna Art',
  'henna-art',
  'Beautiful traditional and modern henna designs for weddings, celebrations, parties, Eid, bridal events, and special occasions.',
  '$XX',
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85',
  'Henna',
  true,
  7
)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  price = excluded.price,
  image_url = excluded.image_url,
  category = excluded.category,
  is_active = excluded.is_active,
  sort_order = excluded.sort_order;

-- Storage bucket setup:
-- In Supabase Dashboard > Storage, create public buckets named:
-- service-images
-- gallery-images
-- testimonial-images
-- site-assets
--
-- Then add equivalent storage policies in Dashboard > Storage > Policies:
-- 1. Public read: bucket_id in ('service-images', 'gallery-images', 'testimonial-images', 'site-assets')
-- 2. Authenticated insert/update/delete: auth.role() = 'authenticated' for the same bucket ids
