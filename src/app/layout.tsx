import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bubble Punch",
  description: "Preciso. Confiável. Seguro.",
  icons: [
    { rel: "icon", url: "/icon-192x192.png", type: "image/png", sizes: "192x192" },
    { rel: "icon", url: "/icon-256x256.png", type: "image/png", sizes: "256x256" },
    { rel: "icon", url: "/icon-384x384.png", type: "image/png", sizes: "384x384" },
    { rel: "icon", url: "/icon-512x512.png", type: "image/png", sizes: "512x512" },
    {
      rel: "apple-touch-icon",
      url: "/icon-180x180.png",
      type: "image/png",
      sizes: "180x180",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
