import { Coins, Home } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { Separator } from "@/components/ui/separator";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "My Bids",
    url: "my-bids",
    icon: Coins,
  },
];

const Header = ({
  name,
  email,
}: {
  name: string | null;
  email: string | null;
}) => {
  return (
    <SidebarHeader>
      <div className="text-sm flex flex-col gap-y-1 p-2">
        <span>{name}</span>
        <span>{email}</span>
      </div>
    </SidebarHeader>
  );
};

export async function AppSidebar() {
  const clerkUser = await currentUser();
  return (
    <Sidebar>
      {clerkUser ? (
        <>
          <Header
            name={clerkUser.fullName}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
          <Separator />
        </>
      ) : null}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
