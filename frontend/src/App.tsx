import { Button } from "@/components/ui/button";
import { useNotification } from "@/contexts/notification-context";
import { Link } from "react-router";

function App() {
  const { notify } = useNotification();

  return (
    <div className=" h-full w-full flex justify-center items-center">
      <Button
        onClick={() => {
          notify("New bid received", "warning");
        }}
      >
        send a notification
      </Button>
      <Link to="/home">Go to home</Link>
      <Link to="/auction/1">Go to auction</Link>
    </div>
  );
}

export default App;
