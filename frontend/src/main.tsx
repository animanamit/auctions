import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "sonner";
import App from "./App.tsx";
import { NotificationProvider } from "@/contexts/notification-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotificationProvider>
      <Toaster position="top-right" />
      <App />
    </NotificationProvider>
  </StrictMode>
);
