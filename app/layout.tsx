import type { Metadata } from "next";
import {
  DM_Mono,
  Epilogue,
  JetBrains_Mono,
  Libre_Baskerville,
  Playfair_Display,
  Syne,
} from "next/font/google";
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

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-d",
  weight: ["400", "500", "700", "900"],
  style: ["normal", "italic"],
});

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-ui",
  weight: ["300", "400", "500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-code",
  weight: ["300", "400", "500"],
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
      <body
        className={`${syne.variable} ${dmMono.variable} ${libreBaskerville.variable} ${playfairDisplay.variable} ${epilogue.variable} ${jetBrainsMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
