"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function LayoutBody({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage =
    pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-[#FAF9F6]">
        {!isAuthPage && <Navbar />}
        <main className="flex justify-center">{children}</main>
      </div>
    </QueryClientProvider>
  );
}
