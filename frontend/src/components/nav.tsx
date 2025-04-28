import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
const Nav = () => {
  return (
    <nav>
      <Card className="w-full gap-4">
        <CardHeader className="flex justify-between">
          <CardTitle className="flex gap-2">
            <h2 className="text-2xl text-midgray">Welcome,</h2>
            <h2 className="text-2xl">Animan</h2>
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar className="avatar-gradient text-white h-8 w-8">
              <AvatarFallback className="text-white text-xs">AA</AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-evenly w-full">
            <div className="text-left w-full">
              <span className="text-sm">Live Auctions</span>
            </div>
            <div className="text-left w-full">
              <span className="text-sm">Watched Items</span>
            </div>
            <div className="text-left w-full">
              <span className="text-sm">My Bids</span>
            </div>
            <div className="text-left w-full">
              <span className="text-sm">My Auctions</span>
            </div>
            <div className="text-left w-full">
              <span className="text-sm">My Account</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </nav>
  );
};

export default Nav;
