import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const Nav = () => {
  return (
    <nav>
      <Card className="w-full">
        <CardHeader className="flex justify-between">
          <CardTitle className="flex gap-2">
            <h2 className="text-2xl text-midgray">Welcome</h2>
            <h2 className="text-2xl">Animan</h2>
          </CardTitle>
          <Avatar className="avatar-gradient text-white h-10 w-10">
            <AvatarFallback className="text-white">AA</AvatarFallback>
          </Avatar>
        </CardHeader>
      </Card>
    </nav>
  );
};

export default Nav;
