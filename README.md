# Beautibyisha

Next.js beauty salon website with a Supabase-backed admin dashboard.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create a Supabase project.

3. Open Supabase SQL Editor and run `supabase/schema.sql`.

4. Create these public Supabase Storage buckets:

```text
service-images
gallery-images
testimonial-images
site-assets
```

Add storage policies so anyone can read files from those buckets, and authenticated users can insert, update, and delete files.

5. Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

The service role key is included for future server-only tasks. Do not use it in client components.

6. Create an admin user in Supabase:

Supabase Dashboard > Authentication > Users > Add user.

Use that email and password at `/admin/login`.

7. Run the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Admin Routes

- `/admin/login`
- `/admin/dashboard`
- `/admin/services`
- `/admin/gallery`
- `/admin/bookings`
- `/admin/testimonials`
- `/admin/settings`

All admin pages except login require a Supabase Auth session.

## Database Tables

The schema creates:

- `services`
- `gallery`
- `bookings`
- `testimonials`
- `site_settings`

Row Level Security is enabled. Public visitors can read active services, gallery images, active testimonials, and site settings. Public visitors can insert booking requests only. Authenticated users can manage admin content.

## Deploying To Vercel

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Add the same environment variables in Vercel Project Settings > Environment Variables.
4. Deploy.
5. Create the admin user in Supabase Auth before testing `/admin/login`.
