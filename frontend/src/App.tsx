import { Button } from "@/components/ui/button";
import { useNotification } from "@/contexts/notification-context";

function App() {
  const { notify } = useNotification();

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
