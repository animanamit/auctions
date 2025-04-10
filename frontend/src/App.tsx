import { useEffect } from "react";
import type { AppRouter } from "../../backend/index";
//     👆 **type-only** import
import { createTRPCClient, httpBatchLink } from "@trpc/client";
//     👆 **type-only** import

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
  useEffect(() => {
    (async () => {
      const users = await trpc.greeting.query();
      console.log(users);
    })();
  }, []);

  return (
    <div className="bg-black h-full w-full flex justify-center items-center">
      yuh
    </div>
  );
}

export default App;
