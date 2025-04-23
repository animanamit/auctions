import { useEffect } from "react";
import type { AppRouter } from "../../backend/index";
//     👆 **type-only** import
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { Button } from "@/components/ui/button";
import { useNotification } from "@/contexts/notification-context";

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc", // Updated endpoint
    }),
  ],
});

function App() {
  const { notify } = useNotification();

  useEffect(() => {
    (async () => {
      const users = await trpc.greeting.query();
      console.log(users);
    })();
  }, []);

  return (
    <div className="bg-black h-full w-full flex justify-center items-center">
      <Button
        onClick={() => {
          notify("New bid received", "warning");
        }}
      >
        send a notification
      </Button>
    </div>
  );
}

export default App;
