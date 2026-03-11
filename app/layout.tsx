import type { Metadata } from "next";
import { DM_Mono, Libre_Baskerville, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-head",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "AgriFeed ERP Demo",
  description: "ERP capabilities demo built with Next.js for stock, sales, client, and owner role walkthroughs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${dmMono.variable} ${libreBaskerville.variable}`}>
        {children}
      </body>
    </html>
  );
}
