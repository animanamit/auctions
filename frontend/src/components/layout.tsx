import { ReactNode } from "react";
import { Nav } from "./nav";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <div className="flex-1 mx-auto w-full px-4 py-4">{children}</div>
    </div>
  );
};
