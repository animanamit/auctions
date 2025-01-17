import type { Metadata } from "next";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { LayoutBody } from "./layout-body";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coin Auction Platform",
  description: "A modern platform for coin auctions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <LayoutBody>{children}</LayoutBody>
          <Toaster position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
