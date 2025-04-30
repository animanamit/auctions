import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { NotificationDropdown } from "./notification-dropdown";

export const Nav = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white">
      <Card className="w-full gap-4">
        <CardHeader className="flex justify-between">
          <CardTitle className="flex gap-2">
            <h2 className="text-2xl text-midgray">Welcome,</h2>
            <h2 className="text-2xl">Animan</h2>
          </CardTitle>
          <div className="flex gap-2 items-center">
            <NotificationDropdown />
            <Avatar className="avatar-gradient text-white h-8 w-8">
              <AvatarFallback className="text-white text-xs">AA</AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
      </Card>
    </nav>
  );
};

export default Nav;
