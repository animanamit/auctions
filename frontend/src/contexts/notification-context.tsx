import { createContext, useContext } from "react";
import { toast } from "sonner";

type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationContextType {
  notify: (message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notify: () => {},
});

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const notify = (message: string, type: NotificationType = "info") => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "warning":
        toast.warning(message);
        break;
      default:
        toast(message);
    }
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
    </NotificationContext.Provider>
  );
}

export interface NotificationButtonProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
}

export const useNotification = () => useContext(NotificationContext);
