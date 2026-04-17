import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Script from "next/script"; // ✅ IMPORTANT

export const metadata: Metadata = {
  title: "IrfanStore",
  description: "Modern e-commerce app with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-950">
        {/*PayHere Script */}
        <Script
          src="https://www.payhere.lk/lib/payhere.js"
          strategy="beforeInteractive"
        />

        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}