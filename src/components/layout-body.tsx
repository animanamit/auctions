"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";

export function LayoutBody({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage =
    pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up");

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {!isAuthPage && <Navbar />}
      <main>{children}</main>
    </div>
  );
}
