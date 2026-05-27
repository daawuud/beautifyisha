import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Beautibyisha | Luxury Beauty Salon, Makeup & Skincare",
  description:
    "Beautibyisha is a luxury beauty salon offering professional makeup, skincare, facials, eyebrows, lashes, bridal beauty, hair styling, nails, and premium beauty packages.",
  keywords: [
    "Beautibyisha",
    "beauty salon",
    "bridal makeup",
    "facials",
    "skincare",
    "eyebrows",
    "eyelash extensions",
    "luxury beauty"
  ],
  openGraph: {
    title: "Beautibyisha | Enhancing Your Natural Beauty",
    description: "Luxury beauty, makeup and skincare services for radiant confidence.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
