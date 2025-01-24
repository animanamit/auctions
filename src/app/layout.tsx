import type { Metadata } from "next";
import { Toaster } from "sonner";
import { LayoutBody } from "@/components/layout-body";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coin Auction Platform",
  description: "A modern platform for coin auctions",
};

import localFont from "next/font/local";

const sanserif = localFont({
  src: "/fonts/PPNeueMontreal-Regular.woff2",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sanserif.className}`}>
        <LayoutBody>{children}</LayoutBody>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
